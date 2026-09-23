# -*- coding: utf-8 -*-
"""Generate content/prices.ts from the BTP service price workbook.

WHITELIST, NEVER BLACKLIST. Only the columns named below are ever read: the
public sheets' customer-facing columns, plus the Standard and Premium RETAIL
columns from the internal sheet. Cost, shipping, VAT, consumables, labour
minutes, hourly rate, risk markup, total cost, margin, the Budget tier and the
supplier/part notes are never touched, so they cannot leak into this public repo.

Usage:  python scripts/gen-prices.py "<path to BTP_Full_Service_Cenik.xlsx>"
"""
import sys
import re
import math
import io
import datetime
import openpyxl

INTERNAL_SHEET = "Intern\u00ed kalkulace - neve\u0159ejn\u00e9"

# page slug -> (Czech page title, source sheet names in order)
PAGES = [
    ("iphone", "Oprava iPhone", [
        "iPhone \u2013 displeje", "iPhone \u2013 baterie", "iPhone \u2013 zadn\u00ed sklo",
        "iPhone \u2013 konektory", "iPhone \u2013 kamery, Face ID",
        "iPhone \u2013 pokro\u010dil\u00e9 opravy"]),
    ("ipad", "Oprava iPad", ["iPad"]),
    ("macbook", "Oprava MacBook a iMac", ["MacBook a iMac"]),
    # Apple Watch and AirPods are deliberately absent: those repairs are taken on
    # request only, so they get no published price list. The workbook sheet stays
    # where it is - listing a sheet here is what publishes it.
    ("android", "Oprava telefon\u016f s Androidem", ["Android telefony"]),
    ("notebooky-a-pc", "Oprava notebook\u016f a PC", ["Windows notebooky a PC"]),
    ("konzole", "Oprava hern\u00edch konzol\u00ed", ["Hern\u00ed konzole"]),
    ("mikropajeni", "Mikrop\u00e1jen\u00ed a oprava desek", ["Mikrop\u00e1jen\u00ed a elektronika"]),
    ("software-a-data", "Software, data a IT slu\u017eby", ["Software, data a IT slu\u017eby"]),
    ("diagnostika", "Diagnostika a servisn\u00ed \u00fakony", ["Diagnostika a slu\u017eby"]),
]

EXPECTED_HEADER = [
    "Kategorie", "Za\u0159\u00edzen\u00ed / model", "Oprava", "Standardn\u00ed cena",
    "Cena od", "\u010cas opravy", "Z\u00e1ruka", "Pozn\u00e1mka",
]

# A Premium tier means a better PART. These categories are labour, setup or
# accessory work - diagnostics, software, data transfer, fitting a case or a
# screen protector - where there is nothing to upgrade, so they publish one
# price. Anything not listed here keeps its tier.
LABOUR_ONLY_CATEGORIES = {
    "Diagnostika", "Diagnostika a servis", "Ostatní drobné opravy",
    "Software", "Systém", "Nastavení", "Přenos dat", "Záloha",
    "Aktivace", "E-mail", "Síť", "Tiskárna", "Bezpečnost",
    "Data", "Podpora", "Sestavení", "Záchrana dat", "Párování",
}

# Rows whose note says the component is billed separately ("Cena montáže, disk
# zvlášť") are quoting labour only, whatever category they sit in.
PART_BILLED_SEPARATELY = "zvlášť"

# Row-level boilerplate that becomes one page-level line instead.
TIER_BOILERPLATE = ("Dostupn\u00e1 levn\u011bj\u0161\u00ed (Budget) i pr\u00e9miov\u00e1 "
                    "(Premium) varianta po domluv\u011b.")


def round100(value):
    """Excel's CEILING(x, 100). Always up, so rounding can only protect margin."""
    return int(math.ceil(float(value) / 100.0) * 100)


def fmt(n):
    """3 390 -> "3 390" with a non-breaking thousands separator."""
    s, out = str(int(n)), ""
    while len(s) > 3:
        out = " " + s[-3:] + out
        s = s[:-3]
    return s + out


# The first run of digits in a string like "od 4 990 Kc", ending on a digit so
# the trailing space before the currency is left alone.
PRICE_IN_TEXT = re.compile(r"\d[\d  ]*\d|\d")


def round_price_in_text(text):
    """Round the number inside "od 4 990 Kc" too, so one rule covers every price."""
    m = PRICE_IN_TEXT.search(text)
    if not m:
        return text
    digits = m.group(0).replace(" ", "").replace(" ", "")
    out = text[:m.start()] + fmt(round100(int(digits))) + text[m.end():]
    # Keep the amount and its currency on one line, as the table columns do.
    return out.replace(" Kč", " Kč")


def norm(s):
    return re.sub(r"\s+", " ", str(s or "").strip()).lower()


def clean(v):
    """Cell -> trimmed string, or None for blanks and the em-dash placeholder."""
    if v is None:
        return None
    s = re.sub(r"\s+", " ", str(v).strip())
    return None if s in ("", "\u2014", "-") else s


def ts(s):
    return '"%s"' % s.replace("\\", "\\\\").replace('"', '\\"')


def load_premium(wb):
    """(kategorie, model, oprava) -> (standard, premium). Retail columns only."""
    ws = wb[INTERNAL_SHEET]
    header_row = None
    for i, r in enumerate(ws.iter_rows(values_only=True), 1):
        if r[0] == "Kategorie":
            header_row = i
            break
    if header_row is None:
        sys.exit("FAIL: no header row in the internal sheet")
    hdr = [str(c or "") for c in next(
        ws.iter_rows(min_row=header_row, max_row=header_row, values_only=True))]
    for col in ("Standard", "Premium"):
        if col not in hdr:
            sys.exit("FAIL: internal sheet has no %r column" % col)
    i_std, i_prem = hdr.index("Standard"), hdr.index("Premium")
    out = {}
    for r in ws.iter_rows(min_row=header_row + 1, values_only=True):
        if not r[0]:
            continue
        out[(norm(r[0]), norm(r[1]), norm(r[2]))] = (r[i_std], r[i_prem])
    return out


def read_sheet(ws):
    """Public sheet -> (notices, data rows). Fails loudly on an unexpected layout."""
    rows = list(ws.iter_rows(values_only=True))
    hi = None
    for i, r in enumerate(rows):
        if r[0] == "Kategorie":
            hi = i
            break
    if hi is None:
        sys.exit("FAIL: no header row in sheet %r" % ws.title)
    got = [clean(c) for c in rows[hi][:8]]
    if got != EXPECTED_HEADER:
        sys.exit("FAIL: unexpected columns in %r:\n  %r" % (ws.title, got))
    # Rows above the header carry standing technical warnings for the whole page.
    notices = [clean(r[0]) for r in rows[1:hi] if clean(r[0])]
    return notices, rows[hi + 1:]


def build_pages(wb, premium):
    pages, total = [], 0
    for slug, title, sheet_names in PAGES:
        notices, groups, order = [], {}, []
        for name in sheet_names:
            if name not in wb.sheetnames:
                sys.exit("FAIL: sheet %r missing from the workbook" % name)
            sheet_notices, raw = read_sheet(wb[name])
            for n in sheet_notices:
                # Sheets repeat warnings, and some are a superset of another's.
                # Keep the longest wording, drop anything it already contains.
                if any(n in kept for kept in notices):
                    continue
                notices = [kept for kept in notices if kept not in n]
                notices.append(n)
            for r in raw:
                kat, model, repair = clean(r[0]), clean(r[1]), clean(r[2])
                if not kat or not repair:
                    continue
                std, frm = r[3], clean(r[4])
                row = {"model": model or "V\u0161echny modely", "repair": repair}
                if isinstance(std, (int, float)):
                    # Every published price is rounded up to a whole hundred, so
                    # the list reads in clean numbers rather than the workbook's
                    # ...90 endings and the Premium column's raw x1.25 output.
                    row["std"] = round100(std) if std > 0 else 0
                    # Tiers only make sense where there is a fixed price AND a
                    # part whose quality can actually differ.
                    note = clean(r[7]) or ""
                    tierable = (kat not in LABOUR_ONLY_CATEGORIES
                                and PART_BILLED_SEPARATELY not in note.lower())
                    if std > 0 and tierable:
                        _, prem = premium.get(
                            (norm(r[0]), norm(r[1]), norm(r[2])), (None, None))
                        if isinstance(prem, (int, float)):
                            prem = round100(prem)
                            # Both ends round up, so re-check the tiers are still
                            # apart rather than trusting the raw comparison.
                            if prem > row["std"]:
                                row["premium"] = prem
                elif frm:
                    row["from"] = round_price_in_text(frm)
                for key, idx in (("time", 5), ("warranty", 6), ("note", 7)):
                    v = clean(r[idx])
                    if key == "note" and v:
                        v = v.replace(TIER_BOILERPLATE, "").strip() or None
                    if v:
                        row[key] = v
                if kat not in groups:
                    groups[kat] = []
                    order.append(kat)
                groups[kat].append(row)
                total += 1
        pages.append((slug, title, notices, [(k, groups[k]) for k in order]))
    return pages, total


HEADER = '''// GENERATED FILE - do not edit by hand.
// Source: BTP_Full_Service_Cenik.xlsx, public sheets plus the Standard/Premium
// retail columns. Cost, margin, supplier and the Budget tier are never read, so
// nothing confidential can reach this public repo.
// Regenerate: python scripts/gen-prices.py "<path to the workbook>"

export type PriceRow = {
  model: string;
  repair: string;
  /** Standard tier, CZK incl. VAT. 0 means free. */
  std?: number;
  /** Premium tier (OEM / best available part), CZK incl. VAT. */
  premium?: number;
  /** Used instead of a fixed price: "od 4 990 Kc" / "Cena po diagnostice". */
  from?: string;
  time?: string;
  warranty?: string;
  note?: string;
};

export type PriceGroup = { category: string; rows: PriceRow[] };

export type PriceSheet = {
  slug: string;
  title: string;
  /** Standing technical warnings that apply to the whole page. */
  notices: string[];
  groups: PriceGroup[];
};

'''

FOOTER = '''export const priceSheetSlugs = priceSheets.map((s) => s.slug);

export function getPriceSheet(slug: string): PriceSheet | undefined {
  return priceSheets.find((s) => s.slug === slug);
}

/**
 * A row's numeric price: the fixed Standard price, or the number inside an
 * "od 4 990 Kc" string. Rows quoted only after diagnosis have none.
 */
export function priceValue(row: PriceRow): number | undefined {
  if (typeof row.std === "number" && row.std > 0) return row.std;
  const digits = row.from?.match(/\\d[\\d\\s\\u00a0]*/);
  if (!digits) return undefined;
  const n = Number(digits[0].replace(/[\\s\\u00a0]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

/** Lowest price anywhere on a sheet. Includes the "od ..." rows. */
export function lowestPrice(sheet: PriceSheet): number | undefined {
  const all = sheet.groups
    .flatMap((g) => g.rows.map(priceValue))
    .filter((p): p is number => p !== undefined);
  return all.length ? Math.min(...all) : undefined;
}

/**
 * The two repairs people actually price-check, so a teaser never leads with a
 * 390 Kc stuck-SIM-tray job on a page someone opened about a screen.
 *
 * Matched on the repair name, not the category: the Displej group also holds
 * gasket swaps at 870 Kc and the Baterie group a 400 Kc drain diagnostic, and
 * either would advertise a screen replacement at a quarter of its real price.
 */
export function headlinePrices(sheet: PriceSheet): { category: string; from: number }[] {
  const out: { category: string; from: number }[] = [];
  for (const match of ["výměna displeje", "výměna baterie"]) {
    let label: string | undefined;
    let low: number | undefined;
    for (const group of sheet.groups) {
      for (const row of group.rows) {
        if (!row.repair.toLowerCase().startsWith(match)) continue;
        const value = priceValue(row);
        if (value === undefined) continue;
        if (low === undefined || value < low) {
          low = value;
          label = group.category;
        }
      }
    }
    if (low !== undefined && label) out.push({ category: label, from: low });
  }
  return out;
}
'''


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    wb = openpyxl.load_workbook(sys.argv[1], data_only=True)
    pages, total = build_pages(wb, load_premium(wb))

    out = io.open("content/prices.ts", "w", encoding="utf-8", newline="\n")
    out.write(HEADER)
    out.write('export const pricesUpdated = "%s";\n\n' % datetime.date.today().isoformat())
    out.write("export const priceSheets: PriceSheet[] = [\n")
    for slug, title, notices, groups in pages:
        out.write("  {\n    slug: %s,\n    title: %s,\n" % (ts(slug), ts(title)))
        out.write("    notices: [%s],\n" % ", ".join(ts(n) for n in notices))
        out.write("    groups: [\n")
        for cat, rows in groups:
            out.write("      {\n        category: %s,\n        rows: [\n" % ts(cat))
            for row in rows:
                parts = []
                for k in ("model", "repair", "std", "premium", "from", "time",
                          "warranty", "note"):
                    if k in row:
                        v = row[k]
                        parts.append("%s: %s" % (k, v if isinstance(v, int) else ts(v)))
                out.write("          { %s },\n" % ", ".join(parts))
            out.write("        ],\n      },\n")
        out.write("    ],\n  },\n")
    out.write("];\n\n")
    out.write(FOOTER)
    out.close()
    tiered = sum(1 for _, _, _, groups in pages
                 for _, rows in groups for row in rows if "premium" in row)
    print("content/prices.ts: %d pages, %d rows, %d with a Premium tier"
          % (len(pages), total, tiered))


main()
