import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { contact } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Integritetspolicy | El-Fix",
  description:
    "Så behandlar El-Fix i Norr AB personuppgifter från kontaktformulär, mejl och besök på el-fix.se.",
};

const updated = "3 augusti 2026";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-black md:text-2xl">{title}</h2>
      <div className="mt-3 space-y-4 text-base leading-8 text-[#555555]">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] pb-16 text-[#151515] md:pb-0">
      <SiteHeader />

      <section className="bg-white px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-black leading-tight md:text-5xl">
            Integritetspolicy
          </h1>
          <p className="mt-4 text-sm text-[#777777]">
            Senast uppdaterad {updated}
          </p>

          <Section title="Vem ansvarar för uppgifterna">
            <p>
              {contact.name}, {contact.street}, {contact.postalCity}, är
              personuppgiftsansvarig för behandlingen som beskrivs här. Har du
              frågor om hur vi hanterar dina uppgifter når du oss på{" "}
              <a className="font-bold underline" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>{" "}
              eller{" "}
              <a className="font-bold underline" href={contact.phoneHref}>
                {contact.phoneDisplay}
              </a>
              .
            </p>
          </Section>

          <Section title="Vad vi samlar in och varför">
            <p>
              När du skickar en förfrågan via formuläret på sajten lämnar du
              namn, telefonnummer, ort, typ av ärende och en beskrivning av vad
              du behöver hjälp med. Du kan också lämna din e-postadress om du
              hellre vill ha svar skriftligt, men fältet är frivilligt och
              förfrågan går fram utan det. Vi använder uppgifterna för att
              kontakta dig, bedöma uppdraget och lämna offert eller boka tid.
            </p>
            <p>
              Den rättsliga grunden är att behandlingen är nödvändig för att
              vidta åtgärder på din begäran innan ett avtal ingås
              (dataskyddsförordningen artikel 6.1 b). Kontaktar du oss i stället
              per telefon eller mejl behandlar vi de uppgifter du lämnar där på
              samma grund.
            </p>
            <p>
              Undvik att skriva känsliga uppgifter i beskrivningsfältet. Vi
              behöver dem inte för att hjälpa dig.
            </p>
          </Section>

          <Section title="Hur länge vi sparar uppgifterna">
            <p>
              Blir det inget uppdrag raderar vi förfrågan när ärendet är
              avslutat, senast efter tolv månader. Leder förfrågan till ett
              uppdrag sparas uppgifterna så länge det behövs för att fullgöra
              avtalet och därefter så länge bokförings- och
              elsäkerhetslagstiftningen kräver.
            </p>
            <p>
              En kopia av inskickade formulär sparas som säkerhetskopia på
              webbservern i högst 90 dagar innan den raderas automatiskt.
            </p>
          </Section>

          <Section title="Vilka som kan få tillgång till uppgifterna">
            <p>
              Vi säljer eller lämnar inte ut dina uppgifter för andras
              marknadsföring. För att kunna driva verksamheten anlitar vi
              leverantörer som behandlar uppgifter för vår räkning, med
              personuppgiftsbiträdesavtal på plats:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Oderland Webbhosting AB, som driftar webbplatsen i Sverige.</li>
              <li>Microsoft, som tillhandahåller vår e-post.</li>
              <li>
                Google, för besöksstatistik via Google Analytics och Google Tag
                Manager.
              </li>
              <li>
                Meta (Facebook och Instagram), för att mäta och rikta vår
                annonsering.
              </li>
            </ul>
            <p>
              Uppgifter kan även lämnas ut när lag kräver det, till exempel vid
              tillsyn eller revision.
            </p>
          </Section>

          <Section title="Kakor, besöksstatistik och annonsering">
            <p>
              Utöver det som krävs för att sajten ska fungera använder vi två
              slags kakor, och båda kräver ditt samtycke. Du väljer dem var för
              sig.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <span className="font-bold">Besöksstatistik.</span> Google
                Analytics via Google Tag Manager, för att mäta hur besökare
                hittar hit och vilka sidor som används.
              </li>
              <li>
                <span className="font-bold">Marknadsföring.</span> Meta-pixeln,
                för att mäta resultatet av våra annonser på Facebook och
                Instagram och för att kunna visa annonser för dig som besökt
                sajten.
              </li>
            </ul>
            <p>
              Verktygen sätter kakor och behandlar bland annat IP-adress och
              information om din enhet, vilket kan innebära överföring till USA.
              Den rättsliga grunden är ditt samtycke.
            </p>
            <p>
              Inget av detta laddas innan du sagt ja. Väljer du{" "}
              <span className="font-bold">Bara nödvändiga</span> hämtas inga
              skript från Google eller Meta och inga sådana kakor sätts. Säger
              du ja till bara det ena laddas inte det andra. Sajten fungerar
              likadant oavsett vad du väljer.
            </p>
            <p>
              Du kan ändra dig när som helst via{" "}
              <span className="font-bold">Hantera kakor</span> längst ner på
              sidan. Återkallar du ett samtycke raderas de kakor som redan
              satts.
            </p>
          </Section>

          <Section title="Dina rättigheter">
            <p>
              Du har rätt att begära ett utdrag över de uppgifter vi har om dig,
              få felaktiga uppgifter rättade och i många fall få uppgifter
              raderade eller behandlingen begränsad. Du har också rätt att
              invända mot viss behandling och att få ut uppgifter du lämnat i ett
              maskinläsbart format.
            </p>
            <p>
              Hör av dig till {contact.email} så hjälper vi dig. Är du missnöjd
              med hur vi hanterar dina uppgifter kan du klaga till
              Integritetsskyddsmyndigheten, imy.se.
            </p>
          </Section>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
