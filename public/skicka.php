<?php
declare(strict_types=1);

/**
 * Tar emot lead-formuläret och mejlar det till El-Fix.
 *
 * Sajten är en statisk export utan backend, så det här skriptet är enda
 * serverdelen. Det körs av Oderland (PHP 8.4) direkt i webbrooten.
 *
 * Varje lead skrivs också till en loggfil utanför webbrooten. Domänen har
 * DMARC p=reject och en SPF som bara tillåter Microsoft 365, så mejl härifrån
 * kan avvisas tills webbserverns IP finns med i SPF-posten. Loggen gör att en
 * lead aldrig försvinner tyst under tiden.
 */

const RECIPIENT = 'info@el-fix.se';
const SENDER = 'webform@el-fix.se';
const THANK_YOU_URL = '/tack/';
const FORM_URL = '/#forfragan';
const LOG_DIR = __DIR__ . '/../leads';
const LOG_RETENTION_DAYS = 90;

/**
 * Tak för utgående mejl. Kontot delas med andra sajter och deras e-post, så
 * en spammad formulärsida får inte kunna dra ner mejlutskicken för alla.
 * Leads över taket loggas fortfarande, de mejlas bara inte.
 */
const MAX_MAILS_PER_HOUR = 20;

/** Fält som visas i mejlet, i ordning. Nycklarna matchar formulärets name-attribut. */
const FIELDS = [
    'namn' => 'Namn',
    'telefon' => 'Telefon',
    'ort' => 'Ort',
    'arende' => 'Ärende',
    'beskrivning' => 'Beskrivning',
];

const REQUIRED = ['namn', 'telefon', 'arende'];

function bounce(string $url): never
{
    header('Location: ' . $url, true, 303);
    exit;
}

/** Tar bort radbrytningar så att värden inte kan injicera egna mejlheaders. */
function headerSafe(string $value): string
{
    return trim(str_replace(["\r", "\n", "\0"], ' ', $value));
}

function field(string $key): string
{
    $raw = $_POST[$key] ?? '';

    if (!is_string($raw)) {
        return '';
    }

    // Formuläret är utf-8. Kapa längden så en bot inte kan fylla loggen.
    return trim(mb_substr($raw, 0, 2000));
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    bounce(FORM_URL);
}

// Honeypot: fältet är dolt för människor, bottar fyller i det.
if (field('webbplats') !== '') {
    // Låtsas att allt gick bra så att boten inte provar igen.
    bounce(THANK_YOU_URL);
}

$values = [];
foreach (FIELDS as $key => $label) {
    $values[$key] = field($key);
}

foreach (REQUIRED as $key) {
    if ($values[$key] === '') {
        bounce(FORM_URL);
    }
}

$submittedAt = new DateTimeImmutable('now', new DateTimeZone('Europe/Stockholm'));

$lines = [];
foreach (FIELDS as $key => $label) {
    $lines[] = $label . ': ' . ($values[$key] !== '' ? $values[$key] : '-');
}

$body = implode("\n", [
    'Ny förfrågan från el-fix.se',
    '',
    implode("\n", $lines),
    '',
    '---',
    'Inskickat: ' . $submittedAt->format('Y-m-d H:i'),
    'Sida: ' . headerSafe((string) ($_POST['sida'] ?? '-')),
]);

$headers = [
    'From: El-Fix webbformulär <' . SENDER . '>',
    'Content-Type: text/plain; charset=utf-8',
    'X-Mailer: el-fix-static-form',
];

// Formuläret frågar bara efter telefon, så det finns ingen adress att svara till.
// Återkoppling sker per telefon.

$subject = 'Förfrågan: ' . headerSafe($values['arende']) . ' - ' . headerSafe($values['namn']);

$sent = mailAllowed() && @mail(
    RECIPIENT,
    '=?UTF-8?B?' . base64_encode($subject) . '?=',
    $body,
    implode("\r\n", $headers),
    '-f' . SENDER
);

logLead($values, $submittedAt, $sent);

bounce(THANK_YOU_URL);

/**
 * Avgör om ett mejl till får skickas den här timmen.
 *
 * Håller en räknare per timme i en fil. Vid taket slutar skriptet mejla men
 * fortsätter logga, så inget tappas - och kontots övriga mejl påverkas inte
 * av att formulärsidan spammas.
 */
function mailAllowed(): bool
{
    if (!is_dir(LOG_DIR) && !@mkdir(LOG_DIR, 0700, true) && !is_dir(LOG_DIR)) {
        // Kan vi inte räkna vet vi inte hur många som skickats. Mejla ändå,
        // en tappad lead är värre än ett mejl över taket.
        return true;
    }

    $handle = @fopen(LOG_DIR . '/rate.txt', 'c+');

    if ($handle === false) {
        return true;
    }

    try {
        if (!flock($handle, LOCK_EX)) {
            return true;
        }

        $hour = gmdate('YmdH');
        $state = explode(':', trim((string) stream_get_contents($handle)));
        $sameHour = ($state[0] ?? '') === $hour;
        $count = $sameHour ? (int) ($state[1] ?? 0) : 0;

        if ($count >= MAX_MAILS_PER_HOUR) {
            return false;
        }

        ftruncate($handle, 0);
        rewind($handle);
        fwrite($handle, $hour . ':' . ($count + 1));
        fflush($handle);

        return true;
    } finally {
        flock($handle, LOCK_UN);
        fclose($handle);
    }
}

/**
 * Skriver leaden till en fil utanför webbrooten och rensar gamla poster.
 * Reserv om mejlet inte kommer fram, inte ett register att arbeta i.
 */
function logLead(array $values, DateTimeImmutable $submittedAt, bool $mailed): void
{
    if (!is_dir(LOG_DIR) && !@mkdir(LOG_DIR, 0700, true) && !is_dir(LOG_DIR)) {
        return;
    }

    $entry = json_encode(
        [
            'tid' => $submittedAt->format(DateTimeInterface::ATOM),
            'mejlat' => $mailed,
            'falt' => $values,
        ],
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );

    if ($entry === false) {
        return;
    }

    @file_put_contents(
        LOG_DIR . '/' . $submittedAt->format('Y-m') . '.jsonl',
        $entry . "\n",
        FILE_APPEND | LOCK_EX
    );

    pruneLogs();
}

/** Raderar loggfiler äldre än gallringsfristen. */
function pruneLogs(): void
{
    $cutoff = time() - (LOG_RETENTION_DAYS * 86400);

    foreach (glob(LOG_DIR . '/*.jsonl') ?: [] as $file) {
        // Filen namnges per månad, så jämför mot slutet av den månaden.
        $monthEnd = strtotime('last day of this month 23:59:59', (int) strtotime(basename($file, '.jsonl') . '-01'));

        if ($monthEnd !== false && $monthEnd < $cutoff) {
            @unlink($file);
        }
    }
}
