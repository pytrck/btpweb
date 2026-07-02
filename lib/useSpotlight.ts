"use client";

import { useCallback, useRef, type PointerEvent } from "react";

/**
 * Feeds the pointer position into --mx/--my CSS vars on the element, consumed
 * by the `.spotlight` glass-sheen overlay (globals.css). Cheap: two style
 * writes per move, no re-renders.
 */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const onPointerMove = useCallback((e: PointerEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);

  return { ref, onPointerMove };
}
