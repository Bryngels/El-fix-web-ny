"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown> | IArguments>;
  }
}

export function TrackingRuntime() {
  useEffect(() => {
    const handleSubmit = (event: SubmitEvent) => {
      const form = event.target;

      if (!(form instanceof HTMLFormElement)) {
        return;
      }

      const eventName = form.dataset.gtmEvent ?? form.dataset.analyticsEvent;

      if (eventName !== "generate_lead") {
        return;
      }

      const formData = new FormData(form);

      // Formuläret postar till /skicka.php, som mejlar leaden och skickar
      // vidare till tacksidan. Avbryt inte inskicket för mätningens skull -
      // GA skickar med sendBeacon och överlever navigeringen.
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "generate_lead",
        form_id: form.id || undefined,
        form_name: form.getAttribute("name") || undefined,
        form_location: form.dataset.gtmLocation || form.dataset.analyticsLocation,
        form_context: form.dataset.gtmContext,
        lead_service: formData.get("arende") || undefined,
      });
    };

    document.addEventListener("submit", handleSubmit);

    return () => {
      document.removeEventListener("submit", handleSubmit);
    };
  }, []);

  return null;
}
