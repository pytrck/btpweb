import { useTranslations } from "next-intl";
import { projects } from "@/content/work";
import { WorkCard } from "@/components/cards/WorkCard";
import { SectionHeader } from "./SectionHeader";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { Parallax } from "@/components/ui/Parallax";

export function FeaturedWork() {
  const t = useTranslations("work");
  return (
    <section className="container-x py-section">
      <SectionHeader kicker={t("kicker")} title={t("title")} cta={t("cta")} ctaHref="/prace" />
      <Stagger className="grid gap-6 md:grid-cols-2" stagger={0.14}>
        {projects.map((p, i) => (
          <StaggerItem
            key={p.slug}
            effect="clip"
            className={i % 2 === 1 ? "md:mt-28" : ""}
          >
            <Parallax distance={i % 2 === 0 ? 36 : 68} from={i % 2 === 0 ? "up" : "down"}>
              <WorkCard
                title={p.title}
                summary={p.summary}
                tag={p.tag}
                slug={p.slug}
                result={p.result}
              />
            </Parallax>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
