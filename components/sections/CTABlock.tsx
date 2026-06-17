"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { DUR, EASE } from "@/lib/motion";
import { useReveal } from "@/lib/useReveal";

export function CTABlock() {
  const t = useTranslations("footerCta");
  const reduce = useReducedMotion();
  const { ref, shown } = useReveal();

  return (
    <section className="container-x py-section">
      <motion.div
        ref={ref}
        className="relative overflow-hidden border border-line p-12 md:p-20"
        initial="hidden"
        animate={shown ? "show" : "hidden"}
      >
        {/* left vapor edge */}
        <motion.div
          aria-hidden
          className="absolute left-0 top-0 h-full w-1 origin-top bg-fracture"
          variants={{
            hidden: { scaleY: reduce ? 1 : 0 },
            show: { scaleY: 1, transition: { duration: DUR.slow, ease: EASE } },
          }}
        />
        {/* bottom vapor edge - the payoff sweep */}
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-0 h-px w-full origin-left bg-fracture"
          variants={{
            hidden: { scaleX: reduce ? 1 : 0 },
            show: { scaleX: 1, transition: { delay: 0.12, duration: DUR.slow, ease: EASE } },
          }}
        />
        <motion.div
          variants={{
            hidden: { opacity: 0, y: reduce ? 0 : 28 },
            show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
          }}
        >
          <h2 className="max-w-2xl font-head text-h2 font-bold">{t("title")}</h2>
          <div className="mt-8">
            <Button href="/kontakt">{t("cta")}</Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
