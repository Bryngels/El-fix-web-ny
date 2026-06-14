import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { leads } from "@/db/schema";
import { sendWebhook } from "@/lib/integrations";
import { referrerHost, routeErrorMessage, text, truthy } from "@/lib/payload";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const name = text(payload.name, 120);
    const phone = text(payload.phone, 80);
    const consentPrivacy = truthy(payload.consentPrivacy);

    if (!name || !phone || !consentPrivacy) {
      return Response.json(
        {
          error:
            "Namn, telefon och godkänd behandling av personuppgifter krävs.",
        },
        { status: 400 }
      );
    }

    const db = getDb();
    const [lead] = await db
      .insert(leads)
      .values({
        publicId: crypto.randomUUID(),
        type: text(payload.type, 40) || "quote",
        name,
        phone,
        email: text(payload.email, 160),
        address: text(payload.address, 180),
        city: text(payload.city, 120),
        propertyType: text(payload.propertyType, 80),
        serviceType: text(payload.serviceType, 120),
        urgency: text(payload.urgency, 40) || "normal",
        message: text(payload.message, 1600),
        consentPrivacy,
        consentMarketing: truthy(payload.consentMarketing),
        sourcePath: text(payload.sourcePath, 220),
        referrerHost: referrerHost(payload.referrer),
        utmSource: text(payload.utmSource, 120),
        utmMedium: text(payload.utmMedium, 120),
        utmCampaign: text(payload.utmCampaign, 120),
      })
      .returning();

    const webhook = await sendWebhook("crm", {
      leadId: lead.publicId,
      type: lead.type,
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      address: lead.address,
      city: lead.city,
      propertyType: lead.propertyType,
      serviceType: lead.serviceType,
      urgency: lead.urgency,
      message: lead.message,
      consentMarketing: lead.consentMarketing,
      sourcePath: lead.sourcePath,
      referrerHost: lead.referrerHost,
      utmSource: lead.utmSource,
      utmMedium: lead.utmMedium,
      utmCampaign: lead.utmCampaign,
      createdAt: lead.createdAt,
    });

    if (webhook.status !== lead.crmStatus) {
      await db
        .update(leads)
        .set({ crmStatus: webhook.status })
        .where(eq(leads.id, lead.id));
    }

    return Response.json(
      {
        ok: true,
        id: lead.publicId,
        integration: webhook.status,
        message:
          "Tack, vi har tagit emot din offertförfrågan och återkommer snart.",
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ error: routeErrorMessage(error) }, { status: 500 });
  }
}
