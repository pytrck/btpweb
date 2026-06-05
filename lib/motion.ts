import type { Variants, Transition } from "framer-motion";

/* ---- shared timing language ---- */
export const EASE = [0.22, 1, 0.36, 1] as const; // sharp, premium ease-out
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const DUR = {
  fast: 0.25,
  base: 0.5,
  slow: 0.7,
  seam: 0.9,
} as const;

// In-view reveals are triggered by the bulletproof `useReveal` hook
// (lib/useReveal.ts), not framer's `whileInView` - so there's no shared
// viewport config here anymore.

/* ---- single-element reveals ---- */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.slow, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: DUR.base, ease: EASE } },
};

/* clip reveal - cinematic, used for featured/editorial blocks */
export const clipUp: Variants = {
  hidden: { opacity: 0, y: 28, clipPath: "inset(0 0 100% 0)" },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: DUR.slow, ease: EASE },
  },
};

/* line mask - headline wipes up from its own baseline (cinematic entrance) */
export const lineMask: Variants = {
  hidden: { opacity: 0, y: 20, clipPath: "inset(0 0 100% 0)" },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.85, ease: EASE },
  },
};

/* ---- stagger orchestration ---- */
export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

/* ---- hero layered entrance ---- */
export const heroContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE } },
};

/* ---- signature: seam draw + fracture notch ---- */
export const seamDraw: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: { scaleX: 1, opacity: 0.85, transition: { duration: DUR.seam, ease: EASE } },
};

export const fractureNotch: Variants = {
  hidden: { scale: 0, opacity: 0, rotate: 45 },
  show: {
    scale: 1,
    opacity: 1,
    rotate: 45,
    transition: { delay: 0.5, duration: DUR.fast, ease: "easeOut" },
  },
};

/* ---- card hover orchestration (rest/hover propagated to children) ---- */
export const cardHover: Variants = {
  rest: { y: 0 },
  hover: { y: -4, transition: { duration: DUR.fast, ease: EASE } },
};

export const cardEdge: Variants = {
  rest: { scaleX: 0, opacity: 0 },
  hover: { scaleX: 1, opacity: 1, transition: { duration: DUR.base, ease: EASE } },
};

export const cardArrow: Variants = {
  rest: { x: 0 },
  hover: { x: 5, transition: { duration: DUR.fast, ease: EASE } },
};

export const pressable = {
  whileTap: { scale: 0.97 },
  transition: { duration: 0.15, ease: EASE } as Transition,
};
