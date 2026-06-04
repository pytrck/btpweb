import { useTranslations } from "next-intl";
import { services } from "@/content/services";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { SectionHeader } from "./SectionHeader";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

export function ServicesPreview() {
  const t = useTranslations("servicesPreview");
  return (
    <section className="container-x py-section">
      <SectionHeader kicker={t("kicker")} title={t("title")} cta={t("cta")} ctaHref="/sluzby" />
      <Stagger className="grid gap-px md:grid-cols-3">
        {services.slice(0, 3).map((s) => (
          <StaggerItem key={s.slug} className="bg-ink">
            <ServiceCard
              title={s.title}
              description={s.description}
              slug={s.slug}
              proof={s.proof[0]}
            />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
