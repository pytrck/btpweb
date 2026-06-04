"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Continuous scroll parallax on the Y axis. Drift only — never loops.
 * Reduced-motion → static. Distance kept small for performance + taste.
 */
export function Parallax({
  children,
  className,
  distance = 50,
  from = "up",
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  from?: "up" | "down";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const d = reduce ? 0 : distance;
  const y = useTransform(scrollYProgress, [0, 1], from === "up" ? [d, -d] : [-d, d]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
