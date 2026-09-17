"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { EASE } from "@/lib/motion";

type Item = { q: string; a: string };

export function Faq() {
  const t = useTranslations("homeFaq");
  const items = t.raw("items") as Item[];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="container-x py-section">
      {/* FAQPage schema - the same Q&A the section already renders, so Google can
          show these as expandable results. Built from the translations, so cs and
          en each emit their own. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((it) => ({
              "@type": "Question",
              name: it.q,
              acceptedAnswer: { "@type": "Answer", text: it.a },
            })),
          }).replace(/</g, "\\u003c"),
        }}
      />
      <SectionHeader title={t("title")} />
      <Stagger className="border-t border-line" stagger={0.06}>
        {items.map((it, i) => (
          <StaggerItem key={i} className="border-b border-line">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              data-umami-event={open === i ? undefined : "faq-open"}
              data-umami-event-q={it.q}
              className="btp-focus flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="font-head text-h3">{it.q}</span>
              <motion.span
                animate={{ rotate: open === i ? 45 : 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="shrink-0 text-2xl leading-none text-accent-from"
                aria-hidden
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 text-muted">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
