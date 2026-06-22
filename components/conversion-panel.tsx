import { contact, localAreas, serviceCards } from "@/lib/site-content";

export function ConversionPanel() {
  return (
    <div className="rounded-lg border border-[#ded6c9] bg-[#fbfaf7] p-4 shadow-xl md:p-6">
      <p className="text-sm font-black text-[#0f7a5a]">Kontakt i version 1</p>
      <h3 className="mt-3 text-2xl font-black leading-tight">
        Ring eller mejla El-Fix så återkommer vi med nästa steg.
      </h3>
      <p className="mt-4 text-sm leading-7 text-[#555555]">
        Beskriv vad du behöver hjälp med, var jobbet finns och hur brådskande
        det är. Bifoga gärna bilder om det gäller felsökning, central,
        laddbox eller en befintlig installation.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <a
          href={contact.phoneHref}
          className="rounded-md bg-[#111111] px-5 py-4 text-center text-sm font-black text-white"
        >
          Ring {contact.phoneDisplay}
        </a>
        <a
          href={contact.emailHref}
          className="rounded-md bg-[#f08000] px-5 py-4 text-center text-sm font-black text-[#111111]"
        >
          Mejla förfrågan
        </a>
      </div>

      <div className="mt-6 rounded-md bg-white p-4">
        <p className="text-sm font-black">Bra att få med i mejlet</p>
        <ul className="mt-3 grid gap-2 text-sm leading-6 text-[#555555]">
          <li>Adress och ort</li>
          <li>Typ av uppdrag eller problem</li>
          <li>Om det gäller privatbostad, företag, BRF eller fastighet</li>
          <li>Telefonnummer och när du vill bli kontaktad</li>
        </ul>
      </div>

      <div className="mt-4 grid gap-3 rounded-md bg-white p-4 text-sm">
        <p className="font-black">Vanliga tjänster</p>
        <div className="flex flex-wrap gap-2">
          {serviceCards.map((service) => (
            <a
              key={service.href}
              href={service.href}
              className="rounded-md border border-[#ded6c9] px-3 py-2 font-semibold text-[#333333]"
            >
              {service.title}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-md bg-[#eaf3ee] p-4 text-sm leading-7 text-[#24483b]">
        <strong>Område:</strong> {localAreas.join(", ")}.
      </div>
    </div>
  );
}
