"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function CTABlock() {
  const t = useTranslations("footerCta");
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "center 0.45"],
  });

  // content arrives + recedes with scroll
  const y = useTransform(scrollYProgress, [0, 0.55], [reduce ? 0 : 40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  // vapor edges draw as you reach the payoff, ease back as you pass
  const edgeY = useTransform(scrollYProgress, [0.1, 0.6], [reduce ? 1 : 0, 1]);
  const edgeX = useTransform(scrollYProgress, [0.25, 0.85], [reduce ? 1 : 0, 1]);

  return (
    <section className="container-x py-section">
      <div ref={ref} className="relative overflow-hidden border border-line p-12 md:p-20">
        {/* left vapor edge */}
        <motion.div
          aria-hidden
          className="absolute left-0 top-0 h-full w-1 origin-top bg-fracture"
          style={{ scaleY: edgeY }}
        />
        {/* bottom vapor edge - the payoff sweep */}
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-0 h-px w-full origin-left bg-fracture"
          style={{ scaleX: edgeX }}
        />
        <motion.div style={{ y, opacity }}>
          <h2 className="max-w-2xl font-head text-h2 font-bold">{t("title")}</h2>
          <div className="mt-8">
            <Button href="/kontakt">{t("cta")}</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
