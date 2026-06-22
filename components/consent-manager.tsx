"use client";

import { useEffect, useState } from "react";

type ConsentChoice = {
  statistics: boolean;
  marketing: boolean;
  version: string;
  savedAt: string;
};

const CONSENT_KEY = "el-fix-consent-v1";
const VISITOR_KEY = "el-fix-visitor-id-v1";
const CONSENT_VERSION = "2026-06-14";

function readConsent() {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    return raw ? (JSON.parse(raw) as ConsentChoice) : null;
  } catch {
    return null;
  }
}

function visitorIdFor(choice: ConsentChoice) {
  if (!choice.statistics && !choice.marketing) {
    return "necessary-only";
  }

  const existing = window.localStorage.getItem(VISITOR_KEY);
  if (existing) {
    return existing;
  }

  const id = crypto.randomUUID();
  window.localStorage.setItem(VISITOR_KEY, id);
  return id;
}

function trackingContext() {
  const params = new URLSearchParams(window.location.search);
  return {
    path: window.location.pathname,
    referrer: document.referrer,
    utmSource: params.get("utm_source") ?? "",
    utmMedium: params.get("utm_medium") ?? "",
    utmCampaign: params.get("utm_campaign") ?? "",
  };
}

export function ConsentManager() {
  const [visible, setVisible] = useState(false);
  const [statistics, setStatistics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const privacyNavigator = navigator as Navigator & {
      globalPrivacyControl?: boolean;
    };
    const choice = readConsent();
    if (!choice) {
      window.setTimeout(() => setVisible(true), 0);
      return;
    }

    if (
      choice.statistics &&
      privacyNavigator.doNotTrack !== "1" &&
      privacyNavigator.globalPrivacyControl !== true
    ) {
      void fetch("/api/analytics", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          visitorId: visitorIdFor(choice),
          eventName: "page_view",
          consentStatistics: choice.statistics,
          consentMarketing: choice.marketing,
          ...trackingContext(),
        }),
      });
    }
  }, []);

  async function saveChoice(next: Pick<ConsentChoice, "statistics" | "marketing">) {
    const choice: ConsentChoice = {
      ...next,
      version: CONSENT_VERSION,
      savedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(choice));
    setVisible(false);

    try {
      await fetch("/api/consent", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          visitorId: visitorIdFor(choice),
          statistics: choice.statistics,
          marketing: choice.marketing,
          version: choice.version,
          sourcePath: window.location.pathname,
        }),
      });
    } catch {
      // Consent is stored locally even if the server is temporarily unavailable.
    }
  }

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#ded6c9] bg-white p-4 shadow-2xl md:p-5">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-sm font-bold text-[#111111]">
            El-Fix använder samtyckesstyrd förstapartsdata.
          </p>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-[#555555]">
            Nödvändiga funktioner kräver inget val. Statistik hjälper oss
            förstå vilka sidor som leder till förfrågningar. Marknadsföring
            används bara när du aktivt tillåter uppföljning.
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm sm:flex-row">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={statistics}
                onChange={(event) => setStatistics(event.target.checked)}
              />
              Statistik
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(event) => setMarketing(event.target.checked)}
              />
              Marknadsföring
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => saveChoice({ statistics: false, marketing: false })}
            className="rounded-md border border-[#d5cec2] px-4 py-3 text-sm font-bold text-[#111111]"
          >
            Endast nödvändiga
          </button>
          <button
            type="button"
            onClick={() => saveChoice({ statistics, marketing })}
            className="rounded-md bg-[#111111] px-4 py-3 text-sm font-bold text-white"
          >
            Spara val
          </button>
          <button
            type="button"
            onClick={() => saveChoice({ statistics: true, marketing: true })}
            className="rounded-md bg-[#f08000] px-4 py-3 text-sm font-bold text-[#111111]"
          >
            Tillåt alla
          </button>
        </div>
      </div>
    </div>
  );
}
