import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getServices } from "@/content/services";
import { Link } from "@/i18n/routing";
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
  const services = getServices(params.locale);
  // Three pillars lead the page; the supporting services sit in a quieter list
  // below, so the offering reads as three disciplines instead of five options.
  const [first, ...rest] = services.filter((s) => s.pillar);
  const more = services.filter((s) => !s.pillar);

  return (
    <div className="relative">
      <ScrollOrb text="NO TEMPLATES" amp={34} cycles={1.7} jag={9} />
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <section className="container-x pb-section">
        {/* The pillar cards are h3s, so the group needs its own heading to keep
            the outline in order. It says nothing the subtitle doesn't, so it is
            for screen readers only. */}
        <h2 className="sr-only">{t("pillarsTitle")}</h2>
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

        {more.length > 0 && (
          <div className="mt-16 border-t border-line pt-10">
            <h2 className="label text-accent-from">{t("moreTitle")}</h2>
            <ul className="mt-6 border-t border-line">
              {more.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/sluzby/${s.slug}`}
                    className="btp-focus group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-line py-6 transition-colors duration-300 hover:bg-white/[0.03]"
                  >
                    <span className="font-head text-h3 font-bold transition-colors duration-300 group-hover:text-paper">
                      {s.title}
                    </span>
                    <span className="max-w-md text-sm text-muted">{s.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
      <CTABlock />
    </div>
  );
}
