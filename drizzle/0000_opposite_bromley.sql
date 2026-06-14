CREATE TABLE `booking_requests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`public_id` text NOT NULL,
	`name` text NOT NULL,
	`email` text DEFAULT '' NOT NULL,
	`phone` text NOT NULL,
	`address` text DEFAULT '' NOT NULL,
	`city` text DEFAULT '' NOT NULL,
	`service_type` text DEFAULT '' NOT NULL,
	`preferred_windows` text DEFAULT '[]' NOT NULL,
	`proximity_flexible` integer DEFAULT true NOT NULL,
	`notes` text DEFAULT '' NOT NULL,
	`consent_privacy` integer DEFAULT false NOT NULL,
	`consent_marketing` integer DEFAULT false NOT NULL,
	`source_path` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`calendar_status` text DEFAULT 'not_configured' NOT NULL,
	`crm_status` text DEFAULT 'not_configured' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `booking_requests_public_id_unique` ON `booking_requests` (`public_id`);--> statement-breakpoint
CREATE INDEX `booking_requests_created_at_idx` ON `booking_requests` (`created_at`);--> statement-breakpoint
CREATE INDEX `booking_requests_city_idx` ON `booking_requests` (`city`);--> statement-breakpoint
CREATE TABLE `consent_records` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`visitor_id` text NOT NULL,
	`statistics` integer DEFAULT false NOT NULL,
	`marketing` integer DEFAULT false NOT NULL,
	`version` text NOT NULL,
	`source_path` text DEFAULT '' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `consent_records_visitor_idx` ON `consent_records` (`visitor_id`);--> statement-breakpoint
CREATE TABLE `leads` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`public_id` text NOT NULL,
	`type` text DEFAULT 'quote' NOT NULL,
	`name` text NOT NULL,
	`email` text DEFAULT '' NOT NULL,
	`phone` text NOT NULL,
	`address` text DEFAULT '' NOT NULL,
	`city` text DEFAULT '' NOT NULL,
	`property_type` text DEFAULT '' NOT NULL,
	`service_type` text DEFAULT '' NOT NULL,
	`urgency` text DEFAULT 'normal' NOT NULL,
	`message` text DEFAULT '' NOT NULL,
	`consent_privacy` integer DEFAULT false NOT NULL,
	`consent_marketing` integer DEFAULT false NOT NULL,
	`source_path` text DEFAULT '' NOT NULL,
	`referrer_host` text DEFAULT '' NOT NULL,
	`utm_source` text DEFAULT '' NOT NULL,
	`utm_medium` text DEFAULT '' NOT NULL,
	`utm_campaign` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`crm_status` text DEFAULT 'not_configured' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `leads_public_id_unique` ON `leads` (`public_id`);--> statement-breakpoint
CREATE INDEX `leads_created_at_idx` ON `leads` (`created_at`);--> statement-breakpoint
CREATE INDEX `leads_phone_idx` ON `leads` (`phone`);--> statement-breakpoint
CREATE TABLE `visitor_events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`visitor_id` text NOT NULL,
	`event_name` text NOT NULL,
	`path` text DEFAULT '' NOT NULL,
	`referrer_host` text DEFAULT '' NOT NULL,
	`utm_source` text DEFAULT '' NOT NULL,
	`utm_medium` text DEFAULT '' NOT NULL,
	`utm_campaign` text DEFAULT '' NOT NULL,
	`consent_statistics` integer DEFAULT false NOT NULL,
	`consent_marketing` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `visitor_events_visitor_idx` ON `visitor_events` (`visitor_id`);--> statement-breakpoint
CREATE INDEX `visitor_events_created_at_idx` ON `visitor_events` (`created_at`);