"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type { PriceGroup, PriceRow } from "@/content/prices";
import { PriceTable } from "./PriceTable";

/** Case- and diacritic-insensitive, so "vymena displeje" finds "Výměna displeje". */
function fold(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

/** Anchor id for a repair category, e.g. "Zadní sklo" -> "zadni-sklo". */
export function anchor(category: string) {
  return fold(category)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * One row's searchable text: its category, model, repair name and any note.
 *
 * The category matters because Czech declines: the rows under "Zadní sklo" read
 * "Výměna samotného zadního skla", and a plain substring search for the words a
 * customer would type - "zadní sklo" - misses every one of them. Searching the
 * heading they can see on the page is the behaviour people expect anyway.
 */
export function haystack(row: PriceRow, category: string) {
  return fold(`${category} ${row.model} ${row.repair} ${row.note ?? ""}`);
}

/**
 * Pure filter behind the search box and the category chips. Every word in the
 * query must appear somewhere in the row, so "12 baterie" works and so does
 * "iphone 12" against a model written "iPhone 12 / 12 Pro". Groups that end up
 * empty are dropped. Exported so `scripts/check-price-filter.ts` can prove it.
 */
export function filterGroups(
  groups: PriceGroup[],
  query: string,
  category: string | null,
): PriceGroup[] {
  // Czech declines its nouns, so what a customer types rarely matches the text
  // on the page letter for letter: "voda" vs "po vodě", "sklo" vs "zadního
  // skla". Dropping the final letter of a term of four or more characters
  // covers the common case without pulling in a stemmer.
  const terms = fold(query)
    .split(/\s+/)
    .filter(Boolean)
    .map((term) => (term.length >= 4 ? term.slice(0, -1) : term));
  return groups
    .filter((g) => category === null || g.category === category)
    .map((g) => ({
      category: g.category,
      // A term must start a word, never sit inside one. Czech inflects on the
      // end, so the stem is always at the front - and matching mid-word turns
      // a search for "voda" into every note containing "původní".
      rows: g.rows.filter((row) => {
        const words = haystack(row, g.category).split(/[^a-z0-9]+/).filter(Boolean);
        return terms.every((term) => words.some((word) => word.startsWith(term)));
      }),
    }))
    .filter((g) => g.rows.length > 0);
}

function Chip({
  active,
  count,
  onClick,
  children,
}: {
  active: boolean;
  count: number;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`btp-focus inline-flex items-center gap-2 rounded border px-3 py-2 text-sm transition-colors duration-200 ${
        active
          ? "border-paper bg-paper text-ink"
          : "border-line bg-white/[0.03] text-muted hover:border-paper/60 hover:text-paper"
      }`}
    >
      {children}
      <span className={`font-mono text-xs ${active ? "text-ink/60" : "text-muted/60"}`}>{count}</span>
    </button>
  );
}

/**
 * Search + category filter over one device's price tables.
 *
 * The first render is deliberately unfiltered, so the static export still ships
 * every row and a crawler sees the whole price list. Filtering only ever happens
 * after hydration, in the browser.
 */
export function PriceBrowser({ groups }: { groups: PriceGroup[] }) {
  const t = useTranslations("cenik");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string | null>(null);

  const visible = useMemo(() => filterGroups(groups, query, active), [groups, query, active]);

  const total = groups.reduce((n, g) => n + g.rows.length, 0);
  const shown = visible.reduce((n, g) => n + g.rows.length, 0);
  const filtering = active !== null || query.trim() !== "";

  return (
    <>
      <div className="mt-12 border-t border-line pt-8">
        <label htmlFor="cenik-search" className="label text-accent-from">
          {t("search")}
        </label>
        <input
          id="cenik-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchPlaceholder")}
          autoComplete="off"
          className="btp-focus mt-3 w-full rounded border border-line bg-white/[0.03] px-4 py-3 text-paper placeholder:text-muted/60"
        />

        <div className="mt-5 flex flex-wrap gap-2">
          <Chip active={active === null} count={total} onClick={() => setActive(null)}>
            {t("all")}
          </Chip>
          {groups.map((g) => (
            <Chip
              key={g.category}
              active={active === g.category}
              count={g.rows.length}
              onClick={() => setActive(active === g.category ? null : g.category)}
            >
              {g.category}
            </Chip>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <p aria-live="polite" className="font-mono text-xs uppercase tracking-wide text-muted">
            {t("results", { count: shown })}
          </p>
          {filtering && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActive(null);
              }}
              className="btp-focus text-sm text-muted underline underline-offset-4 transition-colors hover:text-paper"
            >
              {t("clear")}
            </button>
          )}
        </div>
      </div>

      {visible.map((group) => (
        <section key={group.category} id={anchor(group.category)} className="scroll-mt-24 pt-16">
          <h2 className="font-head text-h3 font-bold">{group.category}</h2>
          <span aria-hidden className="mt-3 block h-px w-8 bg-fracture" />
          <div className="mt-6 overflow-x-auto">
            <PriceTable group={{ category: group.category, rows: group.rows }} />
          </div>
        </section>
      ))}

      {shown === 0 && (
        <div className="mt-16 border border-line p-12">
          <p className="font-head text-h3">{t("noResults")}</p>
        </div>
      )}
    </>
  );
}
