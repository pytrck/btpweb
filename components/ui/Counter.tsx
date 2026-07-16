"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/**
 * Counts a numeric stat up from zero the first time it scrolls into view.
 * Splits the raw value (e.g. "150+", "98 %", "5x") into a leading number plus
 * any prefix/suffix, animates only the number, and preserves the rest verbatim.
 * Non-numeric values render unchanged.
 */
export function Counter({ value }: { value: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  const match = value.match(/^(\D*)([\d.,]+)(.*)$/);
  const prefix = match ? match[1] : "";
  const numStr = match ? match[2] : "";
  const suffix = match ? match[3] : "";
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  const target = match ? parseFloat(numStr.replace(/,/g, "")) : NaN;

  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 70, damping: 22, restDelta: 0.01 });

  useEffect(() => {
    if (inView && !reduce && Number.isFinite(target)) mv.set(target);
  }, [inView, reduce, target, mv]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (numRef.current) numRef.current.textContent = format(v, decimals);
    });
  }, [spring, decimals]);

  if (!match || !Number.isFinite(target)) return <span>{value}</span>;

  return (
    <span ref={ref}>
      {prefix}
      <span ref={numRef}>{reduce ? format(target, decimals) : "0"}</span>
      {suffix}
    </span>
  );
}

function format(v: number, decimals: number) {
  return v.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
