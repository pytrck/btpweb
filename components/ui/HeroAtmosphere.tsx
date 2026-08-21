"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

/**
 * Ambient hero backdrop: two vapor glows that drift slowly on their own, lean
 * toward the cursor, and parallax out of frame as you scroll past the hero.
 * Plus a faint perspective grid that recedes. Pointer-events-none, aria-hidden,
 * transform/opacity only. Reduced-motion → a single static glow.
 */
export function HeroAtmosphere() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const driftY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);

  // cursor lean - spring-smoothed normalized offset (-1..1)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const glowAX = useTransform(sx, [-1, 1], [-40, 40]);
  const glowAY = useTransform(sy, [-1, 1], [-30, 30]);
  const glowBX = useTransform(sx, [-1, 1], [30, -30]);
  const glowBY = useTransform(sy, [-1, 1], [24, -24]);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
      my.set(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce, mx, my]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* perspective grid floor */}
      <motion.div
        style={{ y: gridY, opacity: fade }}
        className="absolute inset-x-0 bottom-0 h-[60%] opacity-40 [mask-image:linear-gradient(to_top,#000,transparent)]"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.06) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
            transform: "perspective(600px) rotateX(60deg)",
            transformOrigin: "bottom",
          }}
        />
      </motion.div>

      <motion.div style={{ y: driftY, opacity: fade }} className="absolute inset-0">
        {/* glow A - magenta vapor, upper-left */}
        <motion.div
          style={{ x: glowAX, y: glowAY }}
          className="absolute left-[8%] top-[12%] h-[44vh] w-[44vh] rounded-full bg-[radial-gradient(circle,rgba(143,2,248,0.22),transparent_62%)] blur-2xl animate-[float-a_14s_ease-in-out_infinite]"
        />
        {/* glow B - deep violet, lower-right */}
        <motion.div
          style={{ x: glowBX, y: glowBY }}
          className="absolute right-[6%] top-[40%] h-[52vh] w-[52vh] rounded-full bg-[radial-gradient(circle,rgba(143,2,248,0.20),transparent_64%)] blur-2xl animate-[float-b_18s_ease-in-out_infinite]"
        />
      </motion.div>
    </div>
  );
}
