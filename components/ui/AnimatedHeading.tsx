"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { useReveal } from "@/lib/useReveal";

/**
 * Headline whose words rise and brighten in sequence when it scrolls into view.
 *
 * The reveal is driven by `useReveal` (IO + polling fallback + immediate mount
 * check) rather than a scroll-scrubbed progress value, so a heading that sits
 * where the page can't scroll it fully into view can never get stranded
 * half-revealed. There's no `overflow-hidden` clip either — `text-h2` runs a
 * 1.05 line-height, tighter than Czech diacritics (ď, ř, í, ž) need, so a clip
 * box would shave the tops of the glyphs. Words just translate + fade, so every
 * letter always renders in full. Real text (one node per word) → selectable and
 * accessible; reduced motion renders it plain.
 */
export function AnimatedHeading({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const { ref, shown } = useReveal<HTMLHeadingElement>(0.3);

  if (reduce) {
    return (
      <h2 ref={ref} className={className}>
        {text}
      </h2>
    );
  }

  const words = text.split(" ");
  return (
    <h2 ref={ref} className={className}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <motion.span
            className="inline-block"
            initial={{ y: "0.4em", opacity: 0.1 }}
            animate={shown ? { y: "0em", opacity: 1 } : { y: "0.4em", opacity: 0.1 }}
            transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </h2>
  );
}
