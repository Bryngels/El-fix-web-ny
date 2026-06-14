import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable(
  "leads",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    publicId: text("public_id").notNull().unique(),
    type: text("type").notNull().default("quote"),
    name: text("name").notNull(),
    email: text("email").notNull().default(""),
    phone: text("phone").notNull(),
    address: text("address").notNull().default(""),
    city: text("city").notNull().default(""),
    propertyType: text("property_type").notNull().default(""),
    serviceType: text("service_type").notNull().default(""),
    urgency: text("urgency").notNull().default("normal"),
    message: text("message").notNull().default(""),
    consentPrivacy: integer("consent_privacy", { mode: "boolean" })
      .notNull()
      .default(false),
    consentMarketing: integer("consent_marketing", { mode: "boolean" })
      .notNull()
      .default(false),
    sourcePath: text("source_path").notNull().default(""),
    referrerHost: text("referrer_host").notNull().default(""),
    utmSource: text("utm_source").notNull().default(""),
    utmMedium: text("utm_medium").notNull().default(""),
    utmCampaign: text("utm_campaign").notNull().default(""),
    status: text("status").notNull().default("new"),
    crmStatus: text("crm_status").notNull().default("not_configured"),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("leads_created_at_idx").on(table.createdAt),
    index("leads_phone_idx").on(table.phone),
  ]
);

export const bookingRequests = sqliteTable(
  "booking_requests",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    publicId: text("public_id").notNull().unique(),
    name: text("name").notNull(),
    email: text("email").notNull().default(""),
    phone: text("phone").notNull(),
    address: text("address").notNull().default(""),
    city: text("city").notNull().default(""),
    serviceType: text("service_type").notNull().default(""),
    preferredWindows: text("preferred_windows").notNull().default("[]"),
    proximityFlexible: integer("proximity_flexible", { mode: "boolean" })
      .notNull()
      .default(true),
    notes: text("notes").notNull().default(""),
    consentPrivacy: integer("consent_privacy", { mode: "boolean" })
      .notNull()
      .default(false),
    consentMarketing: integer("consent_marketing", { mode: "boolean" })
      .notNull()
      .default(false),
    sourcePath: text("source_path").notNull().default(""),
    status: text("status").notNull().default("new"),
    calendarStatus: text("calendar_status").notNull().default("not_configured"),
    crmStatus: text("crm_status").notNull().default("not_configured"),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("booking_requests_created_at_idx").on(table.createdAt),
    index("booking_requests_city_idx").on(table.city),
  ]
);

export const consentRecords = sqliteTable(
  "consent_records",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    visitorId: text("visitor_id").notNull(),
    statistics: integer("statistics", { mode: "boolean" })
      .notNull()
      .default(false),
    marketing: integer("marketing", { mode: "boolean" })
      .notNull()
      .default(false),
    version: text("version").notNull(),
    sourcePath: text("source_path").notNull().default(""),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [index("consent_records_visitor_idx").on(table.visitorId)]
);

export const visitorEvents = sqliteTable(
  "visitor_events",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    visitorId: text("visitor_id").notNull(),
    eventName: text("event_name").notNull(),
    path: text("path").notNull().default(""),
    referrerHost: text("referrer_host").notNull().default(""),
    utmSource: text("utm_source").notNull().default(""),
    utmMedium: text("utm_medium").notNull().default(""),
    utmCampaign: text("utm_campaign").notNull().default(""),
    consentStatistics: integer("consent_statistics", { mode: "boolean" })
      .notNull()
      .default(false),
    consentMarketing: integer("consent_marketing", { mode: "boolean" })
      .notNull()
      .default(false),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("visitor_events_visitor_idx").on(table.visitorId),
    index("visitor_events_created_at_idx").on(table.createdAt),
  ]
);
