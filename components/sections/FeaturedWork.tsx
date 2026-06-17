import { useTranslations } from "next-intl";
import { projects } from "@/content/work";
import { WorkCard } from "@/components/cards/WorkCard";
import { SectionHeader } from "./SectionHeader";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

export function FeaturedWork() {
  const t = useTranslations("work");
  return (
    <section className="container-x py-section">
      <SectionHeader kicker={t("kicker")} title={t("title")} cta={t("cta")} ctaHref="/prace" />
      {/* Three projects compose as one balanced, equal-height row on desktop
          (1-up on mobile/tablet) - so the section fills its width and never
          leaves the empty bottom-right quadrant the old 2-col offset created. */}
      <Stagger className="grid items-stretch gap-6 lg:grid-cols-3" stagger={0.1}>
        {projects.map((p) => (
          <StaggerItem key={p.slug} effect="clip" className="h-full">
            <WorkCard
              title={p.title}
              summary={p.summary}
              tag={p.tag}
              slug={p.slug}
              result={p.result}
            />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
