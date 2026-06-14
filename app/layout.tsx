import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "El-Fix | Elektriker i Sundsvall",
  description:
    "Trygga elinstallationer, service, besiktning och energioptimering i Sundsvall med omnejd.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "El-Fix | Riktiga elektriker för trygga installationer",
    description:
      "Modern offert- och bokningssida för El-Fix, med GDPR-anpassad leadhantering och smart teknikerbokning.",
    images: ["/images/el-fix-hero.png"],
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
      <body>{children}</body>
    </html>
  );
}
