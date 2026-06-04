"use client";

import { motion } from "framer-motion";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { cardHover, cardEdge } from "@/lib/motion";

export function ServiceCard({
  title,
  description,
  slug,
  proof,
}: {
  title: string;
  description: string;
  slug: string;
  proof?: string;
}) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardHover}
      className="group relative flex h-full flex-col justify-between overflow-hidden border border-line p-8 transition-colors duration-300 hover:border-paper"
    >
      {/* vapor edge ignites along the top on hover */}
      <motion.span
        aria-hidden
        variants={cardEdge}
        className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left bg-fracture"
      />
      <div>
        <h3 className="font-head text-h3">{title}</h3>
        <p className="mt-3 text-muted">{description}</p>
      </div>
      <div className="mt-8">
        {proof && (
          <p className="mb-4 flex items-center gap-2 font-mono text-xs text-muted">
            <span className="text-accent-from">-</span>
            {proof}
          </p>
        )}
        <LinkArrow href={`/sluzby/${slug}`}>Zjistit více</LinkArrow>
      </div>
    </motion.div>
  );
}
