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

      const thankYouUrl = form.dataset.thankYouUrl;
      const formData = new FormData(form);
      let hasNavigated = false;
      const navigateToThanks = () => {
        if (!thankYouUrl || hasNavigated) {
          return;
        }

        hasNavigated = true;
        window.location.href = thankYouUrl;
      };

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "generate_lead",
        form_id: form.id || undefined,
        form_name: form.getAttribute("name") || undefined,
        form_location: form.dataset.gtmLocation || form.dataset.analyticsLocation,
        form_context: form.dataset.gtmContext,
        lead_service: formData.get("arende") || undefined,
        event_callback: navigateToThanks,
        event_timeout: 900,
      });

      if (thankYouUrl) {
        event.preventDefault();
        window.setTimeout(navigateToThanks, 900);
      }
    };

    document.addEventListener("submit", handleSubmit);

    return () => {
      document.removeEventListener("submit", handleSubmit);
    };
  }, []);

  return null;
}
