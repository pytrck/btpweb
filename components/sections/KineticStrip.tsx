"use client";

import { useTranslations } from "next-intl";

export function KineticStrip() {
  const t = useTranslations();
  const items = t.raw("strip") as string[];
  const row = [...items, ...items, ...items];

  return (
    <div className="group overflow-hidden border-y border-line py-4 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div className="flex w-max gap-8 whitespace-nowrap will-change-transform animate-[marquee_28s_linear_infinite] group-hover:[animation-play-state:paused]">
        {row.map((item, i) => (
          <span
            key={i}
            className="font-head text-sm tracking-widest text-muted transition-colors duration-300 hover:text-paper"
          >
            {item} <span className="text-accent-from">/</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-33.333%)}}`}</style>
    </div>
  );
}
