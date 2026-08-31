<?php
declare(strict_types=1);

/**
 * Tar emot lead-formuläret och mejlar det till El-Fix.
 *
 * Sajten är en statisk export utan backend, så det här skriptet är enda
 * serverdelen. Det körs av Oderland (PHP 8.4) direkt i webbrooten.
 *
 * Varje lead skrivs också till en loggfil utanför webbrooten. Loggen är
 * reserven om ett mejl inte kommer fram, så att en lead aldrig försvinner
 * tyst.
 *
 * Utgående mejl lämnar Oderlands smarthost och DKIM-signeras där. Domänens
 * SPF listar webbserverns egen IP men inte smarthostens, så leveransen vilar
 * på DKIM tills include:_spf.oderland.com finns i SPF-posten.
 */

const RECIPIENT = 'info@el-fix.se';
const COMPANY = 'El-Fix i Norr AB';
const COMPANY_PHONE = '060-17 58 08';
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
    'epost' => 'E-post',
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

/** Kodar ämnesraden så att svenska tecken överlever. */
function encodeSubject(string $subject): string
{
    return '=?UTF-8?B?' . base64_encode($subject) . '?=';
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

// E-post är frivilligt. Har besökaren lämnat en giltig adress går den in som
// Reply-To, så att förfrågan kan besvaras direkt ur inkorgen. Annars sker
// återkopplingen per telefon, som tidigare.
$replyTo = filter_var($values['epost'], FILTER_VALIDATE_EMAIL);

if ($replyTo !== false) {
    $headers[] = 'Reply-To: ' . headerSafe($replyTo);
}

$subject = 'Förfrågan: ' . headerSafe($values['arende']) . ' - ' . headerSafe($values['namn']);

$sent = mailAllowed() && @mail(
    RECIPIENT,
    encodeSubject($subject),
    $body,
    implode("\r\n", $headers),
    '-f' . SENDER
);

// Kvittot skickas efter notisen, så att notisen får timtaket först om
// formuläret spammas. En lead som El-Fix inte ser är värre än ett uteblivet
// kvitto.
$receipted = $replyTo !== false && sendReceipt($replyTo, $values, $lines);

logLead($values, $submittedAt, $sent, $receipted);

bounce(THANK_YOU_URL);

/**
 * Bekräftar till besökaren att förfrågan kommit fram.
 *
 * Skickas bara till en adress som validerats som e-post, och bara när
 * besökaren själv fyllt i det frivilliga fältet. Svar går till info-adressen,
 * inte till formulärets avsändare, så att kunden kan fylla på i samma tråd.
 */
function sendReceipt(string $to, array $values, array $lines): bool
{
    if (!mailAllowed()) {
        return false;
    }

    $body = implode("\n", [
        'Hej ' . headerSafe($values['namn']) . ',',
        '',
        'Vi har tagit emot din förfrågan och hör av oss så snart vi kan,',
        'oftast samma eller nästa arbetsdag.',
        '',
        'Det här skickade du in:',
        '',
        implode("\n", $lines),
        '',
        'Behöver du nå oss innan dess går det bra att ringa ' . COMPANY_PHONE . '.',
        'Du kan också svara på det här mejlet om du vill lägga till något.',
        '',
        '---',
        COMPANY,
        RECIPIENT,
        COMPANY_PHONE,
    ]);

    $headers = [
        'From: ' . COMPANY . ' <' . SENDER . '>',
        'Reply-To: ' . RECIPIENT,
        'Content-Type: text/plain; charset=utf-8',
        'Auto-Submitted: auto-replied',
        'X-Mailer: el-fix-static-form',
    ];

    return @mail(
        $to,
        encodeSubject('Vi har tagit emot din förfrågan - ' . COMPANY),
        $body,
        implode("\r\n", $headers),
        '-f' . SENDER
    );
}

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
function logLead(
    array $values,
    DateTimeImmutable $submittedAt,
    bool $mailed,
    bool $receipted
): void
{
    if (!is_dir(LOG_DIR) && !@mkdir(LOG_DIR, 0700, true) && !is_dir(LOG_DIR)) {
        return;
    }

    $entry = json_encode(
        [
            'tid' => $submittedAt->format(DateTimeInterface::ATOM),
            'mejlat' => $mailed,
            'kvitterat' => $receipted,
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
