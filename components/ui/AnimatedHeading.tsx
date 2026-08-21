"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { useReveal } from "@/lib/useReveal";

/**
 * Headline whose words slide up in sequence when scrolled into view.
 *
 * Always renders the motion path (no reduced-motion branch) so the server and
 * client produce the same markup - avoids the hydration mismatch that stranded
 * words at their initial style. Words stay at full opacity throughout; the
 * entrance is purely positional (translateY), which is mild enough not to be a
 * vestibular trigger.
 *
 * No `overflow-hidden` - `text-h2` runs a 1.05 line-height, tighter than Czech
 * diacritics (ď, ř, í, ž) need, so a clip box would shave glyph tops.
 */
export function AnimatedHeading({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLHeadingElement>(0.3);

  const words = text.split(" ");
  return (
    <h2 ref={ref} className={className}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <motion.span
            className="inline-block"
            initial={{ y: "0.4em" }}
            animate={shown ? { y: "0em" } : { y: "0.4em" }}
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
