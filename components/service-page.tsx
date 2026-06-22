/* eslint-disable @next/next/no-html-link-for-pages */
import Image from "next/image";
import type { ServicePage } from "@/lib/site-content";
import { contact, localAreas } from "@/lib/site-content";
import { CtaBand, SiteFooter, SiteHeader } from "@/components/site-chrome";

export function ServicePageTemplate({ service }: { service: ServicePage }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Electrician",
      name: contact.name,
      telephone: contact.phoneDisplay,
      address: {
        "@type": "PostalAddress",
        streetAddress: contact.street,
        addressLocality: "Sundsvall",
        postalCode: "854 61",
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
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#d86f00]">
              {service.eyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.03] md:text-6xl">
              {service.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#555555] md:text-lg">
              {service.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/#forfragan"
                className="rounded-md bg-[#f08000] px-5 py-3 text-center text-sm font-black text-[#111111]"
              >
                Kontakta oss
              </a>
              <a
                href={contact.emailHref}
                className="rounded-md border border-[#d8d0c4] px-5 py-3 text-center text-sm font-bold"
              >
                Mejla
              </a>
              <a
                href={contact.phoneHref}
                className="rounded-md border border-[#d8d0c4] px-5 py-3 text-center text-sm font-bold"
              >
                Ring {contact.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-[#ded6c9] bg-[#111111] text-white shadow-xl">
            <div className="relative aspect-[4/3]">
              <Image
                src={service.image.src}
                alt={service.image.alt}
                fill
                unoptimized
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <p className="text-sm font-bold text-[#f08000]">Trygghetsnivå</p>
              <dl className="mt-5 grid gap-4">
                {service.proof.map((item, index) => (
                  <div key={item} className="border-l-4 border-[#f08000] pl-4">
                    <dt className="text-2xl font-black">0{index + 1}</dt>
                    <dd className="mt-1 text-sm leading-6 text-white/78">{item}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.86fr_1.14fr]">
          <div>
            <p className="text-sm font-black text-[#0f7a5a]">Omfattning</p>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">
              Vad El-Fix hjälper med.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {service.bullets.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-[#ded6c9] bg-white p-5 text-sm font-semibold leading-7"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black text-[#2f6f9f]">Process</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight md:text-4xl">
            Från första fråga till dokumenterat utfört arbete.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {service.process.map((step, index) => (
              <article
                key={step}
                className="rounded-lg border border-[#e8e1d6] bg-[#fbfaf7] p-5"
              >
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

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-black text-[#d86f00]">Vanliga frågor</p>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">
              Svar som gör beslutet enklare.
            </h2>
          </div>
          <div className="grid gap-4">
            {service.faqs.map((faq) => (
              <article key={faq.question} className="rounded-lg bg-white p-5 shadow-sm">
                <h3 className="text-lg font-black">{faq.question}</h3>
                <p className="mt-3 text-sm leading-7 text-[#555555]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
      <SiteFooter />
    </main>
  );
}
