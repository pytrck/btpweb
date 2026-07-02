"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useReducedMotion } from "framer-motion";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { useReveal } from "@/lib/useReveal";

type Stat = { v: string; l: string };

/**
 * Values like "48 h" / "90+" / "0" count up from zero when they scroll into
 * view (ease-out-expo, ~1.4s), then rest at the real figure. Non-numeric
 * values and reduced motion render the final value straight away.
 */
function CountValue({ value }: { value: string }) {
  const reduce = useReducedMotion();
  const m = value.match(/^(\d+)(.*)$/);
  const target = m ? parseInt(m[1], 10) : null;
  const suffix = m ? m[2] : "";
  const { ref, shown } = useReveal<HTMLSpanElement>();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (target === null || !shown) return;
    if (reduce || target === 0) {
      setN(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const dur = 1400;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = p >= 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setN(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, target, reduce]);

  if (target === null) return <>{value}</>;
  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

export function StatsBand() {
  const t = useTranslations("stats");
  const items = t.raw("items") as Stat[];
  return (
    <section className="border-y border-line">
      <Stagger
        className="container-x hairgrid sm:grid-cols-2 md:grid-cols-4"
        stagger={0.1}
      >
        {items.map((s, i) => (
          <StaggerItem key={i} effect="scale" className="bg-ink px-6 py-12">
            <p className="font-head text-h2 font-bold">
              <CountValue value={s.v} />
            </p>
            <p className="mt-2 text-sm text-muted">{s.l}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
