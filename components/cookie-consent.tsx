"use client";

import { Suspense, useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { GoogleAnalytics } from "@/components/google-analytics";
import { GoogleTagManagerHead } from "@/components/google-tag-manager";
import {
  CONSENT_REOPEN_EVENT,
  type ConsentChoice,
  getConsentServerSnapshot,
  getConsentSnapshot,
  subscribeToConsent,
  writeConsent,
} from "@/lib/consent";

const subscribeToMount = () => () => {};

/**
 * Frågar om samtycke innan någon mätning laddas.
 *
 * Google Analytics och Tag Manager laddas först när besökaren accepterat.
 * Utan ja hämtas inga skript från Google och inga kakor sätts. Valet går att
 * ändra i efterhand via länken i sidfoten.
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

  useEffect(() => {
    const reopen = () => setIsReopened(true);

    window.addEventListener(CONSENT_REOPEN_EVENT, reopen);

    return () => window.removeEventListener(CONSENT_REOPEN_EVENT, reopen);
  }, []);

  const answer = useCallback(
    (next: ConsentChoice) => {
      const wasGranted = consent === "granted";

      writeConsent(next);
      setIsReopened(false);

      // Skript som redan laddats går inte att ta bort. Ladda om sidan så att
      // ett nej faktiskt får effekt direkt.
      if (next === "denied" && wasGranted) {
        window.location.reload();
      }
    },
    [consent]
  );

  if (!isMounted) {
    return null;
  }

  const isOpen = consent === "unanswered" || isReopened;

  return (
    <>
      {consent === "granted" ? <TrackingScripts /> : null}

      {isOpen ? (
        <div
          role="dialog"
          aria-labelledby="kaksamtycke-rubrik"
          className="fixed inset-x-0 bottom-0 z-[60] border-t border-black/10 bg-white p-4 shadow-2xl md:bottom-4 md:left-auto md:right-4 md:max-w-md md:rounded-lg md:border"
        >
          <h2 id="kaksamtycke-rubrik" className="text-base font-black">
            Kakor för besöksstatistik
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#555555]">
            Vi vill mäta hur sajten används för att kunna förbättra den. Det
            kräver kakor från Google Analytics och innebär att uppgifter kan
            överföras till USA. Sajten fungerar lika bra om du tackar nej.{" "}
            <a className="font-bold underline" href="/integritetspolicy/">
              Läs mer
            </a>
            .
          </p>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => answer("granted")}
              className="rounded-md bg-[#f08000] px-4 py-3 text-sm font-black text-[#111111] transition hover:bg-[#ff9a1f]"
            >
              Tillåt statistik
            </button>
            <button
              type="button"
              onClick={() => answer("denied")}
              className="rounded-md border border-[#d8d0c4] px-4 py-3 text-sm font-bold text-[#151515] transition hover:bg-[#f7f5f0]"
            >
              Bara nödvändiga
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

/** Startar mätningen. Renderas bara när besökaren sagt ja. */
function TrackingScripts() {
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
