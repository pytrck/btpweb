import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { services } from "@/content/services";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { PageHeader } from "@/components/sections/PageHeader";
import { CTABlock } from "@/components/sections/CTABlock";
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
  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <section className="container-x pb-section">
        <div className="grid gap-px md:grid-cols-2">
          {services.map((s) => (
            <ServiceCard
              key={s.slug}
              title={s.title}
              description={s.description}
              slug={s.slug}
              proof={s.proof[0]}
            />
          ))}
        </div>
      </section>
      <CTABlock />
    </>
  );
}
