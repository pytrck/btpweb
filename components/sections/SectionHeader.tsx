import { LinkArrow } from "@/components/ui/LinkArrow";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";

export function SectionHeader({
  kicker,
  title,
  cta,
  ctaHref,
}: {
  kicker?: string;
  title: string;
  cta?: string;
  ctaHref?: string;
}) {
  return (
    <ScrollReveal className="mb-12 flex items-end justify-between gap-6">
      <div>
        {kicker && <p className="label mb-4 text-paper">{kicker}</p>}
        <AnimatedHeading text={title} className="font-head text-h2 font-bold" />
      </div>
      {cta && ctaHref && (
        <div className="hidden md:block">
          <LinkArrow href={ctaHref}>{cta}</LinkArrow>
        </div>
      )}
    </ScrollReveal>
  );
}
