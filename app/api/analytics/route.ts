import { visitorEvents } from "@/db/schema";
import { getDb } from "@/db";
import { sendWebhook } from "@/lib/integrations";
import { referrerHost, routeErrorMessage, text, truthy } from "@/lib/payload";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const visitorId = text(payload.visitorId, 120);
    const eventName = text(payload.eventName, 80);
    const consentStatistics = truthy(payload.consentStatistics);

    if (!visitorId || !eventName || !consentStatistics) {
      return Response.json({ error: "Statistik kräver aktivt samtycke." }, { status: 400 });
    }

    const event = {
      visitorId,
      eventName,
      path: text(payload.path, 220),
      referrerHost: referrerHost(payload.referrer),
      utmSource: text(payload.utmSource, 120),
      utmMedium: text(payload.utmMedium, 120),
      utmCampaign: text(payload.utmCampaign, 120),
      consentStatistics,
      consentMarketing: truthy(payload.consentMarketing),
    };

    const db = getDb();
    await db.insert(visitorEvents).values(event);
    await sendWebhook("analytics", event);

    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    return Response.json({ error: routeErrorMessage(error) }, { status: 500 });
  }
}
