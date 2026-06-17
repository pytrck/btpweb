"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Signature seam between sections: a centre-weighted vapor crack that draws and
 * glows as you scroll through it, with a fracture notch on the seam. The strip
 * is transparent, so the scroll orb passes behind it — the crack reads as light
 * leaking through. Animates transform/opacity only.
 */
export function FractureDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleX = useTransform(scrollYProgress, [0.1, 0.5], [reduce ? 1 : 0.25, 1]);
  const glow = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [0.15, 1, 0.45]);
  const notch = useTransform(scrollYProgress, [0.35, 0.62], [reduce ? 1 : 0, 1]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative h-[15vh] overflow-hidden md:h-[20vh]"
    >
      {/* soft vapor bloom radiating from the centre of the crack */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-28 w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(255,16,240,0.3),transparent_70%)] blur-2xl"
        style={{ opacity: glow }}
      />
      {/* centre-weighted seam — fades to nothing at both ends */}
      <motion.div
        className="absolute left-0 top-1/2 h-px w-full origin-center -translate-y-1/2 vapor-center"
        style={{ opacity: glow, scaleX }}
      />
      {/* thin bright core along the middle of the seam */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-px w-[42%] origin-center -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,transparent,#ff10f0,transparent)] blur-[1px]"
        style={{ opacity: glow, scaleX }}
      />
      {/* fracture notch — square on the seam, centred on both axes */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-2 w-2 bg-paper shadow-[0_0_16px_5px_rgba(255,16,240,0.9)]"
        style={{ scale: notch, opacity: notch, x: "-50%", y: "-50%", rotate: 45 }}
      />
    </div>
  );
}
