import Image from "next/image";
import { ConsentManager } from "@/components/consent-manager";
import { ConversionPanel } from "@/components/conversion-panel";

const services = [
  {
    title: "Elinstallation",
    copy: "Nya installationer, centraler, belysning och trygga uppgraderingar i villa, BRF och verksamhet.",
  },
  {
    title: "Service och felsökning",
    copy: "Snabb hjälp när något krånglar, med dokumenterad åtgärd och tydlig rekommendation för nästa steg.",
  },
  {
    title: "Elbesiktning",
    copy: "Genomgång av elanläggningen vid köp, renovering eller när du vill veta att allt är fackmannamässigt.",
  },
  {
    title: "Laddbox och solenergi",
    copy: "Planering, installation och samordning för laddning, solceller och smart energianvändning.",
  },
];

const trustSignals = [
  "Behöriga elektriker med hög kvalitetsnivå",
  "Medlem i Elkedjan",
  "Nära samarbeten med Bryngels och Hedlert",
  "Lokalt team i Sundsvall med omnejd",
];

const steps = [
  {
    label: "1",
    title: "Beskriv behovet",
    copy: "Kunden skickar adress, prioritet och samtycken direkt i formuläret.",
  },
  {
    label: "2",
    title: "Lead till CRM",
    copy: "Förfrågan sparas för uppföljning och skickas vidare via webhook till valt CRM.",
  },
  {
    label: "3",
    title: "Smart bokning",
    copy: "Bokningsönskemål samlas med område och flexibilitet så tekniker kan matchas mot kalender och rutt.",
  },
  {
    label: "4",
    title: "Tydlig återkoppling",
    copy: "Kunden får snabb bekräftelse och El-Fix får strukturerad data för offert och uppföljning.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f3ee] text-[#161616]">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/18 bg-[#111111]/78 text-white backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
          <a href="#start" className="flex items-center gap-3" aria-label="El-Fix startsida">
            <span className="rounded-md bg-white px-3 py-2 shadow-sm">
              <Image
                src="/images/el-fix-logo.png"
                alt="El-Fix"
                width={259}
                height={93}
                priority
                unoptimized
                className="h-9 w-auto md:h-10"
              />
            </span>
            <span className="sr-only">
              <span className="block text-base font-semibold">El-Fix</span>
              <span className="block text-xs text-white/72">
                Elektriker i Sundsvall
              </span>
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-white/84 md:flex">
            <a href="#tjanster" className="hover:text-white">
              Tjänster
            </a>
            <a href="#energi" className="hover:text-white">
              Energioptimering
            </a>
            <a href="#gdpr" className="hover:text-white">
              GDPR
            </a>
            <a href="#kontakt" className="hover:text-white">
              Kontakt
            </a>
          </nav>
          <a
            href="#forfragan"
            className="rounded-md bg-[#f08000] px-4 py-2 text-sm font-semibold text-[#111111] shadow-sm transition hover:bg-[#ff9a1f]"
          >
            Begär offert
          </a>
        </div>
      </header>

      <section
        id="start"
        className="relative flex min-h-[680px] items-end overflow-hidden pt-24 text-white"
      >
        <Image
          src="/images/el-fix-hero.png"
          alt="Elektriker kontrollerar elcentral med solpaneler och laddbox i bakgrunden"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.88),rgba(10,10,10,0.54)_45%,rgba(10,10,10,0.14))]" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 pb-16 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-md border border-white/24 bg-white/12 px-3 py-2 text-sm font-medium text-white/88 backdrop-blur">
              Riktiga elektriker. Trygga installationer. Smartare energi.
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              Modern elservice för hem, företag och energioptimering.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/84">
              El-Fix hjälper kunder i Sundsvall med elinstallation,
              service, besiktning, laddning och kompletta energilösningar
              tillsammans med starka lokala samarbetspartners.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#forfragan"
                className="rounded-md bg-[#f08000] px-5 py-3 text-center text-sm font-bold text-[#111111] transition hover:bg-[#ff9a1f]"
              >
                Starta förfrågan
              </a>
              <a
                href="tel:060152610"
                className="rounded-md border border-white/28 bg-white/12 px-5 py-3 text-center text-sm font-semibold text-white backdrop-blur transition hover:bg-white/18"
              >
                Ring 060 - 15 26 10
              </a>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:justify-self-end">
            {trustSignals.map((signal) => (
              <div
                key={signal}
                className="rounded-md border border-white/18 bg-[#111111]/54 p-4 text-sm font-medium text-white/88 backdrop-blur"
              >
                {signal}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="forfragan" className="bg-white py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-bold text-[#0f7a5a]">
              Enkel förfrågan
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
              Offert och teknikerbokning i samma flöde.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#555555]">
              Sidan är byggd för att göra det enkelt för kunden att ta nästa
              steg. Samtidigt får El-Fix strukturerad information för offert,
              kalenderplanering och uppföljande marknadsföring när kunden har
              gett samtycke.
            </p>
            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="border-l-4 border-[#f08000] pl-4">
                <dt className="text-2xl font-black">1</dt>
                <dd className="mt-1 text-sm text-[#555555]">
                  formulär för offert
                </dd>
              </div>
              <div className="border-l-4 border-[#0f7a5a] pl-4">
                <dt className="text-2xl font-black">2</dt>
                <dd className="mt-1 text-sm text-[#555555]">samtyckesnivåer</dd>
              </div>
              <div className="border-l-4 border-[#2f6f9f] pl-4">
                <dt className="text-2xl font-black">3</dt>
                <dd className="mt-1 text-sm text-[#555555]">webhook-flöden</dd>
              </div>
            </dl>
          </div>
          <ConversionPanel />
        </div>
      </section>

      <section id="tjanster" className="bg-[#f6f3ee] py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold text-[#b05a1f]">
              Tjänster med ansvar
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
              Allt från akuta elproblem till planerade energiprojekt.
            </h2>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-lg border border-[#ded6c9] bg-white p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#555555]">
                  {service.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="energi" className="bg-[#111111] py-14 text-white md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative min-h-[420px] overflow-hidden rounded-lg">
            <Image
              src="/images/el-fix-inspection.png"
              alt="Elektriker dokumenterar elbesiktning med instrument och surfplatta"
              fill
              unoptimized
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-bold text-[#f08000]">
              Kompletta energilösningar
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
              El-Fix som trygg elpartner i större helheter.
            </h2>
            <p className="mt-5 text-base leading-8 text-white/78">
              Genom medlemskap i Elkedjan och nära samarbete med Bryngels och
              Hedlert kan El-Fix presentera en bredare lösning när kunden
              behöver mer än en enskild installation: laddning, solenergi,
              styrning, värme och energieffektivisering som hänger ihop.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Elkedjan", "Bryngels", "Hedlert"].map((partner) => (
                <div
                  key={partner}
                  className="rounded-md border border-white/16 bg-white/8 p-4 text-center text-sm font-bold"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold text-[#2f6f9f]">Arbetsflöde</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
              Byggt för offert, planering och uppföljning.
            </h2>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <article
                key={step.title}
                className="rounded-lg border border-[#e8e1d6] bg-[#fbfaf7] p-6"
              >
                <span className="grid h-9 w-9 place-items-center rounded-md bg-[#111111] text-sm font-black text-white">
                  {step.label}
                </span>
                <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#555555]">
                  {step.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="gdpr" className="bg-[#eaf3ee] py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 md:px-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-bold text-[#0f7a5a]">
              GDPR och datainsamling
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
              Data som hjälper affären utan att tumma på förtroendet.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              [
                "Samtycke först",
                "Statistik och marknadsföring är separata val. Nödvändiga funktioner fungerar utan externa trackers.",
              ],
              [
                "Dataminimering",
                "Besöksdata lagras som förstapartsdata utan IP-adress. Leadformuläret samlar bara in det som behövs för ärendet.",
              ],
              [
                "CRM-redo",
                "Samtycke, kampanjkällor och ärendebeskrivning följer med leadet så uppföljning kan ske korrekt.",
              ],
              [
                "Utvecklingsbart",
                "D1-tabellerna och webhook-konfigurationen gör det enkelt att koppla på valt CRM, kalender och rapportering.",
              ],
            ].map(([title, copy]) => (
              <article key={title} className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#4d5a54]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer id="kontakt" className="bg-[#111111] py-12 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 md:px-8 lg:grid-cols-[1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="rounded-md bg-white px-3 py-2 shadow-sm">
                <Image
                  src="/images/el-fix-logo.png"
                  alt="El-Fix"
                  width={259}
                  height={93}
                  unoptimized
                  className="h-10 w-auto"
                />
              </span>
              <span className="sr-only text-lg font-bold">El-Fix</span>
            </div>
            <p className="mt-4 text-sm leading-7 text-white/72">
              Professionell elservice, installation och energioptimering i
              Sundsvall med omnejd.
            </p>
          </div>
          <address className="not-italic text-sm leading-7 text-white/76">
            Ortviksvägen 7
            <br />
            856 33 Sundsvall
            <br />
            <a className="text-white hover:underline" href="tel:060152610">
              060 - 15 26 10
            </a>
            <br />
            <a className="text-white hover:underline" href="mailto:info@el-fix.se">
              info@el-fix.se
            </a>
          </address>
          <div className="text-sm leading-7 text-white/76">
            <p className="font-semibold text-white">Öppettider</p>
            <p>Måndag-Fredag 07.00-16.00</p>
            <a
              href="#forfragan"
              className="mt-4 inline-block rounded-md bg-[#f08000] px-4 py-2 font-bold text-[#111111]"
            >
              Skicka förfrågan
            </a>
          </div>
        </div>
      </footer>

      <ConsentManager />
    </main>
  );
}
