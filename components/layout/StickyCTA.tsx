"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { EASE } from "@/lib/motion";

/**
 * Persistent conversion affordance. Slides in once the hero has scrolled off
 * (~90vh), so the primary action is always one tap away without competing with
 * the hero's own CTAs. Reduced motion → crossfade only. Links to /kontakt;
 * tap-to-call is intentionally omitted until a real phone number lands in
 * content/site.ts (currently a placeholder).
 */
export function StickyCTA() {
  const t = useTranslations("nav");
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduce ? 0 : 20 }}
          transition={{ duration: reduce ? 0.15 : 0.4, ease: EASE }}
          className="fixed inset-x-0 bottom-5 z-40 flex justify-center px-4 md:hidden"
        >
          <Link
            href="/kontakt"
            className="btp-focus group relative flex w-full max-w-sm items-center justify-center gap-2 overflow-hidden rounded border border-paper bg-paper px-6 py-3.5 text-sm font-medium text-ink shadow-[0_8px_32px_-6px_rgba(255,16,240,0.45)]"
          >
            <span className="relative z-10">{t("cta")}</span>
            <span aria-hidden className="relative z-10 text-accent-from">
              →
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
