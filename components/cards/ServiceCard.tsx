"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { cardHover, cardEdge } from "@/lib/motion";
import { useSpotlight } from "@/lib/useSpotlight";

export function ServiceCard({
  title,
  description,
  slug,
  proof,
  headline,
  featured = false,
}: {
  title: string;
  description: string;
  slug: string;
  proof?: string;
  headline?: string;
  featured?: boolean;
}) {
  const { ref, onPointerMove } = useSpotlight<HTMLDivElement>();
  const t = useTranslations("cards");
  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardHover}
      className={`spotlight group relative flex h-full flex-col justify-between border border-line shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors duration-300 hover:border-paper/70 ${
        featured ? "p-10 md:p-12" : "p-8"
      }`}
    >
      {/* vapor edge ignites along the top on hover */}
      <motion.span
        aria-hidden
        variants={cardEdge}
        className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left bg-fracture"
      />
      <div>
        <h3 className={`font-head ${featured ? "text-h2" : "text-h3"}`}>{title}</h3>
        {featured && headline ? (
          <p className="mt-4 max-w-md text-lg text-paper/80">{headline}</p>
        ) : (
          <p className="mt-3 text-muted">{description}</p>
        )}
      </div>
      <div className={featured ? "mt-12" : "mt-8"}>
        {proof && (
          <p className="mb-4 flex items-center gap-2 font-mono text-xs text-muted">
            <span aria-hidden className="text-accent-from">-</span>
            {proof}
          </p>
        )}
        <LinkArrow href={`/sluzby/${slug}`}>{t("learnMore")}</LinkArrow>
      </div>
    </motion.div>
  );
}
