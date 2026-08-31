"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown };
    _fbq?: unknown;
  }
}

/**
 * Meta-pixeln. Renderas bara när besökaren sagt ja till marknadsföring.
 *
 * Noscript-varianten från Metas kodsnutt är utelämnad med flit: utan
 * JavaScript kan besökaren inte lämna samtycke, och då ska ingenting hämtas
 * från Facebook.
 */
export function MetaPixel() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Kodsnutten nedan räknar första sidvisningen själv. Klick vidare i
    // menyn byter sida utan omladdning, och de måste rapporteras här.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    window.fbq?.("track", "PageView");
  }, [pathname]);

  if (!pixelId) {
    return null;
  }

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${pixelId}');
        fbq('track', 'PageView');
      `}
    </Script>
  );
}
