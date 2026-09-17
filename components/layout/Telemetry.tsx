"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * The signals no data-umami-event attribute can catch: people leaving the site
 * through a link, reaching for email / phone, and the site breaking in their
 * browser. Renders nothing. Links that carry their own data-umami-event are
 * skipped so nothing is counted twice.
 */
export function Telemetry() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.dataset.umamiEvent) return;
      const href = a.getAttribute("href") ?? "";
      if (href.startsWith("mailto:")) track("contact-email");
      else if (href.startsWith("tel:")) track("contact-phone");
      else if (a.origin !== location.origin) track("outbound", { url: a.href });
    };
    const onError = (e: ErrorEvent) =>
      track("js-error", { message: String(e.message).slice(0, 200), path: location.pathname });
    const onRejection = (e: PromiseRejectionEvent) =>
      track("js-error", {
        message: String(e.reason?.message ?? e.reason).slice(0, 200),
        path: location.pathname,
      });

    document.addEventListener("click", onClick, true);
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);
  return null;
}
