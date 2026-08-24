import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getServices } from "@/content/services";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { PageHeader } from "@/components/sections/PageHeader";
import { CTABlock } from "@/components/sections/CTABlock";
import { ScrollOrb } from "@/components/ui/ScrollOrb";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { buildMeta } from "@/lib/meta";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "pages.services" });
  return buildMeta({ title: t("title"), description: t("subtitle"), path: "/sluzby", locale: params.locale });
}

export default async function ServicesPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations("pages.services");
  const [first, ...rest] = getServices(params.locale);

  return (
    <div className="relative">
      <ScrollOrb text="NO TEMPLATES" amp={34} cycles={1.7} jag={9} />
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <section className="container-x pb-section">
        {/* Lead service featured full-width, the rest in a 2-col grid below. */}
        <Stagger className="grid gap-6 md:grid-cols-2" stagger={0.09}>
          <StaggerItem effect="clip" className="md:col-span-2">
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
      <CTABlock />
    </div>
  );
}
