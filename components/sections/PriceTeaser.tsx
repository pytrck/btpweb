import { useTranslations } from "next-intl";
import { getPriceSheet } from "@/content/prices";
import { Link } from "@/i18n/routing";
import { SectionHeader } from "./SectionHeader";
import { priceSummary } from "@/components/cenik/PriceTable";

/** The four device families people arrive with most often. */
const FEATURED = ["iphone", "android", "notebooky-a-pc", "konzole"];

/**
 * Real prices on the homepage. A repair visitor's first question is "what will
 * this cost" - answering it above the fold of the lower page beats another
 * paragraph of promises, and it points internal links at the price tables.
 */
export function PriceTeaser() {
  const t = useTranslations("cenik");
  const sheets = FEATURED.map((slug) => getPriceSheet(slug)).filter(
    (s): s is NonNullable<typeof s> => Boolean(s),
  );
  if (sheets.length === 0) return null;

  return (
    <section className="container-x py-section">
      <SectionHeader kicker={t("table.standard")} title={t("title")} cta={t("openSheet")} ctaHref="/cenik" />
      <ul className="hairgrid sm:grid-cols-2 lg:grid-cols-4">
        {sheets.map((sheet) => {
          const summary = priceSummary(sheet, (price) => t("fromPrice", { price }));
          return (
            <li key={sheet.slug}>
              <Link
                href={`/cenik/${sheet.slug}`}
                data-umami-event="cenik-click"
                data-umami-event-slug={sheet.slug}
                className="btp-focus group flex h-full flex-col justify-between gap-6 p-8 transition-colors duration-300 hover:bg-white/[0.03]"
              >
                <span className="font-head text-h3 font-bold">{sheet.title}</span>
                {summary.length > 0 && (
                  <span className="text-sm text-accent-from">
                    {summary.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 text-sm text-muted">{t("minCharge")}</p>
    </section>
  );
}
