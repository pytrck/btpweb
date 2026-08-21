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
        className="relative overflow-hidden border border-line bg-white/[0.02] p-12 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] md:p-20"
        initial="hidden"
        animate={shown ? "show" : "hidden"}
      >
        {/* ambient vapor pooling in the corner of the glass */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-1/2 -left-[15%] h-[130%] w-[65%] rounded-full"
          style={{
            background: "radial-gradient(closest-side, rgba(143,2,248,0.09), transparent 72%)",
          }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: reduce ? 0.01 : 1.1, ease: EASE } },
          }}
        />
        {/* measurement ticks - diagnosis motif on opposing corners */}
        <span
          aria-hidden
          className="absolute left-0 top-0 h-3 w-3 border-l border-t border-accent-from/70"
        />
        <span
          aria-hidden
          className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-accent-from/70"
        />
        {/* bottom vapor edge - the payoff sweep */}
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-0 h-px w-full origin-left bg-fracture"
          variants={{
            hidden: { scaleX: 0 },
            show: {
              scaleX: 1,
              transition: reduce
                ? { duration: 0.01 }
                : { delay: 0.12, duration: DUR.slow, ease: EASE },
            },
          }}
        />
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 28 },
            show: {
              opacity: 1,
              y: 0,
              transition: reduce ? { duration: 0.01 } : { duration: DUR.base, ease: EASE },
            },
          }}
        >
          {/* signature moment: a vapor seam slashes through the headline on
              reveal and the type glitches once as the cut passes - the hero's
              glint-strike, echoed at the page's closing beat. */}
          <div className="relative max-w-2xl">
            <h2 className={`font-head text-h2 font-bold ${shown ? "glitch-once" : ""}`}>
              {t("title")}
            </h2>
            <motion.span
              aria-hidden
              className="pointer-events-none absolute left-[-2%] top-1/2 h-[2px] w-[104%] vapor-center"
              style={{ rotate: -3 }}
              variants={{
                hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0.85 },
                show: {
                  clipPath: "inset(0 0% 0 0)",
                  opacity: 0.8,
                  transition: reduce
                    ? { duration: 0.01 }
                    : { delay: 0.15, duration: DUR.slow, ease: EASE },
                },
              }}
            />
          </div>
          <div className="mt-8">
            <Button href="/kontakt">{t("cta")}</Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
