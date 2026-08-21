"use client";

import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

/**
 * A violet orb with a blurred glow that rides a smooth sine trajectory drawn
 * down the full height of the *page* (the path scrolls with the content). The
 * orb rests at a fixed point in the viewport so it's always visible, while the
 * wavy line streams through it and the orb sways left↔right to stay on the path.
 *
 * Signature beat: the path stays smooth (the "pattern"); in the GLITCH zone the
 * orb tears off the line into a jagged stutter, the core splits into chromatic
 * ghosts, and a glitched tag flickers in. The glitch loops are CSS animations
 * kept alive even under reduced motion (see globals.css) — a deliberate brand
 * choice. Position is GPU translate3d, scroll-linked.
 *
 * Every page gets its own orb by varying `text` / `amp` / `cycles` / `jag`, so
 * the trajectory and the glitch differ as you move around the site.
 */
const CENTER = 50; // horizontal centre of the wave, % of page width
const SEGMENTS = 140;

type ScrollOrbProps = {
  /** the glitch tag text that flickers in inside the glitch zone */
  text?: string;
  /** sway amplitude, % of page width */
  amp?: number;
  /** number of full waves across the whole scroll */
  cycles?: number;
  /** orb's resting height in the viewport (0=top, 1=bottom) */
  anchor?: number;
  /** glitch zone as [start, end] fraction of total scroll */
  glitchStart?: number;
  glitchEnd?: number;
  /** stutter frequency inside the glitch zone — higher = choppier */
  jag?: number;
};

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}

export function ScrollOrb({
  text = "BROKE THE PATTERN",
  amp = 40,
  cycles = 2.2,
  anchor = 0.52,
  glitchStart = 0.3,
  glitchEnd = 0.62,
  jag = 13,
}: ScrollOrbProps = {}) {
  const ref = useRef<HTMLDivElement>(null);
  // Cache the container's size instead of reading clientWidth/Height every scroll
  // frame (which forces a synchronous layout and janks the scroll). Refreshed on
  // mount, resize, and any layout shift via ResizeObserver — so it stays exact.
  const dims = useRef({ w: 0, h: 0 });
  const [, force] = useReducer((c: number) => c + 1, 0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      dims.current = { w: el.clientWidth, h: el.clientHeight };
    };
    measure();
    setReady(true);
    force();
    const onResize = () => {
      measure();
      force();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(el);
    window.addEventListener("resize", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const { scrollY } = useScroll();

  // clean trajectory — smooth sine (this is the "pattern")
  const smoothX = (t: number) => clamp(CENTER + amp * Math.sin(t * Math.PI * 2 * cycles), 3, 97);
  // deterministic stutter inside the glitch zone (SSR-safe — no randomness)
  const glitchX = (t: number) => {
    if (t < glitchStart || t > glitchEnd) return 0;
    const local = (t - glitchStart) / (glitchEnd - glitchStart);
    return Math.sign(Math.sin(local * Math.PI * jag)) * 16;
  };
  // the orb rides the smooth path but tears off it in the glitch zone
  const orbX = (t: number) => clamp(smoothX(t) + glitchX(t), 2, 98);

  // page-fraction of the point currently resting at `anchor` in the viewport.
  const frac = (v: number) => {
    const h = dims.current.h;
    return h ? clamp((v + anchor * window.innerHeight) / h, 0, 1) : 0;
  };

  const tx = useTransform(scrollY, (v) => (orbX(frac(v)) / 100) * dims.current.w);
  const ty = useTransform(scrollY, (v) => frac(v) * dims.current.h);
  const transform = useMotionTemplate`translate3d(${tx}px, ${ty}px, 0)`;
  const glitchOpacity = useTransform(scrollY, (v) => {
    const f = frac(v);
    return f > glitchStart && f < glitchEnd ? 1 : 0;
  });

  // full trajectory as an SVG polyline in a 0..100 × 0..100 space
  const points = useMemo(() => {
    const pts: string[] = [];
    for (let i = 0; i <= SEGMENTS; i++) {
      const t = i / SEGMENTS;
      pts.push(`${smoothX(t).toFixed(2)},${(t * 100).toFixed(2)}`);
    }
    return pts.join(" ");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amp, cycles]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* trajectory path — smooth, scrolls with the page; fades in on load */}
      <motion.svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.5, ease: "easeOut" }}
      >
        <defs>
          <linearGradient id="orb-trail" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8f02f8" stopOpacity="0.04" />
            <stop offset="50%" stopColor="#8f02f8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8f02f8" stopOpacity="0.04" />
          </linearGradient>
        </defs>
        <polyline
          points={points}
          fill="none"
          stroke="url(#orb-trail)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </motion.svg>

      {/* the orb — outer holds the scroll-driven position */}
      <motion.div
        style={{ transform, opacity: ready ? 1 : 0 }}
        className="absolute left-0 top-0 will-change-transform"
      >
        {/* inner plays the entrance: drops in from above, overshoots, settles */}
        <motion.div
          initial={{ opacity: 0, scale: 0.1, y: -200 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 55, damping: 11, mass: 0.9, delay: 0.45 }}
        >
          {/* all centred on the orb's ORIGIN (0,0), not the parent's width */}
          {/* soft outer glow — restrained so it reads as light, not a muddy blob */}
          <div className="absolute left-0 top-0 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(143,2,248,0.17),transparent_62%)] blur-2xl" />
          {/* mid halo */}
          <div className="absolute left-0 top-0 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(143,2,248,0.42),transparent_66%)] blur-xl" />

          {/* chromatic ghosts — surge in the glitch zone. Centring lives on the
              wrapper; the jitter runs on the inner dot so its transform can't
              clobber the -50%/-50% centring. */}
          <motion.div
            style={{ opacity: glitchOpacity }}
            className="absolute left-0 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="orb-ghost-a h-full w-full rounded-full bg-cyan-400 mix-blend-screen" />
          </motion.div>
          <motion.div
            style={{ opacity: glitchOpacity }}
            className="absolute left-0 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="orb-ghost-b h-full w-full rounded-full bg-red-500 mix-blend-screen" />
          </motion.div>

          {/* solid core */}
          <div className="absolute left-0 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2">
            <div className="orb-core h-full w-full rounded-full bg-accent-from shadow-[0_0_14px_4px_rgba(143,2,248,0.7)]" />
          </div>
        </motion.div>
      </motion.div>

      {/* glitch tag — rides with the orb, behind the page text */}
      <motion.div
        style={{ transform, opacity: glitchOpacity }}
        className="absolute left-0 top-0 will-change-transform"
      >
        <div className="glitch-tag relative -translate-y-10 translate-x-7 whitespace-nowrap font-mono text-xs font-bold uppercase tracking-[0.35em] md:text-sm">
          <span className="relative z-10 text-paper">{text}</span>
          <span aria-hidden className="orb-tag-a absolute inset-0 text-accent-from mix-blend-screen">
            {text}
          </span>
          <span aria-hidden className="orb-tag-b absolute inset-0 text-cyan-400 mix-blend-screen">
            {text}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
