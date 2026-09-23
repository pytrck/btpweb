import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { priceSheetSlugs, getPriceSheet, pricesUpdated } from "@/content/prices";
import { site } from "@/content/site";
import { Link } from "@/i18n/routing";
import { PageHeader } from "@/components/sections/PageHeader";
import { CTABlock } from "@/components/sections/CTABlock";
import { TierLegend, priceSummary } from "@/components/cenik/PriceTable";
import { PriceBrowser } from "@/components/cenik/PriceBrowser";
import { buildMeta } from "@/lib/meta";

export function generateStaticParams() {
  return priceSheetSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const sheet = getPriceSheet(params.slug);
  if (!sheet) return {};
  const t = await getTranslations({ locale: params.locale, namespace: "cenik" });
  // The description leads with real headline prices - those numbers are what
  // make a search result worth clicking for someone pricing up a repair. Sheets
  // that are quote-after-diagnosis throughout (mikropájení) have no price to
  // lead with, so they lead with what they cover instead; without that they
  // would share the hub's description word for word.
  const summary = priceSummary(sheet, (price) => t("fromPrice", { price }));
  const lead = summary.length
    ? summary.join(", ")
    : sheet.groups.map((g) => g.category).slice(0, 5).join(", ");
  const description = `${lead}. ${t("subtitle")}`;
  return buildMeta({
    title: `${sheet.title} — ceník`,
    description,
    path: `/cenik/${sheet.slug}`,
    locale: params.locale,
  });
}

export default async function PriceSheetPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(params.locale);
  const sheet = getPriceSheet(params.slug);
  if (!sheet) notFound();
  const t = await getTranslations("cenik");
  const summary = priceSummary(sheet, (price) => t("fromPrice", { price }));
  const updated = new Date(pricesUpdated).toLocaleDateString(
    params.locale === "en" ? "en-GB" : "cs-CZ",
  );
  const prefix = params.locale === "en" ? "/en" : "";

  // Every fixed price on the page, as one AggregateOffer. A per-row Offer list
  // would be hundreds of entries for no extra gain: Google shows no price rich
  // result for services, so the ranking comes from the visible table text.
  const prices = sheet.groups
    .flatMap((g) => g.rows.flatMap((r) => [r.std, r.premium]))
    .filter((p): p is number => typeof p === "number" && p > 0);
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: sheet.title,
        serviceType: sheet.title,
        provider: { "@type": "Organization", name: site.name, url: site.url },
        areaServed: site.city,
        url: `${site.url}${prefix}/cenik/${sheet.slug}/`,
        ...(prices.length
          ? {
              offers: {
                "@type": "AggregateOffer",
                priceCurrency: "CZK",
                lowPrice: Math.min(...prices),
                highPrice: Math.max(...prices),
                offerCount: prices.length,
              },
            }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t("title"), item: `${site.url}${prefix}/cenik/` },
          { "@type": "ListItem", position: 2, name: sheet.title },
        ],
      },
    ],
  };

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }}
      />

      <PageHeader
        title={sheet.title}
        subtitle={summary.length ? `${summary.join(" · ")}. ${t("subtitle")}` : t("subtitle")}
      />

      <section className="container-x pb-section">
        <TierLegend />

        <PriceBrowser groups={sheet.groups} />

        {sheet.notices.length > 0 && (
          <div className="mt-16 grid gap-10 border-t border-line pt-10 md:grid-cols-[1fr_1.2fr]">
            <h2 className="label text-accent-from">{t("noticesTitle")}</h2>
            <ul className="space-y-3 text-sm text-muted">
              {sheet.notices.map((n) => (
                <li key={n} className="flex gap-3">
                  <span aria-hidden className="text-accent-from">
                    —
                  </span>
                  {n}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-xs uppercase tracking-wide text-muted/70">
            {t("updated", { date: updated })}
          </p>
          <Link
            href="/cenik"
            className="btp-focus text-sm text-muted underline-offset-4 transition-colors hover:text-paper hover:underline"
          >
            ← {t("backToHub")}
          </Link>
        </div>
      </section>

      <CTABlock />
    </div>
  );
}
