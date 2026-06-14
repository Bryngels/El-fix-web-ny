"use client";

import { FormEvent, useMemo, useState } from "react";

type Mode = "quote" | "booking";
type SubmitState = "idle" | "sending" | "sent" | "error";

const serviceOptions = [
  "Elinstallation",
  "Service och felsökning",
  "Elbesiktning",
  "Laddbox",
  "Solenergi",
  "Energioptimering",
];

const windowOptions = [
  "Morgon 07-10",
  "Formiddag 10-12",
  "Eftermiddag 12-16",
  "Flexibel tid när ni är i närheten",
];

function trackingContext() {
  const params = new URLSearchParams(window.location.search);
  return {
    sourcePath: window.location.pathname,
    referrer: document.referrer,
    utmSource: params.get("utm_source") ?? "",
    utmMedium: params.get("utm_medium") ?? "",
    utmCampaign: params.get("utm_campaign") ?? "",
  };
}

function field(form: FormData, name: string) {
  const value = form.get(name);
  return typeof value === "string" ? value : "";
}

function checked(form: FormData, name: string) {
  return form.get(name) === "on";
}

export function ConversionPanel() {
  const [mode, setMode] = useState<Mode>("quote");
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  const endpoint = useMemo(
    () => (mode === "quote" ? "/api/leads" : "/api/bookings"),
    [mode]
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const common = {
      name: field(form, "name"),
      email: field(form, "email"),
      phone: field(form, "phone"),
      address: field(form, "address"),
      city: field(form, "city"),
      serviceType: field(form, "serviceType"),
      consentPrivacy: checked(form, "consentPrivacy"),
      consentMarketing: checked(form, "consentMarketing"),
      ...trackingContext(),
    };

    const payload =
      mode === "quote"
        ? {
            ...common,
            type: "quote",
            propertyType: field(form, "propertyType"),
            urgency: field(form, "urgency"),
            message: field(form, "message"),
          }
        : {
            ...common,
            proximityFlexible: checked(form, "proximityFlexible"),
            preferredWindows: form.getAll("preferredWindows"),
            notes: field(form, "notes"),
          };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Det gick inte att skicka.");
      }

      event.currentTarget.reset();
      setState("sent");
      setMessage(
        result.message ??
          "Tack, vi har tagit emot din förfrågan och återkommer snart."
      );
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Något gick fel. Försök igen eller ring oss."
      );
    }
  }

  return (
    <div className="rounded-lg border border-[#ded6c9] bg-[#fbfaf7] p-4 shadow-xl md:p-6">
      <div className="grid grid-cols-2 gap-2 rounded-md bg-[#ebe4d8] p-1">
        <button
          type="button"
          onClick={() => {
            setMode("quote");
            setState("idle");
            setMessage("");
          }}
          className={`rounded-md px-4 py-3 text-sm font-bold transition ${
            mode === "quote"
              ? "bg-white text-[#111111] shadow-sm"
              : "text-[#5c554b] hover:bg-white/58"
          }`}
        >
          Offert
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("booking");
            setState("idle");
            setMessage("");
          }}
          className={`rounded-md px-4 py-3 text-sm font-bold transition ${
            mode === "booking"
              ? "bg-white text-[#111111] shadow-sm"
              : "text-[#5c554b] hover:bg-white/58"
          }`}
        >
          Boka tekniker
        </button>
      </div>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold">
            Namn
            <input
              name="name"
              required
              autoComplete="name"
              className="min-h-12 rounded-md border border-[#d5cec2] bg-white px-3 text-base outline-none focus:border-[#0f7a5a]"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Telefon
            <input
              name="phone"
              required
              autoComplete="tel"
              inputMode="tel"
              className="min-h-12 rounded-md border border-[#d5cec2] bg-white px-3 text-base outline-none focus:border-[#0f7a5a]"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold">
            E-post
            <input
              name="email"
              type="email"
              autoComplete="email"
              className="min-h-12 rounded-md border border-[#d5cec2] bg-white px-3 text-base outline-none focus:border-[#0f7a5a]"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Tjänst
            <select
              name="serviceType"
              required
              className="min-h-12 rounded-md border border-[#d5cec2] bg-white px-3 text-base outline-none focus:border-[#0f7a5a]"
            >
              <option value="">Välj tjänst</option>
              {serviceOptions.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold">
            Adress
            <input
              name="address"
              autoComplete="street-address"
              className="min-h-12 rounded-md border border-[#d5cec2] bg-white px-3 text-base outline-none focus:border-[#0f7a5a]"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Ort
            <input
              name="city"
              autoComplete="address-level2"
              placeholder="Sundsvall"
              className="min-h-12 rounded-md border border-[#d5cec2] bg-white px-3 text-base outline-none focus:border-[#0f7a5a]"
            />
          </label>
        </div>

        {mode === "quote" ? (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold">
                Typ av fastighet
                <select
                  name="propertyType"
                  className="min-h-12 rounded-md border border-[#d5cec2] bg-white px-3 text-base outline-none focus:border-[#0f7a5a]"
                >
                  <option>Villa</option>
                  <option>Lägenhet</option>
                  <option>BRF</option>
                  <option>Företag</option>
                  <option>Annat</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                Prioritet
                <select
                  name="urgency"
                  className="min-h-12 rounded-md border border-[#d5cec2] bg-white px-3 text-base outline-none focus:border-[#0f7a5a]"
                >
                  <option value="normal">Planerad</option>
                  <option value="soon">Inom kort</option>
                  <option value="urgent">Brådskande</option>
                </select>
              </label>
            </div>
            <label className="grid gap-2 text-sm font-semibold">
              Beskriv jobbet
              <textarea
                name="message"
                rows={4}
                placeholder="Exempel: laddbox, ny central, felsökning, elbesiktning eller energioptimering."
                className="rounded-md border border-[#d5cec2] bg-white px-3 py-3 text-base outline-none focus:border-[#0f7a5a]"
              />
            </label>
          </>
        ) : (
          <>
            <fieldset className="grid gap-3">
              <legend className="text-sm font-semibold">Tidsönskemål</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {windowOptions.map((option) => (
                  <label
                    key={option}
                    className="flex min-h-12 items-center gap-3 rounded-md border border-[#d5cec2] bg-white px-3 text-sm"
                  >
                    <input
                      type="checkbox"
                      name="preferredWindows"
                      value={option}
                      className="h-4 w-4"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="flex items-start gap-3 rounded-md border border-[#d5cec2] bg-white p-3 text-sm">
              <input
                type="checkbox"
                name="proximityFlexible"
                defaultChecked
                className="mt-1 h-4 w-4"
              />
              <span>
                Matcha gärna mot när El-Fix redan är i området om det ger
                snabbare eller mer kostnadseffektiv bokning.
              </span>
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Mer information
              <textarea
                name="notes"
                rows={4}
                placeholder="Skriv vad teknikern behöver veta inför besöket."
                className="rounded-md border border-[#d5cec2] bg-white px-3 py-3 text-base outline-none focus:border-[#0f7a5a]"
              />
            </label>
          </>
        )}

        <div className="grid gap-3 rounded-md bg-white p-4 text-sm">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              name="consentPrivacy"
              required
              className="mt-1 h-4 w-4"
            />
            <span>
              Jag godkänner att El-Fix behandlar mina uppgifter för att hantera
              förfrågan och återkoppla.
            </span>
          </label>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              name="consentMarketing"
              className="mt-1 h-4 w-4"
            />
            <span>
              El-Fix får kontakta mig med relevant uppföljning, erbjudanden och
              information kopplad till mitt ärende.
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={state === "sending"}
          className="min-h-12 rounded-md bg-[#0f7a5a] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0c644a] disabled:cursor-wait disabled:bg-[#8aa99c]"
        >
          {state === "sending"
            ? "Skickar..."
            : mode === "quote"
              ? "Skicka offertförfrågan"
              : "Skicka bokningsönskemål"}
        </button>

        {message ? (
          <p
            className={`rounded-md px-4 py-3 text-sm ${
              state === "error"
                ? "bg-[#ffe8e3] text-[#8a2d1b]"
                : "bg-[#e8f5ee] text-[#0f5b43]"
            }`}
            role="status"
          >
            {message}
          </p>
        ) : null}
      </form>
    </div>
  );
}
