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
    "btp-focus group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded px-6 py-3 text-sm font-medium";
  // primary: the shared premium paper button (inset highlight, vapor under-glow,
  // lift, and a vapor sheen that sweeps across on hover — see .btn-paper).
  // ghost: quiet glass tile.
  const styles =
    variant === "primary"
      ? "btn-paper"
      : "border border-line bg-white/[0.03] text-paper backdrop-blur-sm transition-colors duration-300 hover:border-paper/60 hover:bg-white/[0.07]";

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
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.18, ease: EASE }}
    >
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className={`relative z-10 text-accent-from transition-transform duration-300 group-hover:translate-x-1 ${
          variant === "ghost" ? "opacity-70" : ""
        }`}
      >
        →
      </span>
    </MotionLink>
    </motion.span>
  );
}
