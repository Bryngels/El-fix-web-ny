import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { TrackedLink } from "@/components/tracked-link";
import { contact, localAreas, trustItems } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Elektriker för företag och BRF i Sundsvall | El-Fix",
  description:
    "El-Fix hjälper företag, BRF:er och fastighetsägare i Sundsvall, Timrå, Alnö, Njurunda och Matfors med elservice, laddplatser, besiktning och dokumentation.",
};

const needs = [
  {
    title: "Service utan onödiga driftstopp",
    copy: "Felsökning, åtgärder och planerat underhåll där verksamheten behöver fortsätta fungera.",
  },
  {
    title: "Laddning för boende och personal",
    copy: "Bedömning av kapacitet, lastbalansering och installation av laddlösningar som går att bygga vidare på.",
  },
  {
    title: "Besiktning och dokumentation",
    copy: "IN ELTEST, protokoll, märkning och rekommendationer för styrelser, fastighetsägare och verksamheter.",
  },
  {
    title: "Energiåtgärder som hänger ihop",
    copy: "El, styrning, solenergi och laddning kan samordnas med Bryngels och Hedlert när uppdraget kräver helhet.",
  },
];

const steps = [
  "Ni beskriver fastighet, verksamhet, prioritet och vad som ska lösas.",
  "El-Fix bedömer tekniska förutsättningar, risker och lämpligt nästa steg.",
  "Vi planerar arbetet med hänsyn till drift, boende, öppettider och tillträde.",
  "Utfört arbete återkopplas med dokumentation och rekommendationer.",
];

export default function ForetagBrfPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Elservice för företag och BRF i Sundsvall",
    provider: {
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
    },
    areaServed: localAreas,
  };

  return (
    <main className="min-h-screen bg-[#f7f5f0] pb-16 text-[#151515] md:pb-0">
      <SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="border-b border-[#e8e1d6] bg-white px-4 py-12 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#2f6f9f]">
              Företag, BRF och fastighet
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.03] md:text-6xl">
              Elektriker för företag och BRF i Sundsvall med dokumenterad leverans.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#555555] md:text-lg">
              El-Fix hjälper styrelser, fastighetsägare och verksamheter med
              elservice, felsökning, laddplatser, elbesiktning och energiåtgärder
              där drift, säkerhet och tydlig återkoppling är viktigt.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href={contact.phoneHref}
                eventName="click_phone"
                eventLocation="foretag-brf-hero"
                eventLabel={`Ring ${contact.phoneDisplay}`}
                className="rounded-md bg-[#111111] px-5 py-3 text-center text-sm font-black text-white"
              >
                Ring {contact.phoneDisplay}
              </TrackedLink>
              <TrackedLink
                href={contact.emailHref}
                eventName="click_email"
                additionalEvents={["click_contact", "generate_lead"]}
                eventLocation="foretag-brf-hero"
                eventLabel="Mejla uppdrag"
                eventContext="business-email-lead"
                className="rounded-md bg-[#f08000] px-5 py-3 text-center text-sm font-black text-[#111111]"
              >
                Mejla uppdrag
              </TrackedLink>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-[#ded6c9] bg-[#111111] shadow-xl">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/elkedjan-industrial-service.webp"
                alt="Elektriker arbetar med service i teknisk miljö"
                fill
                priority
                unoptimized
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="grid gap-2 p-5 sm:grid-cols-2">
              {trustItems.map((item) => (
                <p key={item} className="rounded-md bg-white/10 px-3 py-2 text-sm font-black text-white">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#e8e1d6] bg-[#fbfaf7] px-4 py-10 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          <article className="rounded-lg bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black">Problem</h2>
            <p className="mt-3 text-sm leading-7 text-[#555555]">
              Driftstörningar, otydliga elanläggningar, laddbehov och gamla
              installationer skapar risk för både kostnader och osäkerhet.
            </p>
          </article>
          <article className="rounded-lg bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black">Lösning</h2>
            <p className="mt-3 text-sm leading-7 text-[#555555]">
              Vi felsöker, planerar och utför arbetet med behöriga elektriker,
              tydlig kommunikation och dokumentation som går att använda vidare.
            </p>
          </article>
          <article className="rounded-lg bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black">Nästa steg</h2>
            <p className="mt-3 text-sm leading-7 text-[#555555]">
              Skicka adress, fastighetstyp, kontaktperson och vad ni vill lösa.
              Vid brådskande ärenden är telefon snabbast.
            </p>
          </article>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black text-[#0f7a5a]">Vanliga uppdrag</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight md:text-4xl">
            Elhjälp som är byggd för återkommande behov.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {needs.map((need) => (
              <article key={need.title} className="rounded-lg border border-[#ded6c9] bg-white p-5 shadow-sm">
                <h3 className="text-lg font-black">{need.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#555555]">{need.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.86fr_1.14fr]">
          <div>
            <p className="text-sm font-black text-[#d86f00]">Arbetssätt</p>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">
              Från första bedömning till spårbart underlag.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {steps.map((step, index) => (
              <article key={step} className="rounded-lg bg-[#fbfaf7] p-5">
                <span className="grid h-10 w-10 place-items-center rounded-md bg-[#111111] text-sm font-black text-white">
                  {index + 1}
                </span>
                <p className="mt-5 text-sm font-semibold leading-7 text-[#3d3d3d]">
                  {step}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eaf3ee] px-4 py-10 md:px-8">
        <div className="mx-auto max-w-7xl rounded-lg bg-white p-5 shadow-sm md:p-6">
          <p className="text-sm font-black text-[#0f7a5a]">Lokalt område</p>
          <p className="mt-3 max-w-4xl text-base leading-8 text-[#555555]">
            El-Fix utgår från Sundsvall och hjälper företag, BRF:er och
            fastighetsägare i {localAreas.join(", ")}.
          </p>
        </div>
      </section>

      <CtaBand
        title="Behöver ni en elektriker för fastighet, BRF eller verksamhet?"
        copy="Ring eller mejla uppdrag, adress, kontaktperson och hur brådskande det är. El-Fix återkommer med rätt nästa steg."
      />
      <SiteFooter />
    </main>
  );
}
