"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * A vapor fracture drawn across the page between sections. No opaque panels: the
 * container is transparent, so the page background and the scroll orb pass right
 * through — only the glow, the drawn seam, and the notch render. The seam draws
 * in and brightens as it crosses the viewport.
 */
export function FractureDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // seam draws in as it crosses; glow blooms brightest at centre pass
  const scaleX = useTransform(scrollYProgress, [0.15, 0.5], [reduce ? 1 : 0.15, 1]);
  const glow = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.35, 1, 0.5]);

  return (
    <div ref={ref} aria-hidden className="relative h-[12vh] overflow-hidden md:h-[16vh]">
      {/* radial vapor bloom that fades to transparent on every side — no black
          block; the ink page + orb show through */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: glow,
          background:
            "radial-gradient(ellipse 60% 42% at 50% 50%, rgba(143,2,248,0.5), rgba(143,2,248,0.08) 42%, transparent 72%)",
        }}
      />
      {/* the fracture seam — a bright vapor line that draws across the centre */}
      <motion.div
        className="vapor-center absolute left-0 top-1/2 h-px w-full origin-center -translate-y-1/2"
        style={{ scaleX, opacity: glow }}
      />
      {/* fracture notch riding the seam */}
      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-paper" />
    </div>
  );
}
