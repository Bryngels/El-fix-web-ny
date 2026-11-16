"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown> | IArguments>;
  }
}

const LEAD_COOKIE = "elfix_lead";

/** Läser och raderar kakan som skicka.php sätter efter ett godkänt inskick. */
export function takeLeadMarker(doc: Document = document): string | null {
  const match = doc.cookie
    .split("; ")
    .find((part) => part.startsWith(`${LEAD_COOKIE}=`));

  if (!match) {
    return null;
  }

  doc.cookie = `${LEAD_COOKIE}=; Max-Age=0; Path=/tack/; Secure; SameSite=Lax`;

  const value = match.slice(LEAD_COOKIE.length + 1);

  try {
    return decodeURIComponent(value) || "1";
  } catch {
    return "1";
  }
}

/**
 * Räknar en lead först när servern har tagit emot förfrågan.
 *
 * Tidigare räknades en lead när besökaren tryckte på skicka – innan servern
 * hunnit validera och spara något – och dessutom vid klick på offertknappar.
 * Nu räknas den bara på tacksidan, och bara när skicka.php har lämnat en
 * kaka som bevis på ett godkänt inskick. Omladdning, direktbesök och
 * honeypot-träffar ger ingen lead. Hellre en lead för lite än en för mycket.
 */
export function TrackingRuntime() {
  useEffect(() => {
    if (!window.location.pathname.startsWith("/tack")) {
      return;
    }

    const service = takeLeadMarker();

    if (service === null) {
      return;
    }

    const params = {
      form_location: "lead-form",
      lead_service: service === "1" ? undefined : service,
    };

    window.dataLayer = window.dataLayer || [];

    // GA4 laddas med gtag.js (inte via GTM) och läser bara gtag-kommandon,
    // inte vanliga dataLayer-objekt. Kommandot läggs i kön och skickas när
    // gtag.js laddas – vilket bara sker med statistiksamtycke.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (function gtag(..._args: unknown[]) {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    })("event", "generate_lead", params);

    // Objektformen för GTM-taggar, om sådana läggs till senare.
    window.dataLayer.push({ event: "generate_lead", ...params });

    // Finns fbq bara om besökaren sagt ja till marknadsföring. Utan
    // samtycke är den odefinierad och ingenting skickas till Meta.
    window.fbq?.("track", "Lead");
  }, []);

  return null;
}
