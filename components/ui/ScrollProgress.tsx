"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Page-wide scroll progress: a thin vapor line pinned to the top that fills
 * left→right as you move through the document. Spring-smoothed so it glides
 * rather than tracking pixel-for-pixel.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-fracture"
    />
  );
}
