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
    "btp-focus group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded px-6 py-3 text-sm font-medium transition-[box-shadow,border-color,background-color] duration-300";
  // primary: solid paper lens — inner top highlight reads as glass edge, vapor
  // under-glow lifts it off the ink on hover. ghost: quiet glass tile.
  const styles =
    variant === "primary"
      ? "border border-paper bg-paper text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_32px_-6px_rgba(255,16,240,0.45)]"
      : "border border-line bg-white/[0.03] text-paper backdrop-blur-sm hover:border-paper/60 hover:bg-white/[0.07]";

  return (
    <MotionLink
      href={href}
      className={`${base} ${styles}`}
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      initial="rest"
      animate="rest"
      variants={{ rest: { y: 0 }, hover: { y: -1 } }}
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
      {/* the brand glint sweeps across the face on hover — hero strike, echoed */}
      {variant === "primary" && (
        <motion.span
          aria-hidden
          className="absolute inset-y-0 left-0 z-0 w-1/3 -skew-x-12"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,16,240,0.3), transparent)",
          }}
          variants={{ rest: { x: "-150%", opacity: 0 }, hover: { x: "450%", opacity: 1 } }}
          transition={{ duration: 0.65, ease: EASE }}
        />
      )}
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
