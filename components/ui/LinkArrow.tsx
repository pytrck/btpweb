"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { EASE } from "@/lib/motion";

const MotionLink = motion(Link);

export function LinkArrow({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <MotionLink
      href={href}
      className={`btp-focus group inline-flex items-center gap-2 text-sm font-medium text-paper ${className}`}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <span className="relative">
        {children}
        <motion.span
          aria-hidden
          className="absolute -bottom-1 left-0 h-px w-full origin-left bg-fracture"
          variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
          transition={{ duration: 0.35, ease: EASE }}
        />
      </span>
      <motion.span
        aria-hidden
        className="text-accent-from"
        variants={{ rest: { x: 0 }, hover: { x: 5 } }}
        transition={{ duration: 0.25, ease: EASE }}
      >
        →
      </motion.span>
    </MotionLink>
  );
}
