/**
 * Lagring av besökarens kakval.
 *
 * Valet ligger i localStorage, inte i en kaka, så att inget lagras på enheten
 * innan besökaren tagit ställning. Versionen gör att vi kan fråga om igen om
 * spårningen ändras.
 *
 * Samtycket är uppdelat per ändamål. Statistik (Google) och marknadsföring
 * (Meta) är två skilda saker för besökaren, och ett ja till det ena får aldrig
 * dra med sig det andra.
 */

export const CONSENT_STORAGE_KEY = "elfix-kaksamtycke";
export const CONSENT_VERSION = 2;

/** Lyssnas av bannern så att footern kan öppna inställningarna igen. */
export const CONSENT_REOPEN_EVENT = "elfix:oppna-kakinstallningar";

/** Signalerar att valet ändrats, så att bannern kan läsa om lagringen. */
export const CONSENT_CHANGED_EVENT = "elfix:kakval-andrat";

export type ConsentCategory = "statistics" | "marketing";

export type ConsentCategories = {
  /** Google Analytics och Google Tag Manager. */
  statistics: boolean;
  /** Meta-pixeln. */
  marketing: boolean;
};

export const CATEGORY_KEYS: ConsentCategory[] = ["statistics", "marketing"];

export const DENY_ALL: ConsentCategories = {
  statistics: false,
  marketing: false,
};

export const ALLOW_ALL: ConsentCategories = {
  statistics: true,
  marketing: true,
};

/** Null betyder att besökaren inte tagit ställning än. */
export type ConsentState = ConsentCategories | null;

type StoredConsent = {
  version: number;
  categories: ConsentCategories;
  answeredAt: string;
};

/** Formatet före kategorierna, med ett enda ja eller nej till statistik. */
type LegacyStoredConsent = {
  version: 1;
  choice: "granted" | "denied";
};

function normalize(value: unknown): ConsentCategories | null {
  if (typeof value !== "object" || value === null) {
    return null;
  }

  const record = value as Record<string, unknown>;

  return {
    statistics: record.statistics === true,
    marketing: record.marketing === true,
  };
}

function readStorage(): ConsentCategories | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);

    if (!raw) {
      return null;
    }

    const stored = JSON.parse(raw) as Partial<StoredConsent> &
      Partial<LegacyStoredConsent>;

    // Ett gammalt ja gällde bara statistik. Behåll det och låt marknadsföring
    // vara obesvarat-som-nej hellre än att fråga om alltihop på nytt.
    if (stored.version === 1) {
      return stored.choice === "granted"
        ? { statistics: true, marketing: false }
        : DENY_ALL;
    }

    if (stored.version !== CONSENT_VERSION) {
      return null;
    }

    return normalize(stored.categories);
  } catch {
    // Privat läge eller blockerad lagring. Behandla som obesvarat.
    return null;
  }
}

export function readConsent(): ConsentState {
  return readStorage();
}

export function writeConsent(categories: ConsentCategories): void {
  const previous = readStorage();

  try {
    const stored: StoredConsent = {
      version: CONSENT_VERSION,
      categories,
      answeredAt: new Date().toISOString(),
    };

    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Kan vi inte spara får besökaren frågan igen. Bättre än att anta ja.
  }

  if (previous?.statistics && !categories.statistics) {
    clearCookies(/^(_ga|_gid|_gat|_gcl)/);
  }

  if (previous?.marketing && !categories.marketing) {
    clearCookies(/^(_fbp|_fbc|fr)$/);
  }

  cachedSnapshot = categories;
  window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
}

/** Sant om något ändamål som varit påslaget nu stängts av. */
export function isRevoking(
  previous: ConsentState,
  next: ConsentCategories
): boolean {
  if (!previous) {
    return false;
  }

  return CATEGORY_KEYS.some((key) => previous[key] && !next[key]);
}

/**
 * Tar bort kakorna när ett samtycke återkallas.
 *
 * Att sluta ladda skripten räcker inte - kakor från ett tidigare ja ligger
 * kvar på enheten tills de gallras bort. Både Google och Meta sätter dem på
 * toppdomänen, så samma namn måste rensas på både värdnamnet och domänen
 * ovanför.
 */
function clearCookies(pattern: RegExp): void {
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
    .filter((name) => pattern.test(name));

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
  const handle = () => {
    cachedSnapshot = readStorage();
    onChange();
  };

  window.addEventListener(CONSENT_CHANGED_EVENT, handle);
  // En annan flik kan ha ändrat valet.
  window.addEventListener("storage", handle);

  return () => {
    window.removeEventListener(CONSENT_CHANGED_EVENT, handle);
    window.removeEventListener("storage", handle);
  };
}

// useSyncExternalStore jämför snapshots med ===, så objektet måste vara samma
// referens tills valet faktiskt ändrats.
let cachedSnapshot: ConsentState | undefined;

export function getConsentSnapshot(): ConsentState {
  if (cachedSnapshot === undefined) {
    cachedSnapshot = readStorage();
  }

  return cachedSnapshot;
}

/** Under prerendering vet vi inget om besökaren. */
export function getConsentServerSnapshot(): ConsentState {
  return null;
}
