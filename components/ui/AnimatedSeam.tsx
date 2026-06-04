"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Signature BTP motif, scroll-linked: the vapor seam draws left→right tied to
 * scroll position (reverses on scroll up), with a fracture notch off-center.
 */
export function AnimatedSeam({
  className = "",
  notchAt = "38%",
}: {
  className?: string;
  notchAt?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "center 0.5"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 0.75], [reduce ? 1 : 0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [reduce ? 0.85 : 0.2, 0.85]);
  const notch = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);

  return (
    <div ref={ref} className={`container-x ${className}`} aria-hidden>
      <div className="relative h-px w-full">
        <motion.div
          className="absolute inset-0 origin-center vapor-center"
          style={{ scaleX, opacity }}
        />
        {!reduce && (
          <motion.div
            className="absolute top-[-2px] h-[5px] w-[5px] rotate-45 bg-accent-from"
            style={{ left: notchAt, scale: notch, opacity: notch }}
          />
        )}
      </div>
    </div>
  );
}
