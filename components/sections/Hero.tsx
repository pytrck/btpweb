"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { heroContainer, heroItem, lineMask } from "@/lib/motion";

const BRAND = "Break The Pattern";

/**
 * Two-line editorial headline: a smaller "setup" line, then a dominant "payoff"
 * line. The brand name in the payoff is set in the vapor gradient and drifts
 * off-grid on scroll (the signature moment). Splits on the first sentence break,
 * so the line break is deliberate, not automatic.
 */
function HeroHeadline({ title, x }: { title: string; x: MotionValue<number> }) {
  const idx = title.indexOf(". ");
  const setup = idx >= 0 ? title.slice(0, idx + 1) : title;
  const payoff = idx >= 0 ? title.slice(idx + 2) : "";

  const bIdx = payoff.indexOf(BRAND);
  const payoffContent =
    bIdx >= 0 ? (
      <>
        {payoff.slice(0, bIdx)}
        {/* Signature crack motif (same as the 404): a thin vapor seam that
            passes BEHIND the brand name, showing through the gradient text's
            negative space. Drifts off-grid with the word on scroll. */}
        <motion.span style={{ x }} className="relative inline-block">
          <span
            aria-hidden
            className="vapor-center pointer-events-none absolute left-[-2%] top-1/2 h-px w-[104%]"
            style={{ transform: "translateY(-50%) rotate(-4deg)", opacity: 0.7 }}
          />
          <span className="vapor-text relative">{BRAND}</span>
        </motion.span>
        {payoff.slice(bIdx + BRAND.length)}
      </>
    ) : (
      payoff
    );

  return (
    <>
      <span className="block text-balance text-[0.56em] font-semibold leading-[1.05] text-paper/90">
        {setup}
      </span>
      {payoff && (
        <span className="mt-3 block text-balance tracking-[-0.02em]">{payoffContent}</span>
      )}
    </>
  );
}

export function Hero() {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // stronger cinematic exit: drift up, recede in scale, fade
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, reduce ? 1 : 0]);
  // signature: accent word breaks the grid harder on scroll
  const wordX = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 64]);
  // fracture line draws in reaction to scroll progress
  const seamScale = useTransform(scrollYProgress, [0, 0.55], [0, 1]);
  const seamOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 0.9]);

  return (
    <section ref={ref} className="relative">
      <motion.div
        style={{ y, scale, opacity }}
        className="container-x grid min-h-[86vh] grid-cols-12 content-center gap-y-8 py-section"
      >
        <motion.div className="contents" variants={heroContainer} initial="hidden" animate="show">
          <div className="col-span-12 md:col-span-11">
            <motion.p variants={heroItem} className="label text-accent-from">
              {t("kicker")}
            </motion.p>
            <motion.h1
              variants={lineMask}
              className="mt-6 font-head text-[clamp(2.9rem,6.6vw,5.4rem)] font-bold leading-[0.95]"
            >
              <HeroHeadline title={t("title")} x={wordX} />
            </motion.h1>
          </div>
          {/* off-grid: subtitle pushed right, breaking the left column */}
          <div className="col-span-12 md:col-span-7 md:col-start-5">
            <motion.p variants={heroItem} className="text-lg text-muted">
              {t("subtitle")}
            </motion.p>
            <motion.div variants={heroItem} className="mt-8 flex flex-wrap gap-4">
              <Button href="/kontakt">{t("ctaPrimary")}</Button>
              <Button href="/prace" variant="ghost">
                {t("ctaSecondary")}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* scroll-reactive fracture line - grows as you leave the hero */}
      <div className="container-x" aria-hidden>
        <motion.div
          className="h-px w-full origin-center vapor-center"
          style={{ scaleX: seamScale, opacity: seamOpacity }}
        />
      </div>
    </section>
  );
}
