"use client";

import type { AnchorHTMLAttributes, MouseEventHandler, ReactNode } from "react";

type TrackingEvent = "cta_click" | "email_click" | "phone_click";

type TrackedLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  eventName: TrackingEvent;
  eventLocation: string;
  eventLabel?: string;
  children: ReactNode;
};

export function TrackedLink({
  children,
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

    window.gtag?.("event", eventName, {
      link_url: href,
      link_text: linkText,
      link_location: eventLocation,
    });

    window.dataLayer?.push({
      event: eventName,
      link_url: href,
      link_text: linkText,
      link_location: eventLocation,
    });
  };

  return (
    <a
      href={href}
      data-analytics-event={eventName}
      data-analytics-location={eventLocation}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
}
