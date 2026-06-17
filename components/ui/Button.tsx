"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { EASE } from "@/lib/motion";

const MotionLink = motion(Link);

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
};

export function Button({ href, children, variant = "primary" }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 200, damping: 15, mass: 0.4 });
  const y = useSpring(my, { stiffness: 200, damping: 15, mass: 0.4 });

  function onMove(e: React.MouseEvent) {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    // pull toward cursor, capped — magnetic feel
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 14);
  }
  function reset() {
    mx.set(0);
    my.set(0);
  }

  const base =
    "btp-focus group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded px-6 py-3 text-sm font-medium transition-colors duration-300";
  const styles =
    variant === "primary"
      ? "border border-paper bg-paper text-ink hover:bg-transparent hover:text-paper"
      : "border border-line text-paper hover:border-paper";

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x, y }}
      className="inline-block"
    >
    <MotionLink
      href={href}
      className={`${base} ${styles}`}
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      initial="rest"
      animate="rest"
      transition={{ duration: 0.18, ease: EASE }}
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        aria-hidden
        className="relative z-10 text-accent-from"
        variants={{ rest: { x: 0, opacity: variant === "ghost" ? 0.7 : 1 }, hover: { x: 4 } }}
      >
        →
      </motion.span>
      {/* vapor edge that ignites along the bottom on hover */}
      <motion.span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-fracture"
        variants={{ rest: { scaleX: 0, opacity: 0 }, hover: { scaleX: 1, opacity: 1 } }}
        transition={{ duration: 0.4, ease: EASE }}
      />
      {/* vapor wash that sweeps up on hover (primary only) */}
      {variant === "primary" && (
        <motion.span
          aria-hidden
          className="absolute inset-0 origin-bottom bg-[radial-gradient(circle_at_bottom,rgba(255,16,240,0.25),transparent_70%)]"
          variants={{ rest: { scaleY: 0, opacity: 0 }, hover: { scaleY: 1, opacity: 1 } }}
          transition={{ duration: 0.4, ease: EASE }}
        />
      )}
    </MotionLink>
    </motion.span>
  );
}
