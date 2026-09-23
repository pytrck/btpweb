/**
 * Proves the ceník search/filter against the real price data.
 * The filter runs in the browser, so the exported HTML can't cover it.
 *
 * Run: npx tsx scripts/check-price-filter.ts
 */
import assert from "node:assert/strict";
import { getPriceSheet, priceSheets } from "../content/prices";
import { filterGroups, anchor, haystack } from "../components/cenik/PriceBrowser";

const iphone = getPriceSheet("iphone")!;
const count = (groups: ReturnType<typeof filterGroups>) =>
  groups.reduce((n, g) => n + g.rows.length, 0);
const rows = (groups: ReturnType<typeof filterGroups>) => groups.flatMap((g) => g.rows);

// An empty query must return everything - this is the state the static export
// ships, and the state a crawler sees.
assert.equal(count(filterGroups(iphone.groups, "", null)), 119);
assert.equal(count(filterGroups(iphone.groups, "   ", null)), 119);

// Searching a model finds that model across every repair category. A match may
// come from the repair name rather than the model column - rows like
// "Zadní kamera: iPhone 12-16" are listed under "Všechny modely" and should
// still surface for someone searching their iPhone 12.
const m12 = filterGroups(iphone.groups, "iPhone 12", null);
assert.ok(m12.length > 1, "iPhone 12 should match in more than one category");
assert.ok(
  m12.every((g) => g.rows.every((r) => haystack(r, g.category).includes("12"))),
);
assert.ok(
  m12.some((g) => g.category === "Displej") && m12.some((g) => g.category === "Baterie"),
  "iPhone 12 should match both a display and a battery repair",
);
assert.ok(
  m12.some((g) => g.rows.some((r) => r.model.includes("12"))),
  "at least some matches should come from the model column itself",
);
// It must not drag in every other generation.
assert.ok(!rows(m12).some((r) => r.model === "iPhone 6 / 6 Plus"));

// Case and diacritics must not matter: people type without them.
assert.deepEqual(
  filterGroups(iphone.groups, "vymena displeje", null),
  filterGroups(iphone.groups, "Výměna Displeje", null),
);
assert.ok(count(filterGroups(iphone.groups, "vymena displeje", null)) > 20);

// Every word must match, in any order, across model and repair name.
const both = filterGroups(iphone.groups, "12 baterie", null);
assert.ok(count(both) > 0);
assert.ok(
  both.every((g) =>
    g.rows.every(
      (r) => haystack(r, g.category).includes("12") && haystack(r, g.category).includes("baterie"),
    ),
  ),
);
assert.deepEqual(both, filterGroups(iphone.groups, "baterie 12", null));
// Narrower than either word alone.
assert.ok(count(both) < count(filterGroups(iphone.groups, "baterie", null)));

// A category chip narrows to exactly that group.
const battery = filterGroups(iphone.groups, "", "Baterie");
assert.equal(battery.length, 1);
assert.equal(battery[0].category, "Baterie");
assert.equal(
  count(battery),
  iphone.groups.find((g) => g.category === "Baterie")!.rows.length,
);

// Chip and query compose, and an impossible combination yields nothing at all
// rather than an empty group with a heading.
assert.equal(count(filterGroups(iphone.groups, "iPhone 15", "Baterie")) > 0, true);
assert.equal(filterGroups(iphone.groups, "nonsense-zzz", null).length, 0);
assert.equal(filterGroups(iphone.groups, "iPhone 15", "Displej").length, 1);

// Czech declension: the rows under "Zadní sklo" all read "zadního skla", so the
// words a customer types only match via the category heading.
const glass = filterGroups(iphone.groups, "zadni sklo", null);
assert.ok(
  glass.some((g) => g.category === "Zadní sklo" && g.rows.length >= 8),
  "searching \"zadni sklo\" must return the Zadní sklo group",
);

// A term must start a word. Czech inflects on the end, so a four-letter query
// is matched by its stem - but "voda" -> "vod" sits inside "původní", which
// appears in most of the technical notes, and matching mid-word turned a search
// for water damage into every back-glass and housing job on the sheet.
const water = filterGroups(iphone.groups, "voda", null);
assert.equal(count(water), 2, "\"voda\" should match only the two water repairs");
assert.ok(rows(water).every((r) => /vod/i.test(r.repair)));
assert.ok(!rows(water).some((r) => r.repair.includes("housing")));

// The stemming still has to earn its keep in both directions.
assert.ok(count(filterGroups(iphone.groups, "sklo", null)) >= 9, "sklo -> skla");
assert.ok(count(filterGroups(iphone.groups, "displeje", null)) >= 30, "displeje -> displej");

// Anchors stay unique per sheet, so the group ids can't collide.
for (const sheet of priceSheets) {
  const ids = sheet.groups.map((g) => anchor(g.category));
  assert.equal(new Set(ids).size, ids.length, `duplicate anchor in ${sheet.slug}`);
  assert.ok(ids.every((id) => /^[a-z0-9-]+$/.test(id)), `bad anchor in ${sheet.slug}`);
}

console.log("Price filter checks passed: %d sheets, %d rows.", priceSheets.length,
  priceSheets.reduce((n, s) => n + s.groups.reduce((m, g) => m + g.rows.length, 0), 0));
