/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import { CtaBand, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { audienceCards, contact, serviceCards, trustItems } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Elektriker Sundsvall | El-Fix",
  description:
    "Elektriker i Sundsvall för elinstallation, felsökning, elbesiktning, laddbox och energioptimering. Lokalt team på Björneborgsgatan.",
};

export default function ElektrikerSundsvallPage() {
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
    areaServed: ["Sundsvall", "Timrå", "Alnö", "Njurunda", "Matfors"],
  };

  return (
    <main className="min-h-screen bg-[#f7f5f0] pb-16 text-[#151515] md:pb-0">
      <SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-white px-4 py-12 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#d86f00]">
              Lokal elektriker
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.03] md:text-6xl">
              Elektriker i Sundsvall med fokus på trygghet, teknik och energi.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#555555] md:text-lg">
              El-Fix hjälper privatpersoner, företag, BRF:er och fastighetsägare
              med installation, service, felsökning, elbesiktning och smartare
              energilösningar.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/#forfragan"
                className="rounded-md bg-[#f08000] px-5 py-3 text-center text-sm font-black text-[#111111]"
              >
                Beskriv uppdrag
              </a>
              <a
                href={contact.phoneHref}
                className="rounded-md border border-[#d8d0c4] px-5 py-3 text-center text-sm font-bold"
              >
                Ring {contact.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {trustItems.map((item) => (
              <div key={item} className="rounded-lg border border-[#ded6c9] bg-[#fbfaf7] p-5">
                <p className="text-sm font-black">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#e8e1d6] bg-[#111111] px-4 py-10 text-white md:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm text-white/62">Utgångspunkt</p>
            <p className="mt-1 text-xl font-black">{contact.street}</p>
            <p className="text-sm text-white/72">{contact.postalCity}</p>
          </div>
          <div>
            <p className="text-sm text-white/62">Område</p>
            <p className="mt-1 text-xl font-black">Sundsvall med omnejd</p>
            <p className="text-sm text-white/72">Planerade jobb kan ruttmatchas smartare.</p>
          </div>
          <div>
            <p className="text-sm text-white/62">Kontakt</p>
            <a className="mt-1 block text-xl font-black" href={contact.phoneHref}>
              {contact.phoneDisplay}
            </a>
            <p className="text-sm text-white/72">{contact.email}</p>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black text-[#0f7a5a]">Vanliga uppdrag</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight md:text-4xl">
            Populära eltjänster i Sundsvallsområdet.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {serviceCards.map((service) => (
              <a
                key={service.href}
                href={service.href}
                className="rounded-lg border border-[#ded6c9] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <h3 className="text-xl font-black">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#555555]">{service.copy}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-black text-[#d86f00]">Kundtyp</p>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">
              Rätt väg in för rätt typ av uppdrag.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {audienceCards.map((card) => (
              <article key={card.title} className="rounded-lg bg-[#fbfaf7] p-5">
                <h3 className="text-lg font-black">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#555555]">{card.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Söker du elektriker i Sundsvall?"
        copy="Beskriv jobbet, adressen och hur brådskande det är. Vi återkommer med rätt nästa steg."
      />
      <SiteFooter />
    </main>
  );
}
