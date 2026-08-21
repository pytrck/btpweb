import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["cs", "en"],
  defaultLocale: "cs",
  // "as-needed": the default locale (cs) is served WITHOUT a prefix; non-default
  // (en) keeps /en. There is no middleware on static GitHub Pages to map "/" to
  // the default locale, so the [locale] export still emits a /cs/ folder at build
  // time — scripts/localize-export.mjs then lifts it to the site root and leaves
  // /cs/* as redirects. Internal <Link>s pick up the unprefixed cs paths from here.
  localePrefix: "as-needed",
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
