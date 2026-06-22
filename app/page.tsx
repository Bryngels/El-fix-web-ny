import type { Metadata } from "next";
import Image from "next/image";
import { ConversionPanel } from "@/components/conversion-panel";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import {
  audienceCards,
  contact,
  localAreas,
  serviceCards,
  trustItems,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Elektriker i Sundsvall | El-Fix",
  description:
    "El-Fix är ett modernt installationsföretag i Sundsvall för elinstallation, service, elbesiktning, laddbox och energioptimering.",
};

const processSteps = [
  {
    title: "Kontakta oss",
    copy: "Ring eller mejla med plats, tjänst och vad du vill ha hjälp med.",
  },
  {
    title: "Vi bedömer",
    copy: "El-Fix bedömer uppdraget och återkommer med nästa steg.",
  },
  {
    title: "Arbetet planeras",
    copy: "Vi bokar tid och planerar arbetet utifrån behov och område.",
  },
  {
    title: "Arbetet dokumenteras",
    copy: "Du får tydlig återkoppling och rekommendationer för nästa steg.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  name: contact.name,
  telephone: contact.phoneDisplay,
  email: contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.street,
    postalCode: "854 61",
    addressLocality: "Sundsvall",
    addressCountry: "SE",
  },
  areaServed: localAreas,
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] pb-16 text-[#151515] md:pb-0">
      <SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="overflow-hidden bg-white px-4 py-12 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-md border border-[#eaded0] bg-[#fff8ef] px-3 py-2 text-sm font-black text-[#b45600]">
              Riktiga elektriker. Trygga installationer. Smartare energi.
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.03] md:text-6xl">
              Modern elpartner i Sundsvall för hem, företag och energioptimering.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#555555] md:text-lg">
              El-Fix kombinerar lokal elkompetens med strukturerad planering,
              dokumenterat arbete och kompletta lösningar tillsammans med
              Elkedjan, Bryngels och Hedlert.
            </p>
            <div className="mt-7 overflow-hidden rounded-lg border border-[#ded6c9] bg-[#111111] shadow-sm lg:hidden">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/images/elfix-skatan-solar-work.webp"
                  alt="El-Fix arbetar med solcellsinstallation vid Skatan"
                  fill
                  priority
                  unoptimized
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#forfragan"
                className="rounded-md bg-[#f08000] px-5 py-3 text-center text-sm font-black text-[#111111]"
              >
                Kontakta oss
              </a>
              <a
                href={contact.phoneHref}
                className="rounded-md border border-[#d8d0c4] px-5 py-3 text-center text-sm font-bold"
              >
                Ring {contact.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="hidden overflow-hidden rounded-xl border border-[#ded6c9] bg-[#111111] text-white shadow-xl lg:block">
            <div className="relative aspect-[4/3] min-h-[340px]">
              <Image
                src="/images/elfix-skatan-solar-work.webp"
                alt="El-Fix arbetar med solcellsinstallation vid Skatan"
                fill
                priority
                unoptimized
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/18 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <div className="flex flex-wrap gap-2">
                  {trustItems.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-white/20 bg-black/44 px-3 py-2 text-xs font-black backdrop-blur"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <p className="mt-5 max-w-md text-sm font-semibold leading-6 text-white/86">
                  Egna projekt, behöriga elektriker och planering som fungerar
                  för både hem, fastigheter och företag.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 text-[#151515]">
              <Image
                src="/images/el-fix-logo.png"
                alt="El-Fix"
                width={259}
                height={93}
                unoptimized
                className="h-11 w-auto"
              />
              <div className="h-11 w-px bg-[#ded6c9]" />
              <div>
                <p className="text-sm font-black">Sundsvall, Timrå, Alnö, Njurunda och Matfors</p>
                <p className="text-xs text-[#666666]">{contact.street}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e8e1d6] bg-[#fbfaf7] px-4 py-8 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {audienceCards.map((card) => (
            <article key={card.title} className="rounded-lg bg-white p-5 shadow-sm">
              <h2 className="text-lg font-black">{card.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#555555]">{card.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="overflow-hidden rounded-lg border border-[#ded6c9]">
            <div className="relative aspect-[16/10]">
              <Image
                src="/images/elfix-skatan-solar-finished.webp"
                alt="Färdig solcellsanläggning installerad av El-Fix vid Skatan"
                fill
                unoptimized
                sizes="(min-width: 1024px) 54vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <p className="text-sm font-black text-[#d86f00]">Lokalt projektbevis</p>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">
              El-Fix ska kännas som det självklara, trygga valet.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#555555]">
              Du får se riktiga installationer, tydliga processer, behörighet
              och dokumentation. Det ska vara enkelt att förstå vad som händer
              före, under och efter uppdraget.
            </p>
          </div>
        </div>
      </section>

      <section id="tjanster" className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black text-[#0f7a5a]">Tjänster</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight md:text-4xl">
            Välj rätt väg direkt.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {serviceCards.map((service) => (
              <a
                key={service.href}
                href={service.href}
                className="overflow-hidden rounded-lg border border-[#ded6c9] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative aspect-[4/3] bg-[#111111]">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    unoptimized
                    sizes="(min-width: 768px) 25vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-black">{service.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#555555]">{service.copy}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="foretag" className="bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black text-[#2f6f9f]">För företag och fastighet</p>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">
              Service som fungerar i pågående verksamhet.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#555555]">
              El-Fix har erfarenhet av installation, service, underhåll och
              projektledning där drift, tydlig kommunikation och dokumentation
              spelar roll.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {["Serviceavtal", "Projektledning", "Dokumentation"].map((item) => (
              <div key={item} className="rounded-lg border border-[#ded6c9] bg-[#fbfaf7] p-5">
                <p className="text-sm font-black">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="energi" className="bg-[#111111] px-4 py-12 text-white md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <p className="text-sm font-black text-[#f08000]">Kompletta energilösningar</p>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">
              El, laddning, solenergi och styrning som hänger ihop.
            </h2>
            <p className="mt-5 text-base leading-8 text-white/74">
              Genom medlemskap i Elkedjan och nära samarbete med Bryngels och
              Hedlert kan El-Fix ta en större roll när uppdraget handlar om mer
              än en enskild installation.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="rounded-md bg-white px-4 py-3">
                <Image
                  src="/images/elkedjan-logo-red.png"
                  alt="Elkedjan"
                  width={240}
                  height={52}
                  unoptimized
                  className="h-8 w-auto"
                />
              </div>
              <Image
                src="/images/el-fix-elkedjan-logo.png"
                alt="El-Fix och Elkedjan"
                width={259}
                height={80}
                unoptimized
                className="h-10 w-auto"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="overflow-hidden rounded-lg border border-white/16 bg-white/8">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/elkedjan-energy-tech.webp"
                  alt="Teknisk styrning och energioptimering"
                fill
                unoptimized
                sizes="(min-width: 1024px) 26vw, 100vw"
                className="object-cover"
              />
              </div>
              <p className="p-4 text-sm font-semibold text-white/78">
                Styrning, mätning och smart energianvändning.
              </p>
            </div>
            <div className="overflow-hidden rounded-lg border border-white/16 bg-white/8">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/elkedjan-solar-panels.webp"
                  alt="Solcellsinstallation på tak"
                fill
                unoptimized
                sizes="(min-width: 1024px) 26vw, 100vw"
                className="object-cover"
              />
              </div>
              <p className="p-4 text-sm font-semibold text-white/78">
                El, solenergi och laddning samordnat i en lösning.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black text-[#d86f00]">Arbetsflöde</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight md:text-4xl">
            Enkelt att komma vidare utan krångliga system.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {processSteps.map((step, index) => (
              <article key={step.title} className="rounded-lg border border-[#ded6c9] bg-white p-5">
                <span className="grid h-10 w-10 place-items-center rounded-md bg-[#111111] text-sm font-black text-white">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-lg font-black">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#555555]">{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="forfragan" className="bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.84fr_1.16fr] lg:items-start">
          <div>
            <p className="text-sm font-black text-[#0f7a5a]">Kontakt</p>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">
              Snabb väg till offert eller tekniker.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#555555]">
              Ring eller mejla direkt med plats, behov och prioritet. Då kan
              El-Fix snabbt bedöma nästa steg och återkomma med offert eller
              tid med tekniker.
            </p>
          </div>
          <ConversionPanel />
        </div>
      </section>

      <section id="omrade" className="bg-[#eaf3ee] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-black text-[#0f7a5a]">Lokalt område</p>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">
              El-Fix hjälper kunder i rätt del av regionen.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {localAreas.map((item) => (
              <div key={item} className="rounded-lg bg-white p-5 text-sm font-semibold leading-7 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
