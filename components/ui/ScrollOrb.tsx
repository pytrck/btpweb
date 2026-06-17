"use client";

import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";

/**
 * A violet orb with a blurred glow that rides a smooth sine trajectory drawn
 * down the full height of the *page* (the path scrolls with the content). The
 * orb rests at a fixed point in the viewport so it's always visible, while the
 * wavy line streams through it and the orb sways left↔right to stay on the path.
 *
 * Signature beat: the path stays smooth (the "pattern"); in the GLITCH zone the
 * orb tears off the line into a jagged stutter, the core splits into chromatic
 * ghosts, and a glitched "BROKE THE PATTERN" tag flickers in. Positioned with
 * GPU translate3d for smoothness. Reduced-motion → hidden.
 */
const CENTER = 50; // horizontal centre of the wave, % of page width
const AMP = 40; // sway amplitude, % → sweeps nearly the full width
const CYCLES = 2.2; // full waves across the whole scroll
const SEGMENTS = 140;
const ANCHOR = 0.52; // orb's resting height in the viewport (0=top, 1=bottom)

// where the orb breaks the pattern (fraction of total scroll) — starts earlier
// and runs longer so the glitch beat is more prominent
const GLITCH_START = 0.3;
const GLITCH_END = 0.62;
const GLITCH_TEXT = "BROKE THE PATTERN";

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}

/** deterministic stutter inside the glitch zone (SSR-safe — no randomness) */
function glitchX(t: number) {
  if (t < GLITCH_START || t > GLITCH_END) return 0;
  const local = (t - GLITCH_START) / (GLITCH_END - GLITCH_START); // 0..1
  return Math.sign(Math.sin(local * Math.PI * 13)) * 16;
}

/** the clean trajectory — smooth sine, no glitch (this is the "pattern") */
function smoothX(t: number) {
  return clamp(CENTER + AMP * Math.sin(t * Math.PI * 2 * CYCLES), 3, 97);
}

/** the orb's own x — rides the smooth path, but tears off it in the glitch zone */
function orbX(t: number) {
  return clamp(smoothX(t) + glitchX(t), 2, 98);
}

export function ScrollOrb() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // bump on mount/resize so the transforms re-initialise once the container has
  // a real size (and after any layout shift), without caching stale dimensions
  const [, force] = useReducer((c: number) => c + 1, 0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setReady(true);
    force();
    const ro = new ResizeObserver(() => force());
    ro.observe(el);
    window.addEventListener("resize", force);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", force);
    };
  }, []);

  const { scrollY } = useScroll();

  // page-fraction of the point currently resting at ANCHOR in the viewport.
  // The container's LIVE size is read each frame so the orb shares the exact
  // coordinate basis as the SVG line (which is sized by `h-full`) — no caching,
  // so the orb can't drift off the path when layout shifts. Raw scroll (no
  // spring) keeps it glued to the static line.
  const frac = (v: number) => {
    const el = ref.current;
    const h = el?.clientHeight ?? 0;
    return h ? clamp((v + ANCHOR * window.innerHeight) / h, 0, 1) : 0;
  };

  const tx = useTransform(scrollY, (v) => (orbX(frac(v)) / 100) * (ref.current?.clientWidth ?? 0));
  const ty = useTransform(scrollY, (v) => frac(v) * (ref.current?.clientHeight ?? 0));
  const transform = useMotionTemplate`translate3d(${tx}px, ${ty}px, 0)`;
  const glitchOpacity = useTransform(scrollY, (v) => {
    const f = frac(v);
    return f > GLITCH_START && f < GLITCH_END ? 1 : 0;
  });

  // full trajectory as an SVG polyline in a 0..100 × 0..100 space
  const points = useMemo(() => {
    const pts: string[] = [];
    for (let i = 0; i <= SEGMENTS; i++) {
      const t = i / SEGMENTS;
      pts.push(`${smoothX(t).toFixed(2)},${(t * 100).toFixed(2)}`);
    }
    return pts.join(" ");
  }, []);

  if (reduce) return null;

  // behind-content layer: trajectory + orb + tag (text reads on top of it)
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
            <stop offset="0%" stopColor="#ff10f0" stopOpacity="0.04" />
            <stop offset="50%" stopColor="#b30caa" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7c0caa" stopOpacity="0.04" />
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
          {/* soft outer glow */}
          <div className="absolute left-0 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,16,240,0.28),transparent_60%)] blur-2xl" />
          {/* mid halo */}
          <div className="absolute left-0 top-0 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(179,12,170,0.55),transparent_65%)] blur-xl" />

          {/* chromatic ghosts — surge in the glitch zone. Centring lives on the
              wrapper; the jitter animation runs on the inner dot so its
              transform can't clobber the -50%/-50% centring. */}
          <motion.div
            style={{ opacity: glitchOpacity }}
            className="absolute left-0 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="h-full w-full rounded-full bg-cyan-400 mix-blend-screen animate-[orb-glitch-a_2.6s_steps(1)_infinite]" />
          </motion.div>
          <motion.div
            style={{ opacity: glitchOpacity }}
            className="absolute left-0 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="h-full w-full rounded-full bg-red-500 mix-blend-screen animate-[orb-glitch-b_2.6s_steps(1)_infinite]" />
          </motion.div>

          {/* solid core */}
          <div className="absolute left-0 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2">
            <div className="h-full w-full rounded-full bg-accent-from shadow-[0_0_14px_4px_rgba(255,16,240,0.7)] animate-[orb-jitter_3.4s_steps(1)_infinite]" />
          </div>
        </motion.div>
      </motion.div>

      {/* "BROKE THE PATTERN" tag — rides with the orb, behind the page text */}
      <motion.div
        style={{ transform, opacity: glitchOpacity }}
        className="absolute left-0 top-0 will-change-transform"
      >
        <div className="glitch-tag relative -translate-y-10 translate-x-7 whitespace-nowrap font-mono text-xs font-bold uppercase tracking-[0.35em] md:text-sm">
          <span className="relative z-10 text-paper">{GLITCH_TEXT}</span>
          <span
            aria-hidden
            className="absolute inset-0 text-accent-from mix-blend-screen animate-[glitch-tag-a_1.1s_steps(2)_infinite]"
          >
            {GLITCH_TEXT}
          </span>
          <span
            aria-hidden
            className="absolute inset-0 text-cyan-400 mix-blend-screen animate-[glitch-tag-b_0.85s_steps(2)_infinite]"
          >
            {GLITCH_TEXT}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
