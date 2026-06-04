"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { heroContainer, heroItem, lineMask, EASE } from "@/lib/motion";

const BRAND = "Break The Pattern";

/**
 * Signature moment: the brand name is optically fractured by the seam. The word
 * is rendered as two clipped halves (upper / lower) that offset a few px along a
 * vapor seam, so the text reads as broken along a fault line - same crack
 * language as the 404, but applied to the type itself. Readable (a real text
 * node is exposed to screen readers), static after a one-time reveal, and it
 * drifts off-grid with the word on scroll.
 */
function FracturedBrand({ text, x }: { text: string; x: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const off = reduce ? 0 : 3;
  const split = { duration: 0.7, ease: EASE, delay: 0.55 };
  return (
    <motion.span style={{ x }} className="relative inline-block align-baseline" aria-label={text}>
      <span className="sr-only">{text}</span>
      {/* upper half (in-flow, sizes the box) */}
      <motion.span
        aria-hidden
        className="vapor-text block"
        style={{ clipPath: "inset(0 0 49% 0)" }}
        initial={{ x: 0 }}
        animate={{ x: -off }}
        transition={split}
      >
        {text}
      </motion.span>
      {/* lower half (overlaid, offset the other way) */}
      <motion.span
        aria-hidden
        className="vapor-text absolute inset-0"
        style={{ clipPath: "inset(51% 0 0 0)" }}
        initial={{ x: 0 }}
        animate={{ x: off }}
        transition={split}
      >
        {text}
      </motion.span>
      {/* the seam itself, sitting in the gap between the halves */}
      <motion.span
        aria-hidden
        className="vapor-center absolute left-[-2%] top-1/2 h-[2px] w-[104%] -translate-y-1/2"
        initial={{ opacity: reduce ? 0.85 : 0, scaleX: reduce ? 1 : 0.5 }}
        animate={{ opacity: 0.85, scaleX: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
      />
    </motion.span>
  );
}

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
        <FracturedBrand text={BRAND} x={x} />
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
  // signature: brand name drifts off-grid on scroll (restrained)
  const wordX = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40]);
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
            <motion.p variants={heroItem} className="max-w-xl text-lg text-muted">
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
