import { LinkArrow } from "@/components/ui/LinkArrow";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function SectionHeader({
  kicker,
  title,
  cta,
  ctaHref,
}: {
  kicker: string;
  title: string;
  cta?: string;
  ctaHref?: string;
}) {
  return (
    <ScrollReveal className="mb-12 flex items-end justify-between">
      <div>
        <p className="label text-accent-from">{kicker}</p>
        <h2 className="mt-4 font-head text-h2 font-bold">{title}</h2>
      </div>
      {cta && ctaHref && (
        <div className="hidden md:block">
          <LinkArrow href={ctaHref}>{cta}</LinkArrow>
        </div>
      )}
    </ScrollReveal>
  );
}
