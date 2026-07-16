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

// Enough copies that a single set stays wider than any viewport, so the loop
// never scrolls past the last item (the "long pause" gap). The animation shifts
// exactly one set (100/COPIES %), so the loop point is seamless and the speed is
// unchanged regardless of COPIES.
const COPIES = 6;

export function KineticStrip() {
  const t = useTranslations();
  const items = t.raw("strip") as string[];
  const row = Array.from({ length: COPIES }, () => items).flat();

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
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-${(100 / COPIES).toFixed(4)}%)}}`}</style>
    </div>
  );
}

/** wrap v into [min, max) — for seamless marquee looping */
function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}
