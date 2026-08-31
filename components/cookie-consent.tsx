"use client";

import { Suspense, useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { GoogleAnalytics } from "@/components/google-analytics";
import { GoogleTagManagerHead } from "@/components/google-tag-manager";
import { MetaPixel } from "@/components/meta-pixel";
import {
  ALLOW_ALL,
  CONSENT_REOPEN_EVENT,
  type ConsentCategories,
  DENY_ALL,
  getConsentServerSnapshot,
  getConsentSnapshot,
  isRevoking,
  subscribeToConsent,
  writeConsent,
} from "@/lib/consent";

const subscribeToMount = () => () => {};

/**
 * Frågar om samtycke innan någon mätning laddas.
 *
 * Statistik och marknadsföring är två separata frågor. Inget av det laddas
 * utan ett aktivt ja, och ett ja till det ena drar aldrig med sig det andra.
 * Valet går att ändra i efterhand via länken i sidfoten.
 */
export function CookieConsent() {
  // Sajten är statiskt förrenderad. Vi vet inget om besökaren förrän koden
  // kör i webbläsaren, så vänta med att rendera något alls tills dess.
  const isMounted = useSyncExternalStore(
    subscribeToMount,
    () => true,
    () => false
  );

  const consent = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getConsentServerSnapshot
  );

  const [isReopened, setIsReopened] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [draft, setDraft] = useState<ConsentCategories>(DENY_ALL);

  useEffect(() => {
    const reopen = () => {
      // Öppna alltid med besökarens nuvarande val ikryssat.
      setDraft(consent ?? DENY_ALL);
      setIsCustomizing(true);
      setIsReopened(true);
    };

    window.addEventListener(CONSENT_REOPEN_EVENT, reopen);

    return () => window.removeEventListener(CONSENT_REOPEN_EVENT, reopen);
  }, [consent]);

  const answer = useCallback(
    (next: ConsentCategories) => {
      const revoking = isRevoking(consent, next);

      writeConsent(next);
      setIsReopened(false);
      setIsCustomizing(false);

      // Skript som redan laddats går inte att ta bort. Ladda om sidan så att
      // ett nej faktiskt får effekt direkt.
      if (revoking) {
        window.location.reload();
      }
    },
    [consent]
  );

  if (!isMounted) {
    return null;
  }

  const isOpen = consent === null || isReopened;

  return (
    <>
      {consent?.statistics ? <StatisticsScripts /> : null}
      {consent?.marketing ? <MetaPixel /> : null}

      {isOpen ? (
        <div
          role="dialog"
          aria-labelledby="kaksamtycke-rubrik"
          className="fixed inset-x-0 bottom-0 z-[60] border-t border-black/10 bg-white p-4 shadow-2xl md:bottom-4 md:left-auto md:right-4 md:max-w-md md:rounded-lg md:border"
        >
          <h2 id="kaksamtycke-rubrik" className="text-base font-black">
            Kakor på el-fix.se
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#555555]">
            Vi vill mäta hur sajten används och nå ut med annonser till dig som
            varit här. Det kräver kakor från Google och Meta och innebär att
            uppgifter kan överföras till USA. Sajten fungerar lika bra om du
            tackar nej.{" "}
            <a className="font-bold underline" href="/integritetspolicy/">
              Läs mer
            </a>
            .
          </p>

          {isCustomizing ? (
            <div className="mt-4 space-y-3 border-t border-[#e8e2d8] pt-4">
              <CategoryToggle
                label="Nödvändiga"
                description="Krävs för att sajten ska fungera. Sätter inga kakor för mätning."
                checked
                disabled
              />
              <CategoryToggle
                label="Besöksstatistik"
                description="Google Analytics och Google Tag Manager. Visar hur besökare hittar hit och vilka sidor som används."
                checked={draft.statistics}
                onChange={(value) =>
                  setDraft((current) => ({ ...current, statistics: value }))
                }
              />
              <CategoryToggle
                label="Marknadsföring"
                description="Meta-pixeln. Mäter resultatet av våra annonser på Facebook och Instagram och gör att vi kan visa annonser för dig som besökt sajten."
                checked={draft.marketing}
                onChange={(value) =>
                  setDraft((current) => ({ ...current, marketing: value }))
                }
              />
            </div>
          ) : null}

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {isCustomizing ? (
              <>
                <button
                  type="button"
                  onClick={() => answer(draft)}
                  className="rounded-md bg-[#f08000] px-4 py-3 text-sm font-black text-[#111111] transition hover:bg-[#ff9a1f]"
                >
                  Spara mitt val
                </button>
                <button
                  type="button"
                  onClick={() => answer(DENY_ALL)}
                  className="rounded-md border border-[#d8d0c4] px-4 py-3 text-sm font-bold text-[#151515] transition hover:bg-[#f7f5f0]"
                >
                  Bara nödvändiga
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => answer(ALLOW_ALL)}
                  className="rounded-md bg-[#f08000] px-4 py-3 text-sm font-black text-[#111111] transition hover:bg-[#ff9a1f]"
                >
                  Tillåt alla
                </button>
                <button
                  type="button"
                  onClick={() => answer(DENY_ALL)}
                  className="rounded-md border border-[#d8d0c4] px-4 py-3 text-sm font-bold text-[#151515] transition hover:bg-[#f7f5f0]"
                >
                  Bara nödvändiga
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDraft(consent ?? DENY_ALL);
                    setIsCustomizing(true);
                  }}
                  className="text-sm font-bold underline text-[#151515] sm:col-span-2 sm:justify-self-start"
                >
                  Anpassa
                </button>
              </>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}

function CategoryToggle({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}) {
  return (
    <label className="flex gap-3 text-sm leading-6">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-[#f08000]"
      />
      <span>
        <span className="font-bold text-[#151515]">{label}</span>
        <span className="block text-[#555555]">{description}</span>
      </span>
    </label>
  );
}

/** Startar besöksstatistiken. Renderas bara när besökaren sagt ja. */
function StatisticsScripts() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "consent_granted",
      analytics_consent: "granted",
    });
  }, []);

  return (
    <>
      <GoogleTagManagerHead />
      <Suspense fallback={null}>
        <GoogleAnalytics />
      </Suspense>
    </>
  );
}
