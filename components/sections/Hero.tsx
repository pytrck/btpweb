"use client";

import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { heroContainer, heroItem, lineMask } from "@/lib/motion";

// accent word per locale — highlight, never rewrite copy
const ACCENT_WORD: Record<string, string> = { cs: "trhlinu", en: "crack" };

function HeroTitle({
  title,
  locale,
  x,
}: {
  title: string;
  locale: string;
  x: MotionValue<number>;
}) {
  const word = ACCENT_WORD[locale];
  if (!word || !title.includes(word)) return <>{title}</>;
  const [before, after] = title.split(word);
  return (
    <>
      {before}
      <motion.span style={{ x }} className="vapor-text inline-block">
        {word}
      </motion.span>
      {after}
    </>
  );
}

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
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
              className="mt-6 font-head text-h1 font-bold leading-[0.95]"
            >
              <HeroTitle title={t("title")} locale={locale} x={wordX} />
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

      {/* scroll-reactive fracture line — grows as you leave the hero */}
      <div className="container-x" aria-hidden>
        <motion.div
          className="h-px w-full origin-center vapor-center"
          style={{ scaleX: seamScale, opacity: seamOpacity }}
        />
      </div>
    </section>
  );
}
