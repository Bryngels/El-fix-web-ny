import type { Metadata } from "next";
import { Suspense } from "react";
import { GoogleAnalytics } from "@/components/google-analytics";
import {
  GoogleTagManagerHead,
  GoogleTagManagerNoScript,
} from "@/components/google-tag-manager";
import { TrackingRuntime } from "@/components/tracking-runtime";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://el-fix.se"),
  title: {
    default: "El-Fix | Elektriker i Sundsvall",
    template: "%s",
  },
  description:
    "Modernt installationsföretag i Sundsvall för elinstallation, service, elbesiktning, laddbox och energioptimering.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "El-Fix | Elektriker i Sundsvall",
    description:
      "Riktiga elektriker för hem, företag, fastigheter och energioptimering i Sundsvall.",
    images: ["/images/elfix-skatan-solar-work.webp"],
    locale: "sv_SE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <head>
        <GoogleTagManagerHead />
      </head>
      <body>
        <GoogleTagManagerNoScript />
        {children}
        <TrackingRuntime />
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
      </body>
    </html>
  );
}
