import { useTranslations } from "next-intl";
import { projects } from "@/content/work";
import { WorkCard } from "@/components/cards/WorkCard";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

/**
 * The credibility peak. Deliberately heavier than a body section: a larger
 * headline and an ambient vapor glow set it apart as the moment the page's
 * claims get evidence. Three projects compose as one equal-height row.
 */
export function FeaturedWork() {
  const t = useTranslations("work");
  return (
    <section className="relative overflow-hidden py-[clamp(5rem,12vw,12rem)]">
      {/* ambient proof-spotlight - one glow, radial, behind the row */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[60%] w-[80%] -translate-x-1/2 rounded-full"
        style={{
          background: "radial-gradient(closest-side, rgba(143,2,248,0.06), transparent 72%)",
        }}
      />
      <div className="container-x relative">
        <ScrollReveal className="mb-14 flex items-end justify-between gap-6">
          <div>
            <p className="label text-accent-from">{t("kicker")}</p>
            <h2 className="mt-4 font-head text-[clamp(2.5rem,5.5vw,4.25rem)] font-bold leading-[0.95] tracking-[-0.02em]">
              {t("title")}
            </h2>
          </div>
          <div className="hidden md:block">
            <LinkArrow href="/prace">{t("cta")}</LinkArrow>
          </div>
        </ScrollReveal>
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
      </div>
    </section>
  );
}
