import { eq } from "drizzle-orm";
import { bookingRequests } from "@/db/schema";
import { getDb } from "@/db";
import { sendWebhook } from "@/lib/integrations";
import {
  routeErrorMessage,
  text,
  textArray,
  truthy,
} from "@/lib/payload";

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

    const preferredWindows = textArray(payload.preferredWindows);
    const db = getDb();
    const [booking] = await db
      .insert(bookingRequests)
      .values({
        publicId: crypto.randomUUID(),
        name,
        phone,
        email: text(payload.email, 160),
        address: text(payload.address, 180),
        city: text(payload.city, 120),
        serviceType: text(payload.serviceType, 120),
        preferredWindows: JSON.stringify(preferredWindows),
        proximityFlexible: truthy(payload.proximityFlexible),
        notes: text(payload.notes, 1600),
        consentPrivacy,
        consentMarketing: truthy(payload.consentMarketing),
        sourcePath: text(payload.sourcePath, 220),
      })
      .returning();

    const calendarWebhook = await sendWebhook("calendar", {
      bookingId: booking.publicId,
      name: booking.name,
      phone: booking.phone,
      email: booking.email,
      address: booking.address,
      city: booking.city,
      serviceType: booking.serviceType,
      preferredWindows,
      proximityFlexible: booking.proximityFlexible,
      notes: booking.notes,
      createdAt: booking.createdAt,
    });

    const crmWebhook = await sendWebhook("crm", {
      bookingId: booking.publicId,
      type: "booking_request",
      name: booking.name,
      phone: booking.phone,
      email: booking.email,
      city: booking.city,
      serviceType: booking.serviceType,
      preferredWindows,
      proximityFlexible: booking.proximityFlexible,
      consentMarketing: booking.consentMarketing,
      createdAt: booking.createdAt,
    });

    await db
      .update(bookingRequests)
      .set({
        calendarStatus: calendarWebhook.status,
        crmStatus: crmWebhook.status,
      })
      .where(eq(bookingRequests.id, booking.id));

    return Response.json(
      {
        ok: true,
        id: booking.publicId,
        calendarIntegration: calendarWebhook.status,
        crmIntegration: crmWebhook.status,
        message:
          "Tack, vi har tagit emot ditt bokningsönskemål och återkommer med bekräftad tid.",
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ error: routeErrorMessage(error) }, { status: 500 });
  }
}
