import { useTranslations, useLocale } from "next-intl";
import { getServices } from "@/content/services";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { SectionHeader } from "./SectionHeader";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

export function ServicesPreview() {
  const t = useTranslations("servicesPreview");
  const [first, ...rest] = getServices(useLocale()).slice(0, 3);

  return (
    <section className="container-x py-section">
      <SectionHeader title={t("title")} cta={t("cta")} ctaHref="/sluzby" />
      {/* Asymmetric: the lead service takes a 2x2 block, the next two stack
          beside it - a composed layout instead of three identical cards. */}
      <Stagger className="grid gap-6 md:grid-cols-3 md:grid-rows-2" stagger={0.1}>
        <StaggerItem effect="clip" className="md:col-span-2 md:row-span-2">
          <ServiceCard
            featured
            title={first.title}
            description={first.description}
            headline={first.headline}
            slug={first.slug}
            proof={first.proof[0]}
          />
        </StaggerItem>
        {rest.map((s) => (
          <StaggerItem key={s.slug}>
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
