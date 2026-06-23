import type { Metadata } from "next";
import { CtaBand, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { TrackedLink } from "@/components/tracked-link";
import { audienceCards, contact, serviceCards, trustItems } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Elektriker Sundsvall, Timrå och Alnö | El-Fix",
  description:
    "Behöver du elektriker i Sundsvall? El-Fix hjälper Sundsvall, Timrå, Alnö, Njurunda och Matfors med felsökning, laddbox, elbesiktning och installation.",
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
              Elektriker i Sundsvall när jobbet ska vara tryggt, dokumenterat och rätt gjort.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#555555] md:text-lg">
              El-Fix utgår från Björneborgsgatan och hjälper privatpersoner,
              företag, BRF:er och fastighetsägare i Sundsvall, Timrå, Alnö,
              Njurunda och Matfors med felsökning, installation, laddbox,
              elbesiktning och energiåtgärder.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href="/#forfragan"
                eventName="cta_click"
                eventLocation="elektriker-sundsvall-hero"
                eventLabel="Beskriv ditt ärende"
                className="rounded-md bg-[#f08000] px-5 py-3 text-center text-sm font-black text-[#111111]"
              >
                Beskriv ditt ärende
              </TrackedLink>
              <TrackedLink
                href={contact.emailHref}
                eventName="email_click"
                eventLocation="elektriker-sundsvall-hero"
                eventLabel="Mejla förfrågan"
                className="rounded-md border border-[#d8d0c4] px-5 py-3 text-center text-sm font-bold"
              >
                Mejla förfrågan
              </TrackedLink>
              <TrackedLink
                href={contact.phoneHref}
                eventName="phone_click"
                eventLocation="elektriker-sundsvall-hero"
                eventLabel={`Ring ${contact.phoneDisplay}`}
                className="rounded-md border border-[#d8d0c4] px-5 py-3 text-center text-sm font-bold"
              >
                Ring {contact.phoneDisplay}
              </TrackedLink>
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
            <p className="mt-1 text-xl font-black">Sundsvall, Timrå, Alnö, Njurunda och Matfors</p>
            <p className="text-sm text-white/72">Lokalt team med utgångspunkt på Björneborgsgatan.</p>
          </div>
          <div>
            <p className="text-sm text-white/62">Kontakt</p>
            <TrackedLink
              className="mt-1 block text-xl font-black"
              href={contact.phoneHref}
              eventName="phone_click"
              eventLocation="elektriker-sundsvall-local-band"
              eventLabel={contact.phoneDisplay}
            >
              {contact.phoneDisplay}
            </TrackedLink>
            <p className="text-sm text-white/72">{contact.email}</p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#e8e1d6] bg-[#fbfaf7] px-4 py-10 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          <article className="rounded-lg bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black">Problem</h2>
            <p className="mt-3 text-sm leading-7 text-[#555555]">
              Du behöver veta om felet är akut, om installationen är säker eller
              vad som krävs för att få en offert som går att lita på.
            </p>
          </article>
          <article className="rounded-lg bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black">Lösning</h2>
            <p className="mt-3 text-sm leading-7 text-[#555555]">
              El-Fix bedömer uppdraget, skickar rätt elektriker och återkopplar
              med tydliga rekommendationer, dokumentation och nästa steg.
            </p>
          </article>
          <article className="rounded-lg bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black">Nästa steg</h2>
            <p className="mt-3 text-sm leading-7 text-[#555555]">
              Ring för snabb bedömning eller mejla adress, ort, bilder och vad
              du vill ha hjälp med.
            </p>
          </article>
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
              <TrackedLink
                key={service.href}
                href={service.href}
                eventName="cta_click"
                eventLocation="elektriker-sundsvall-services"
                eventLabel={service.title}
                className="rounded-lg border border-[#ded6c9] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <h3 className="text-xl font-black">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#555555]">{service.copy}</p>
              </TrackedLink>
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
        copy="Ring eller mejla jobbet, adressen och hur brådskande det är. Vi återkommer med rätt nästa steg."
      />
      <SiteFooter />
    </main>
  );
}
