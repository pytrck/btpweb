"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame,
  useReducedMotion,
} from "framer-motion";

const BASE_SPEED = 45; // px/s — constant drift
const MAX_BOOST = 320; // px/s — extra speed added by fast scrolling

/**
 * Scroll-reactive marquee. One "set" of the words is measured, then repeated
 * enough times to always overflow the container (≥ 2× width) so the loop never
 * shows empty space. It animates in pixels by exactly one set width and wraps,
 * so the seam is invisible. Scroll speed adds to the drift. Reduced-motion →
 * static.
 */
export function KineticStrip() {
  const t = useTranslations();
  const items = t.raw("strip") as string[];
  const reduce = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(3);
  const [setW, setSetW] = useState(0);

  useEffect(() => {
    const measure = () => {
      const cw = containerRef.current?.clientWidth ?? 0;
      const sw = setRef.current?.offsetWidth ?? 0;
      if (sw > 0) {
        setSetW(sw);
        // enough sets so the row is ≥ 2× the container (never runs dry)
        setCopies(Math.max(3, Math.ceil((cw * 2) / sw) + 1));
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items.length]);

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 300 });
  const boost = useTransform(smoothVelocity, [-2000, 0, 2000], [-MAX_BOOST, 0, MAX_BOOST], {
    clamp: true,
  });

  // wrap into [-setW, 0] so the row loops seamlessly (px-based)
  const xPx = useTransform(baseX, (v) => (setW > 0 ? wrap(-setW, 0, v) : 0));
  const x = useMotionTemplate`${xPx}px`;

  useAnimationFrame((_, delta) => {
    if (reduce || setW <= 0) return;
    const dt = Math.min(delta, 50) / 1000;
    baseX.set(baseX.get() - (BASE_SPEED + boost.get()) * dt);
  });

  return (
    <div
      ref={containerRef}
      className="overflow-hidden border-y border-line py-4 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
    >
      <motion.div
        style={reduce ? undefined : { x }}
        className="flex w-max whitespace-nowrap will-change-transform"
      >
        {Array.from({ length: copies }).map((_, c) => (
          <div key={c} ref={c === 0 ? setRef : undefined} className="flex shrink-0">
            {items.map((item, i) => (
              <span
                key={i}
                className="pr-8 font-head text-sm tracking-widest text-muted transition-colors duration-300 hover:text-paper"
              >
                {item}{" "}
                <span className="text-accent-from [text-shadow:0_0_8px_rgba(255,16,240,0.85)]">
                  /
                </span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/** wrap v into [min, max) — for seamless marquee looping */
function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}
