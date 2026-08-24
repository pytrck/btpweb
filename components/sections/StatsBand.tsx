"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useReducedMotion } from "framer-motion";
import { useReveal } from "@/lib/useReveal";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

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

/**
 * Asymmetric editorial band: the first figure is the headline (oversized), the
 * rest sit in a hairline-ruled list beside it - deliberately NOT four identical
 * cells, so it reads as a composed stat block rather than a grid.
 */
export function StatsBand() {
  const t = useTranslations("stats");
  const items = t.raw("items") as Stat[];
  const [lead, ...rest] = items;

  return (
    <section className="border-y border-line bg-ink/60">
      <ScrollReveal className="container-x grid gap-y-10 py-16 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-x-16 md:py-20">
        <div>
          <p className="font-head text-[clamp(3.5rem,9vw,6.5rem)] font-bold leading-[0.9]">
            <CountValue value={lead.v} />
          </p>
          <p className="mt-3 max-w-xs text-muted">{lead.l}</p>
        </div>
        <dl className="divide-y divide-line">
          {rest.map((s) => (
            <div key={s.l} className="flex items-baseline justify-between gap-6 py-5">
              <dt className="font-head text-h2 font-bold">
                <CountValue value={s.v} />
              </dt>
              <dd className="max-w-[16ch] text-right text-sm text-muted">{s.l}</dd>
            </div>
          ))}
        </dl>
      </ScrollReveal>
    </section>
  );
}
