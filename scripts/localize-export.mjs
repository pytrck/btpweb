// Post-build for the static export: serve the default locale (cs) at the site
// root instead of /cs/, and leave /cs/* as redirects to the new root paths.
// GitHub Pages is static (no server, no middleware), so this file surgery is how
// next-intl's "as-needed" prefix is realised in the shipped `out/` tree. Runs
// automatically after `next build` via the "postbuild" npm script.
import { readdirSync, statSync, writeFileSync, cpSync, existsSync } from "node:fs";
import { join, relative, dirname } from "node:path";

const OUT = "out";
const DEFAULT_LOCALE = "cs"; // keep in sync with i18n/routing.ts defaultLocale
const csDir = join(OUT, DEFAULT_LOCALE);

if (!existsSync(csDir)) {
  console.error(`localize-export: ${csDir} not found - did the export run?`);
  process.exit(1);
}

// 1) Collect every built HTML page under out/cs (one per route folder).
function htmlFiles(dir) {
  const found = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) found.push(...htmlFiles(p));
    else if (name.endsWith(".html")) found.push(p);
  }
  return found;
}
const csHtml = htmlFiles(csDir);

// 2) Lift cs/** to the root (overwrites the "/" redirect stub with the cs home,
//    and creates /sluzby/, /prace/, … alongside the untouched /en tree).
cpSync(csDir, OUT, { recursive: true, force: true });

// 3) Replace each original cs page with a redirect stub → its new root path.
const stub = (target) =>
  `<!doctype html><html lang="cs"><head><meta charset="utf-8">` +
  `<meta http-equiv="refresh" content="0; url=${target}">` +
  `<link rel="canonical" href="${target}"><title>Break The Pattern</title></head>` +
  `<body style="background:#050505;color:#fff;font-family:sans-serif">` +
  `<a href="${target}" style="color:#8F02F8">Break The Pattern →</a></body></html>`;

for (const file of csHtml) {
  const rel = relative(csDir, file).replaceAll("\\", "/"); // e.g. "sluzby/index.html"
  const routeDir = dirname(rel); // "sluzby" | "sluzby/web" | "."
  const target = routeDir === "." ? "/" : `/${routeDir}/`;
  writeFileSync(file, stub(target));
}

console.log(
  `localize-export: lifted ${DEFAULT_LOCALE}/ to root, wrote ${csHtml.length} redirect stubs`,
);
