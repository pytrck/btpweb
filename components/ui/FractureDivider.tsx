"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Signature WOW transition: a diagonal vapor crack that splits open as you
 * scroll through it. Two ink panels slide apart on a diagonal seam, exposing
 * the vapor gradient beneath. Animates transform only.
 */
export function FractureDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // panels split open around the center of the viewport pass
  const yTop = useTransform(scrollYProgress, [0.15, 0.85], [0, reduce ? -8 : -34]);
  const yBot = useTransform(scrollYProgress, [0.15, 0.85], [0, reduce ? 8 : 34]);
  const glow = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.4, 1, 0.6]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative h-[15vh] overflow-hidden bg-ink md:h-[20vh]"
    >
      {/* vapor underlayer, revealed through the crack - radiates from centre */}
      <motion.div className="absolute inset-0 vapor-center" style={{ opacity: glow }} />
      {/* fracture notch riding the seam */}
      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-paper" />
      {/* upper ink panel */}
      <motion.div
        className="absolute inset-0 bg-ink"
        style={{ y: yTop, clipPath: "polygon(0 0, 100% 0, 100% 47%, 0 55%)" }}
      />
      {/* lower ink panel */}
      <motion.div
        className="absolute inset-0 bg-ink"
        style={{ y: yBot, clipPath: "polygon(0 55%, 100% 47%, 100% 100%, 0 100%)" }}
      />
    </div>
  );
}
