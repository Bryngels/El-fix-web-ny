/**
 * Lagring av besökarens kakval.
 *
 * Valet ligger i localStorage, inte i en kaka, så att inget lagras på enheten
 * innan besökaren tagit ställning. Versionen gör att vi kan fråga om igen om
 * spårningen ändras.
 */

export const CONSENT_STORAGE_KEY = "elfix-kaksamtycke";
export const CONSENT_VERSION = 1;

/** Lyssnas av bannern så att footern kan öppna inställningarna igen. */
export const CONSENT_REOPEN_EVENT = "elfix:oppna-kakinstallningar";

/** Signalerar att valet ändrats, så att bannern kan läsa om lagringen. */
export const CONSENT_CHANGED_EVENT = "elfix:kakval-andrat";

export type ConsentChoice = "granted" | "denied";

/** Vad bannern ser innan besökaren tagit ställning. */
export type ConsentState = ConsentChoice | "unanswered";

type StoredConsent = {
  version: number;
  choice: ConsentChoice;
  answeredAt: string;
};

export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);

    if (!raw) {
      return null;
    }

    const stored = JSON.parse(raw) as Partial<StoredConsent>;

    if (stored.version !== CONSENT_VERSION) {
      return null;
    }

    return stored.choice === "granted" || stored.choice === "denied"
      ? stored.choice
      : null;
  } catch {
    // Privat läge eller blockerad lagring. Behandla som obesvarat.
    return null;
  }
}

export function writeConsent(choice: ConsentChoice): void {
  try {
    const stored: StoredConsent = {
      version: CONSENT_VERSION,
      choice,
      answeredAt: new Date().toISOString(),
    };

    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Kan vi inte spara får besökaren frågan igen. Bättre än att anta ja.
  }

  if (choice === "denied") {
    clearAnalyticsCookies();
  }

  window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
}

/**
 * Tar bort Googles kakor när samtycket återkallas.
 *
 * Att sluta ladda skripten räcker inte - kakor från ett tidigare ja ligger
 * kvar på enheten tills de gallras bort. Google sätter dem på toppdomänen,
 * så samma namn måste rensas på både värdnamnet och domänen ovanför.
 */
function clearAnalyticsCookies(): void {
  const hostname = window.location.hostname;
  const parts = hostname.split(".");
  const domains = new Set<string | null>([null, hostname, `.${hostname}`]);

  if (parts.length > 2) {
    const parent = parts.slice(-2).join(".");
    domains.add(parent);
    domains.add(`.${parent}`);
  }

  const names = document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0]?.trim())
    .filter((name): name is string => Boolean(name))
    .filter((name) => /^(_ga|_gid|_gat|_gcl)/.test(name));

  for (const name of names) {
    for (const domain of domains) {
      document.cookie = [
        `${name}=`,
        "expires=Thu, 01 Jan 1970 00:00:00 GMT",
        "path=/",
        domain ? `domain=${domain}` : "",
      ]
        .filter(Boolean)
        .join("; ");
    }
  }
}

export function openConsentSettings(): void {
  window.dispatchEvent(new Event(CONSENT_REOPEN_EVENT));
}

/** Prenumeration för useSyncExternalStore. */
export function subscribeToConsent(onChange: () => void): () => void {
  window.addEventListener(CONSENT_CHANGED_EVENT, onChange);
  // En annan flik kan ha ändrat valet.
  window.addEventListener("storage", onChange);

  return () => {
    window.removeEventListener(CONSENT_CHANGED_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function getConsentSnapshot(): ConsentState {
  return readConsent() ?? "unanswered";
}

/** Under prerendering vet vi inget om besökaren. */
export function getConsentServerSnapshot(): ConsentState {
  return "unanswered";
}
