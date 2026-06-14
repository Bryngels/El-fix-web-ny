export function text(value: unknown, max = 500) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, max);
}

export function truthy(value: unknown) {
  return value === true;
}

export function textArray(value: unknown, maxItems = 8) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim().slice(0, 120))
    .filter(Boolean)
    .slice(0, maxItems);
}

export function referrerHost(value: unknown) {
  const referrer = text(value, 500);
  if (!referrer) {
    return "";
  }

  try {
    return new URL(referrer).hostname.slice(0, 120);
  } catch {
    return "";
  }
}

export function routeErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "Unexpected error";
  const detail =
    error instanceof Error && error.cause instanceof Error
      ? error.cause.message
      : "";
  const combined = `${message}\n${detail}`;

  if (
    combined.includes("no such table") ||
    combined.includes("leads") ||
    combined.includes("booking_requests") ||
    combined.includes("consent_records") ||
    combined.includes("visitor_events")
  ) {
    return "Databasen saknar tabeller. Kor `npm run db:generate` och deploya migreringarna innan formularet anvands i produktion.";
  }

  return "Vi kunde inte spara uppgifterna just nu. Ring oss gärna om ärendet är brådskande.";
}
