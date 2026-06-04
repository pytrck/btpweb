"use client";

import { createContext, useContext, useRef, Children, cloneElement, isValidElement } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useMotionTemplate,
  type MotionValue,
} from "framer-motion";

type Ctx = { progress: MotionValue<number>; count: number; reduce: boolean };
const StaggerCtx = createContext<Ctx | null>(null);

/**
 * Scroll-linked stagger. Children share one scroll progress and reveal in
 * sequence by index as the group enters, then ease out in order as it leaves.
 * Bidirectional and tied to scroll position — never a hard replay.
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
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // Anchored higher so staggered items activate in the upper 3/4 of the view.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.2"],
  });

  const items = Children.toArray(children);

  return (
    <StaggerCtx.Provider value={{ progress: scrollYProgress, count: items.length, reduce: !!reduce }}>
      <div ref={ref} className={className}>
        {items.map((c, i) =>
          isValidElement(c) ? cloneElement(c as React.ReactElement, { __index: i }) : c
        )}
      </div>
    </StaggerCtx.Provider>
  );
}

export function StaggerItem({
  children,
  className,
  effect = "fade",
  __index = 0,
}: {
  children: React.ReactNode;
  className?: string;
  effect?: "fade" | "clip" | "scale";
  __index?: number;
}) {
  const ctx = useContext(StaggerCtx);
  const fallback = useMotionValue(0);
  const source = ctx?.progress ?? fallback;
  const reduce = ctx?.reduce ?? false;
  const n = ctx?.count ?? 1;

  // per-item staggered window inside the group's scroll pass
  const step = Math.min(0.06, 0.2 / Math.max(n, 1));
  const s = 0.05 + __index * step;
  const e = s + 0.14;
  const out = 0.9;

  const y = useTransform(source, [s, e, out, 1], [reduce ? 0 : 26, 0, 0, reduce ? 0 : -16]);
  const opacity = useTransform(source, [s, e, out, 1], [0, 1, 1, reduce ? 1 : 0.45]);
  const scale = useTransform(source, [s, e], [effect === "scale" && !reduce ? 0.94 : 1, 1]);
  const clip = useTransform(source, [s, e], [effect === "clip" && !reduce ? 100 : 0, 0]);
  const clipPath = useMotionTemplate`inset(0 0 ${clip}% 0)`;

  return (
    <motion.div
      className={className}
      style={{
        y,
        opacity,
        scale,
        clipPath: effect === "clip" ? clipPath : undefined,
      }}
    >
      {children}
    </motion.div>
  );
}
