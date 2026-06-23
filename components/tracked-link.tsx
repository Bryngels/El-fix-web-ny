"use client";

import type { AnchorHTMLAttributes, MouseEventHandler, ReactNode } from "react";

export type TrackingEvent =
  | "click_phone"
  | "click_email"
  | "click_quote"
  | "click_contact"
  | "generate_lead";

type TrackedLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  eventName: TrackingEvent;
  additionalEvents?: TrackingEvent[];
  eventLocation: string;
  eventLabel?: string;
  eventContext?: string;
  children: ReactNode;
};

type DataLayerEvent = {
  event: TrackingEvent;
  link_url: string;
  link_text?: string;
  link_location: string;
  link_context?: string;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown> | IArguments>;
  }
}

export function TrackedLink({
  additionalEvents = [],
  children,
  eventContext,
  eventLabel,
  eventLocation,
  eventName,
  href,
  onClick,
  ...props
}: TrackedLinkProps) {
  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    onClick?.(event);

    if (event.defaultPrevented || typeof window === "undefined") {
      return;
    }

    const linkText = eventLabel ?? (typeof children === "string" ? children : undefined);
    const events = [eventName, ...additionalEvents];

    window.dataLayer = window.dataLayer || [];
    events.forEach((eventType) => {
      const payload: DataLayerEvent = {
        event: eventType,
        link_url: href,
        link_text: linkText,
        link_location: eventLocation,
      };

      if (eventContext) {
        payload.link_context = eventContext;
      }

      window.dataLayer?.push(payload);
    });
  };

  const dataEvents = [eventName, ...additionalEvents].join(",");

  return (
    <a
      href={href}
      data-analytics-event={eventName}
      data-gtm-event={eventName}
      data-gtm-events={dataEvents}
      data-gtm-label={eventLabel}
      data-analytics-location={eventLocation}
      data-gtm-location={eventLocation}
      data-gtm-context={eventContext}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
}
