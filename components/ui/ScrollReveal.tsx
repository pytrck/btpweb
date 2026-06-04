"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Scroll-position-linked reveal. Eases IN as the element rises into view and
 * eases OUT (gently) as it leaves the top - bound to scroll, not a replayed
 * entrance. Scroll up and it reverses naturally.
 */
export function ScrollReveal({
  children,
  className,
  y = 30,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // Anchored higher: "in" reference at ~80% viewport height, "out" near ~20%.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const oy = useTransform(
    scrollYProgress,
    [0, 0.3, 0.85, 1],
    [reduce ? 0 : y, 0, 0, reduce ? 0 : -16]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.28, 0.85, 1],
    [0, 1, 1, reduce ? 1 : 0.5]
  );

  return (
    <motion.div ref={ref} style={{ y: oy, opacity }} className={className}>
      {children}
    </motion.div>
  );
}
