import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { TrackedLink } from "@/components/tracked-link";
import { contact } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Tack för din förfrågan | El-Fix",
  description:
    "Tack för din förfrågan till El-Fix. Vi hjälper kunder i Sundsvall, Timrå, Alnö, Njurunda och Matfors.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThanksPage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] pb-16 text-[#151515] md:pb-0">
      <SiteHeader />

      <section className="bg-white px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="inline-flex rounded-md border border-[#eaded0] bg-[#fff8ef] px-3 py-2 text-sm font-black text-[#b45600]">
            Förfrågan mottagen
          </p>
          <h1 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
            Tack, vi återkommer med rätt nästa steg.
          </h1>
          <p className="mt-5 text-base leading-8 text-[#555555] md:text-lg">
            El-Fix går igenom din förfrågan och bedömer om nästa steg är
            felsökning, offertunderlag eller bokad tid med tekniker. Gäller det
            något akut är det bäst att ringa direkt.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackedLink
              href={contact.phoneHref}
              eventName="click_phone"
              eventLocation="thanks-page"
              eventLabel={`Ring ${contact.phoneDisplay}`}
              className="rounded-md bg-[#111111] px-5 py-3 text-center text-sm font-black text-white"
            >
              Ring {contact.phoneDisplay}
            </TrackedLink>
            <TrackedLink
              href={contact.emailHref}
              eventName="click_email"
              additionalEvents={["click_contact"]}
              eventLocation="thanks-page"
              eventLabel="Komplettera via mejl"
              eventContext="thanks-page-email-followup"
              className="rounded-md border border-[#d8d0c4] px-5 py-3 text-center text-sm font-bold"
            >
              Komplettera via mejl
            </TrackedLink>
            <TrackedLink
              href="/"
              eventName="click_contact"
              eventLocation="thanks-page"
              eventLabel="Till startsidan"
              eventContext="thanks-page-home"
              className="rounded-md border border-[#d8d0c4] px-5 py-3 text-center text-sm font-bold"
            >
              Till startsidan
            </TrackedLink>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
