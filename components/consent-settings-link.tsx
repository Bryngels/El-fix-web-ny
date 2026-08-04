"use client";

import { openConsentSettings } from "@/lib/consent";

/** Låter besökaren ändra sitt kakval i efterhand, vilket samtycket kräver. */
export function ConsentSettingsLink({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openConsentSettings} className={className}>
      Hantera kakor
    </button>
  );
}
