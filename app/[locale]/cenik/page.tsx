import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { priceSheets, pricesUpdated } from "@/content/prices";
import { Link } from "@/i18n/routing";
import { PageHeader } from "@/components/sections/PageHeader";
import { CTABlock } from "@/components/sections/CTABlock";
import { TierLegend, priceSummary } from "@/components/cenik/PriceTable";
import { buildMeta } from "@/lib/meta";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "cenik" });
  return buildMeta({
    title: t("title"),
    description: t("subtitle"),
    path: "/cenik",
    locale: params.locale,
  });
}

export default async function PriceListPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations("cenik");
  const updated = new Date(pricesUpdated).toLocaleDateString(
    params.locale === "en" ? "en-GB" : "cs-CZ",
  );

  return (
    <div className="relative">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <section className="container-x pb-section">
        <p className="max-w-2xl text-lg text-muted">{t("lead")}</p>
        <p className="mt-4 max-w-2xl text-sm text-muted/80">{t("minCharge")}</p>

        <div className="mt-10">
          <TierLegend />
        </div>

        {/* One card per device family. Each carries its real headline prices, so
            the grid answers "roughly what does this cost" before a single click.
            10 cards in a 3-column grid leave one alone on the last row, so the
            final card - service actions rather than a device - spans the width. */}
        <ul className="hairgrid mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {priceSheets.map((sheet, i) => {
            const summary = priceSummary(sheet, (price) => t("fromPrice", { price }));
            const count = sheet.groups.reduce((n, g) => n + g.rows.length, 0);
            const lonely = priceSheets.length % 3 === 1 && i === priceSheets.length - 1;
            return (
              <li key={sheet.slug} className={lonely ? "lg:col-span-3" : undefined}>
                <Link
                  href={`/cenik/${sheet.slug}`}
                  data-umami-event="cenik-click"
                  data-umami-event-slug={sheet.slug}
                  className="btp-focus group flex h-full flex-col justify-between gap-6 p-8 transition-colors duration-300 hover:bg-white/[0.03]"
                >
                  <div>
                    <h2 className="font-head text-h3 font-bold transition-colors duration-300 group-hover:text-paper">
                      {sheet.title}
                    </h2>
                    {summary.length > 0 && (
                      <p className="mt-3 text-sm text-accent-from">{summary.join(" · ")}</p>
                    )}
                  </div>
                  <p className="label flex items-center justify-between">
                    <span>{count}×</span>
                    <span
                      aria-hidden
                      className="text-accent-from transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-16 grid gap-10 border-t border-line pt-10 md:grid-cols-[1fr_1.2fr]">
          <h2 className="label text-accent-from">{t("rulesTitle")}</h2>
          <ul className="space-y-3 text-sm text-muted">
            {t.raw("rules").map((rule: string) => (
              <li key={rule} className="flex gap-3">
                <span aria-hidden className="text-accent-from">
                  —
                </span>
                {rule}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 font-mono text-xs uppercase tracking-wide text-muted/70">
          {t("updated", { date: updated })}
        </p>
      </section>

      <CTABlock />
    </div>
  );
}
