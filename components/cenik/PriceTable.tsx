import { useTranslations } from "next-intl";
import type { PriceGroup, PriceRow, PriceSheet } from "@/content/prices";
import { headlinePrices, lowestPrice } from "@/content/prices";

/** Czech thousands separator, done locally so the output can't drift with ICU. */
export function czk(n: number) {
  return `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Kč`;
}

/**
 * How a sheet advertises itself: "Displej od 1 490 Kč", "Baterie od 890 Kč".
 * One phrasing shared by the cards, the service pages and the meta description,
 * so a price never reads one way in search results and another on the page.
 * `from` is the caller's `t("fromPrice", { price })`.
 */
export function priceSummary(sheet: PriceSheet, from: (price: string) => string): string[] {
  const heads = headlinePrices(sheet);
  if (heads.length > 0) return heads.map((h) => `${h.category} ${from(czk(h.from))}`);
  const low = lowestPrice(sheet);
  return low !== undefined ? [from(czk(low))] : [];
}

/** Turnaround + warranty on one quiet line under the repair name. */
function meta(row: PriceRow) {
  return [row.time, row.warranty && `záruka ${row.warranty}`].filter(Boolean).join(" · ");
}

/** What the two tiers mean. Budget is named but never priced - by request only. */
export function TierLegend() {
  const t = useTranslations("cenik");
  return (
    <dl className="grid gap-px border border-line bg-line sm:grid-cols-2">
      {(["standard", "premium"] as const).map((tier) => (
        <div key={tier} className="bg-ink p-6">
          <dt className="label text-accent-from">{t(`tiers.${tier}`)}</dt>
          <dd className="mt-3 text-sm text-muted">{t(`tiers.${tier}Note`)}</dd>
        </div>
      ))}
      <div className="bg-ink p-6 sm:col-span-2">
        <dd className="text-sm text-muted">{t("tiers.budget")}</dd>
      </div>
    </dl>
  );
}

/**
 * One repair category as a real <table>. Three columns fit 360 px without any
 * responsive rewriting, and the model name sits next to the repair name in every
 * row - that pairing ("Výměna displeje" + "iPhone 13") is the text a search for
 * a specific model's repair actually matches.
 */
export function PriceTable({ group }: { group: PriceGroup }) {
  const t = useTranslations("cenik");
  // Labour, setup and accessory work has no part to upgrade, so those groups
  // carry a single price. Dropping the column beats a row of em dashes.
  const tiered = group.rows.some((row) => row.premium);
  return (
    <table className="w-full border-collapse text-left">
      <caption className="sr-only">{group.category}</caption>
      <thead>
        <tr className="border-b border-line">
          <th scope="col" className="label py-3 pr-4">
            {t("table.repair")}
          </th>
          <th scope="col" className="label py-3 pl-4 text-right">
            {tiered ? t("table.standard") : t("table.price")}
          </th>
          {tiered && (
            <th scope="col" className="label py-3 pl-4 text-right">
              {t("table.premium")}
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {group.rows.map((row, i) => {
          const m = meta(row);
          return (
            <tr key={`${row.model}-${row.repair}-${i}`} className="border-b border-line/60 align-top">
              <th scope="row" className="py-4 pr-4 font-normal">
                <span className="block font-medium text-paper">{row.model}</span>
                <span className="block text-sm text-muted">{row.repair}</span>
                {m && <span className="mt-1 block font-mono text-xs text-muted/70">{m}</span>}
                {row.note && <span className="mt-1 block text-xs text-muted/70">{row.note}</span>}
              </th>
              {row.from ? (
                <td
                  colSpan={tiered ? 2 : 1}
                  className="py-4 pl-4 text-right text-sm text-muted"
                >
                  {row.from}
                </td>
              ) : (
                <>
                  <td className="whitespace-nowrap py-4 pl-4 text-right tabular-nums text-paper">
                    {row.std === 0 ? t("free") : czk(row.std!)}
                  </td>
                  {tiered && (
                    <td className="whitespace-nowrap py-4 pl-4 text-right tabular-nums text-muted">
                      {row.premium ? czk(row.premium) : "—"}
                    </td>
                  )}
                </>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
