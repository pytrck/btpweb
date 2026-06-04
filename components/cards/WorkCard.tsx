"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { cardHover, cardEdge, cardArrow } from "@/lib/motion";

const MotionLink = motion(Link);

export function WorkCard({
  title,
  summary,
  tag,
  slug,
  result,
}: {
  title: string;
  summary: string;
  tag: string;
  slug: string;
  result?: string;
}) {
  return (
    <MotionLink
      href={`/prace/${slug}`}
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardHover}
      className="btp-focus group relative block overflow-hidden border border-line p-8 transition-colors duration-300 hover:border-paper"
    >
      {/* vapor edge ignites down the left on hover */}
      <motion.span
        aria-hidden
        variants={{ rest: { scaleY: 0, opacity: 0 }, hover: { scaleY: 1, opacity: 1 } }}
        transition={{ duration: 0.5 }}
        className="pointer-events-none absolute inset-y-0 left-0 w-px origin-top bg-fracture"
      />
      <span className="label text-accent-from">{tag}</span>
      <h3 className="mt-4 font-head text-h2">{title}</h3>
      <p className="mt-3 text-muted">{summary}</p>
      {result && (
        <p className="mt-5 border-l border-line pl-4 text-sm text-paper">
          <span className="font-mono text-xs uppercase tracking-wide text-accent-from">
            Výsledek —{" "}
          </span>
          {result}
        </p>
      )}
      <span className="mt-6 inline-flex items-center gap-2 text-sm">
        Otevřít case study
        <motion.span aria-hidden variants={cardArrow} className="text-accent-from">
          →
        </motion.span>
      </span>
    </MotionLink>
  );
}
