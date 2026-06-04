"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { EASE } from "@/lib/motion";

const MotionLink = motion(Link);

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
};

export function Button({ href, children, variant = "primary" }: Props) {
  const base =
    "btp-focus group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded px-6 py-3 text-sm font-medium transition-colors duration-300";
  const styles =
    variant === "primary"
      ? "border border-paper bg-paper text-ink hover:bg-transparent hover:text-paper"
      : "border border-line text-paper hover:border-paper";

  return (
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
    </MotionLink>
  );
}
