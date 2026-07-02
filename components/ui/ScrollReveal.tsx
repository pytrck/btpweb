"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DUR, EASE } from "@/lib/motion";
import { useReveal } from "@/lib/useReveal";

/**
 * Reveal as the element scrolls into view, played over a constant duration so it
 * reads identically across screen sizes. Uses the bulletproof `useReveal`
 * trigger - content can never get stranded invisible. Reduced motion → opacity
 * only, no transform.
 */
export function ScrollReveal({
  children,
  className,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  const { ref, shown } = useReveal();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={shown ? "show" : "hidden"}
      variants={{
        // hidden must be identical on server and client (SSR can't know the
        // client's reduced-motion preference) - so reduce branches the
        // transition (instant jump), never the SSR-rendered style.
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: reduce ? { duration: 0.01 } : { duration: DUR.base, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
