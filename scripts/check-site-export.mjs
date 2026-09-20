// Run after npm run build: node scripts/check-site-export.mjs
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const sitemap = readFileSync("out/sitemap.xml", "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.ok(urls.length > 0, "Sitemap must contain pages");
assert.equal(new Set(urls).size, urls.length, "Sitemap URLs must be unique");

for (const url of urls) {
  const parsed = new URL(url);
  assert.equal(parsed.origin, "https://breakthepattern.cz");
  assert.ok(parsed.pathname.endsWith("/"), `Avoid a trailing-slash redirect: ${url}`);
  const html = readFileSync(join("out", parsed.pathname, "index.html"), "utf8");
  assert.ok(!/http-equiv="refresh"/i.test(html), `Sitemap includes a redirect: ${url}`);
  assert.ok(!/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html), url);
  assert.ok(html.includes(`<link rel="canonical" href="${url}"`), `Canonical mismatch: ${url}`);

  const policy = html.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/i)?.[1];
  assert.ok(policy, `Missing production CSP: ${url}`);
  const scripts = policy.replaceAll("&#x27;", "'").split(";").find((directive) => directive.trim().startsWith("script-src "));
  for (const origin of ["https://www.clarity.ms", "https://scripts.clarity.ms"]) {
    assert.ok(scripts.split(/\s+/).includes(origin), `Clarity script blocked: ${origin} on ${url}`);
  }
}
console.log(`Export checks passed: ${urls.length} canonical, indexable pages; both Clarity script origins allowed.`);
