"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DUR, EASE } from "@/lib/motion";
import { useReveal } from "@/lib/useReveal";

/**
 * Signature BTP motif: the vapor seam draws left→right with a fracture notch
 * off-centre. Triggered in-view and played over a fixed duration, so the draw
 * reads at the same pace on every screen size instead of completing too low /
 * too slowly on tall displays. Re-enters replay.
 */
export function AnimatedSeam({
  className = "",
  notchAt = "38%",
}: {
  className?: string;
  notchAt?: string;
}) {
  const reduce = useReducedMotion();
  const { ref, shown } = useReveal();

  return (
    <motion.div
      ref={ref}
      className={`container-x ${className}`}
      aria-hidden
      initial="hidden"
      animate={shown ? "show" : "hidden"}
    >
      <div className="relative h-px w-full">
        <motion.div
          className="absolute inset-0 origin-center vapor-center"
          variants={{
            hidden: { scaleX: reduce ? 1 : 0, opacity: reduce ? 0.85 : 0.2 },
            show: { scaleX: 1, opacity: 0.85, transition: { duration: DUR.seam, ease: EASE } },
          }}
        />
        {!reduce && (
          <motion.div
            className="absolute top-[-2px] h-[5px] w-[5px] bg-accent-from"
            style={{ left: notchAt }}
            variants={{
              hidden: { scale: 0, opacity: 0, rotate: 45 },
              show: {
                scale: 1,
                opacity: 1,
                rotate: 45,
                transition: { delay: 0.45, duration: DUR.fast, ease: "easeOut" },
              },
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
