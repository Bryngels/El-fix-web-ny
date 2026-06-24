import { contact } from "@/lib/site-content";

export function LeadForm() {
  return (
    <form
      id="lead-form"
      name="lead-form"
      action="/tack/"
      method="get"
      data-analytics-event="generate_lead"
      data-gtm-event="generate_lead"
      data-analytics-location="conversion-panel"
      data-gtm-location="conversion-panel"
      data-gtm-context="static-lead-form"
      data-thank-you-url="/tack/"
      className="mt-6 grid gap-3"
    >
      <div>
        <label className="text-xs font-black uppercase tracking-[0.08em] text-[#555555]" htmlFor="lead-name">
          Namn
        </label>
        <input
          id="lead-name"
          name="namn"
          autoComplete="name"
          required
          className="mt-2 w-full rounded-md border border-[#ded6c9] bg-white px-3 py-3 text-sm outline-none focus:border-[#f08000]"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="text-xs font-black uppercase tracking-[0.08em] text-[#555555]" htmlFor="lead-phone">
            Telefon
          </label>
          <input
            id="lead-phone"
            name="telefon"
            type="tel"
            autoComplete="tel"
            required
            className="mt-2 w-full rounded-md border border-[#ded6c9] bg-white px-3 py-3 text-sm outline-none focus:border-[#f08000]"
          />
        </div>
        <div>
          <label className="text-xs font-black uppercase tracking-[0.08em] text-[#555555]" htmlFor="lead-location">
            Ort
          </label>
          <input
            id="lead-location"
            name="ort"
            autoComplete="address-level2"
            placeholder="Sundsvall"
            className="mt-2 w-full rounded-md border border-[#ded6c9] bg-white px-3 py-3 text-sm outline-none focus:border-[#f08000]"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-black uppercase tracking-[0.08em] text-[#555555]" htmlFor="lead-type">
          Ärende
        </label>
        <select
          id="lead-type"
          name="arende"
          defaultValue=""
          required
          className="mt-2 w-full rounded-md border border-[#ded6c9] bg-white px-3 py-3 text-sm outline-none focus:border-[#f08000]"
        >
          <option value="" disabled>
            Välj vad du behöver hjälp med
          </option>
          <option>Laddbox</option>
          <option>Elbesiktning</option>
          <option>Service eller felsökning</option>
          <option>Installation</option>
          <option>Företag, BRF eller fastighet</option>
        </select>
      </div>

      <div>
        <label className="text-xs font-black uppercase tracking-[0.08em] text-[#555555]" htmlFor="lead-message">
          Kort beskrivning
        </label>
        <textarea
          id="lead-message"
          name="beskrivning"
          rows={4}
          placeholder="Beskriv vad som behöver lösas och när du vill bli kontaktad."
          className="mt-2 w-full rounded-md border border-[#ded6c9] bg-white px-3 py-3 text-sm outline-none focus:border-[#f08000]"
        />
      </div>

      <button
        type="submit"
        data-analytics-event="generate_lead"
        data-gtm-event="generate_lead"
        data-gtm-location="conversion-panel"
        data-gtm-context="static-lead-form-submit"
        className="rounded-md bg-[#f08000] px-5 py-4 text-sm font-black text-[#111111] transition hover:bg-[#ff9a1f]"
      >
        Skicka förfrågan
      </button>

      <p className="text-xs leading-6 text-[#666666]">
        Formuläret används för första kontakt och mätning. Du kan också mejla
        direkt till <span className="font-bold">{contact.email}</span>.
      </p>
    </form>
  );
}
