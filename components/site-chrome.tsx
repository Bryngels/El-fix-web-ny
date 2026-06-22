/* eslint-disable @next/next/no-html-link-for-pages */
import Image from "next/image";
import { contact, navItems } from "@/lib/site-content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/8 bg-white/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <a href="/" className="flex items-center gap-3" aria-label="El-Fix startsida">
          <span className="rounded-md bg-white py-1 shadow-sm">
            <Image
              src="/images/el-fix-logo.png"
              alt="El-Fix"
              width={259}
              height={93}
              priority
              unoptimized
              className="h-9 w-auto md:h-11"
            />
          </span>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium text-[#2d2d2d] lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-[#d86f00]">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={contact.phoneHref}
            className="hidden rounded-md border border-[#ded6c9] px-4 py-2 text-sm font-bold text-[#151515] md:inline-flex"
          >
            {contact.phoneDisplay}
          </a>
          <a
            href="/#forfragan"
            className="rounded-md bg-[#f08000] px-4 py-2 text-sm font-black text-[#111111] shadow-sm transition hover:bg-[#ff9a1f]"
          >
            Kontakta oss
          </a>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <>
      <footer id="kontakt" className="bg-[#101010] py-12 text-white md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-[1.15fr_0.85fr_0.85fr] md:px-8">
          <div>
            <Image
              src="/images/el-fix-elkedjan-logo.png"
              alt="El-Fix och Elkedjan"
              width={259}
              height={80}
              unoptimized
              className="h-11 w-auto rounded-md bg-white px-2 py-1"
            />
            <p className="mt-5 max-w-md text-sm leading-7 text-white/72">
              Riktiga elektriker i Sundsvall för trygga installationer,
              service, besiktning och energioptimering.
            </p>
          </div>

          <address className="not-italic text-sm leading-7 text-white/76">
            <strong className="text-white">Kontakt</strong>
            <br />
            {contact.street}
            <br />
            {contact.postalCity}
            <br />
            <a className="text-white hover:underline" href={contact.phoneHref}>
              {contact.phoneDisplay}
            </a>
            <br />
            <a className="text-white hover:underline" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </address>

          <div className="text-sm leading-7 text-white/76">
            <p className="font-bold text-white">Nästa steg</p>
            <p>{contact.hours}</p>
            <a
              href="/#forfragan"
              className="mt-4 inline-flex rounded-md bg-[#f08000] px-4 py-2 font-black text-[#111111]"
            >
              Kontakta oss
            </a>
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-black/10 bg-white p-2 shadow-2xl md:hidden">
        <a
          href="/#forfragan"
          className="rounded-md bg-[#f08000] px-3 py-3 text-center text-sm font-black text-[#111111]"
        >
          Kontakta
        </a>
        <a
          href={contact.phoneHref}
          className="ml-2 rounded-md bg-[#111111] px-3 py-3 text-center text-sm font-black text-white"
        >
          Ring
        </a>
      </div>
    </>
  );
}

export function CtaBand({
  title = "Ring eller mejla så återkommer vi med nästa steg.",
  copy = "Skicka plats, behov och prioritet. El-Fix bedömer uppdraget och planerar arbetet utifrån behov och område.",
}: {
  title?: string;
  copy?: string;
}) {
  return (
    <section className="bg-[#111111] px-4 py-12 text-white md:px-8 md:py-16">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-sm font-bold text-[#f08000]">Redo att gå vidare?</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72 md:text-base">
            {copy}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="/#forfragan"
            className="rounded-md bg-[#f08000] px-5 py-3 text-center text-sm font-black text-[#111111]"
          >
            Kontakta oss
          </a>
          <a
            href={contact.emailHref}
            className="rounded-md border border-white/22 px-5 py-3 text-center text-sm font-bold text-white"
          >
            Mejla
          </a>
          <a
            href={contact.phoneHref}
            className="rounded-md border border-white/22 px-5 py-3 text-center text-sm font-bold text-white"
          >
            Ring {contact.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
