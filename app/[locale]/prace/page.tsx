import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { projects } from "@/content/work";
import { WorkCard } from "@/components/cards/WorkCard";
import { PageHeader } from "@/components/sections/PageHeader";
import { CTABlock } from "@/components/sections/CTABlock";
import { buildMeta } from "@/lib/meta";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "pages.work" });
  return buildMeta({ title: t("title"), description: t("subtitle"), path: "/prace", locale: params.locale });
}

export default async function WorkPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations("pages.work");
  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <section className="container-x pb-section">
        {projects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((p, i) => (
              <div key={p.slug} className={i % 2 === 1 ? "md:mt-16" : ""}>
                <WorkCard
                  title={p.title}
                  summary={p.summary}
                  tag={p.tag}
                  slug={p.slug}
                  result={p.result}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-line p-12">
            <p className="font-head text-h3">{t("empty")}</p>
          </div>
        )}
      </section>
      <CTABlock />
    </>
  );
}
