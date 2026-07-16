"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Bulletproof "is in view" trigger for reveals.
 *
 * Returns a ref + a `shown` boolean that flips true once the element scrolls
 * into view, then STAYS true. Unlike framer's bare `whileInView` - whose hidden
 * state is lost forever if its IntersectionObserver never fires (the Práce
 * "technically there but invisible" regression) - this can never strand content:
 *
 *  - reveals immediately if the element is already on screen at mount,
 *  - uses IntersectionObserver when available (efficient, real browsers),
 *  - AND polls position briefly as a fallback, so it works even where IO or
 *    scroll events don't fire. The poll stops the moment the element reveals.
 *
 * Reveal-once by design: content never re-hides, so it can't blink back to
 * invisible. Pair with a time-based tween in the consumer for device-consistent
 * pacing.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(amount = 0.15) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      setShown(true);
      return;
    }

    let done = false;
    let io: IntersectionObserver | null = null;
    let timer: number | undefined;

    const cleanup = () => {
      io?.disconnect();
      if (timer) window.clearInterval(timer);
    };

    const reveal = () => {
      if (done) return;
      done = true;
      setShown(true);
      cleanup();
    };

    const inView = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight * (1 - amount) && r.bottom > 0;
    };

    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && reveal()),
        { threshold: amount }
      );
      io.observe(el);
    }

    // Immediate + polled position check — needs neither IO nor scroll events,
    // so content is guaranteed to appear once it's actually on screen.
    if (inView()) reveal();
    else timer = window.setInterval(() => inView() && reveal(), 250);

    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, shown };
}
