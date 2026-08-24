"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { DUR, EASE } from "@/lib/motion";
import { useReveal } from "@/lib/useReveal";

/**
 * Staggered group reveal. The container arms at a viewport-relative line and
 * its children reveal in sequence over fixed per-item timing - so the cascade
 * looks the same on a laptop, a large desktop monitor and on mobile instead of
 * stretching/compressing with the screen's scroll distance. Re-enters replay.
 */
export function Stagger({
  children,
  className,
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const { ref, shown } = useReveal();

  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: 0.04 } },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={shown ? "show" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  effect = "fade",
}: {
  children: React.ReactNode;
  className?: string;
  effect?: "fade" | "clip" | "scale";
}) {
  const reduce = useReducedMotion();

  // The cell carries the className - grid placement, padding, and (in hairgrid
  // sections) the 1px borders that form the line system. It animates OPACITY
  // only: a transform (translate/scale) on a bordered grid cell drags its
  // hairlines off the grid track, which is exactly the "line jump / broken
  // separator" regression. Opacity-only keeps every cell pixel-locked, and -
  // unlike an inner wrapper - it leaves flex cells (SolveGrid, LogoWall) intact.
  //
  // Variants must be identical on server and client: SSR can't know the
  // client's reduced-motion preference, and a property present in the SSR
  // style but missing from the client variants is never cleared by framer -
  // the "cards stranded clipped invisible" regression. So `reduce` branches
  // the transition (instant jump), never the variant shape.
  const hidden: Record<string, unknown> = { opacity: 0 };
  const show: Record<string, unknown> = {
    opacity: 1,
    transition:
      reduce && effect === "clip"
        ? { duration: 0.01 }
        : { duration: DUR.base, ease: EASE },
  };

  // `clip` is used only on gapped, non-hairgrid cards (FeaturedWork), so its
  // clip-path wipe can't disturb a shared hairline system - keep that flourish.
  // The shown state keeps 8px of headroom at the top (inset -8px) so a card that
  // lifts on hover (cardHover translates -4px) isn't shaved off by this clip.
  if (effect === "clip") {
    hidden.clipPath = "inset(0 0 100% 0)";
    show.clipPath = "inset(-8px 0 0% 0)";
  }

  return (
    <motion.div className={className} variants={{ hidden, show }}>
      {children}
    </motion.div>
  );
}
