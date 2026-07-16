"use client";

import { useTranslations } from "next-intl";

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
    <div className="group overflow-hidden border-y border-line py-4 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div className="flex w-max whitespace-nowrap will-change-transform animate-[marquee_28s_linear_infinite] group-hover:[animation-play-state:paused]">
        {row.map((item, i) => (
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
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-${(100 / COPIES).toFixed(4)}%)}}`}</style>
    </div>
  );
}
