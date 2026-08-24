"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { cardHover, cardArrow } from "@/lib/motion";
import { useSpotlight } from "@/lib/useSpotlight";

const MotionLink = motion(Link);

export function WorkCard({
  title,
  summary,
  tag,
  slug,
  result,
  featured = false,
}: {
  title: string;
  summary: string;
  tag: string;
  slug: string;
  result?: string;
  featured?: boolean;
}) {
  const { ref, onPointerMove } = useSpotlight<HTMLAnchorElement>();
  const t = useTranslations("cards");

  const resultBlock = result && (
    <p className="mt-5 border-l border-line pl-4 text-sm text-paper">
      <span className="font-mono text-xs uppercase tracking-wide text-paper">
        {t("result")} -{" "}
      </span>
      {result}
    </p>
  );

  const cta = (
    <span className="inline-flex items-center gap-2 text-sm">
      {t("openCaseStudy")}
      <motion.span aria-hidden variants={cardArrow} className="text-accent-from">
        →
      </motion.span>
    </span>
  );

  // vapor edge ignites down the left on hover
  const edge = (
    <motion.span
      aria-hidden
      variants={{ rest: { scaleY: 0, opacity: 0 }, hover: { scaleY: 1, opacity: 1 } }}
      transition={{ duration: 0.5 }}
      className="pointer-events-none absolute inset-y-0 left-0 w-px origin-top bg-fracture"
    />
  );

  const shared = {
    ref,
    href: `/prace/${slug}`,
    onPointerMove,
    initial: "rest" as const,
    whileHover: "hover" as const,
    animate: "rest" as const,
    variants: cardHover,
  };

  if (featured) {
    return (
      <MotionLink
        {...shared}
        className="btp-focus spotlight group relative flex h-full flex-col justify-center overflow-hidden border border-line p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors duration-300 hover:border-paper/70 md:p-12"
      >
        {edge}
        <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-end">
          <div>
            <span className="label text-paper">{tag}</span>
            <h3 className="mt-4 font-head text-[clamp(2.5rem,4.5vw,3.75rem)] font-bold leading-[0.95] tracking-[-0.02em]">
              {title}
            </h3>
          </div>
          <div>
            <p className="text-lg text-muted">{summary}</p>
            {resultBlock}
            <div className="mt-8">{cta}</div>
          </div>
        </div>
      </MotionLink>
    );
  }

  return (
    <MotionLink
      {...shared}
      className="btp-focus spotlight group relative flex h-full flex-col overflow-hidden border border-line p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors duration-300 hover:border-paper/70"
    >
      {edge}
      <span className="label text-paper">{tag}</span>
      <h3 className="mt-4 font-head text-h2">{title}</h3>
      <p className="mt-3 text-muted">{summary}</p>
      {resultBlock}
      <span className="mt-auto pt-6">{cta}</span>
    </MotionLink>
  );
}
