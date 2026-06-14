import { env } from "cloudflare:workers";

type WebhookKind = "crm" | "calendar" | "analytics";

type WebhookResult = {
  status: "not_configured" | "sent" | "failed";
  statusCode?: number;
};

const envRecord = env as unknown as Record<string, string | undefined>;

function webhookUrl(kind: WebhookKind) {
  if (kind === "crm") {
    return envRecord.CRM_WEBHOOK_URL;
  }

  if (kind === "calendar") {
    return envRecord.CALENDAR_WEBHOOK_URL;
  }

  return envRecord.ANALYTICS_WEBHOOK_URL;
}

export async function sendWebhook(
  kind: WebhookKind,
  payload: Record<string, unknown>
): Promise<WebhookResult> {
  const url = webhookUrl(kind);
  if (!url) {
    return { status: "not_configured" };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        source: "el-fix.se",
        kind,
        sentAt: new Date().toISOString(),
        payload,
      }),
    });

    return {
      status: response.ok ? "sent" : "failed",
      statusCode: response.status,
    };
  } catch {
    return { status: "failed" };
  }
}
