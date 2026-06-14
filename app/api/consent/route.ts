import { consentRecords } from "@/db/schema";
import { getDb } from "@/db";
import { routeErrorMessage, text, truthy } from "@/lib/payload";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const visitorId = text(payload.visitorId, 120);
    const version = text(payload.version, 40);

    if (!visitorId || !version) {
      return Response.json({ error: "Samtycke saknar id eller version." }, { status: 400 });
    }

    const db = getDb();
    await db.insert(consentRecords).values({
      visitorId,
      statistics: truthy(payload.statistics),
      marketing: truthy(payload.marketing),
      version,
      sourcePath: text(payload.sourcePath, 220),
    });

    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    return Response.json({ error: routeErrorMessage(error) }, { status: 500 });
  }
}
