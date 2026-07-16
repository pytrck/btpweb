import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["cs", "en"],
  defaultLocale: "cs",
  // "always" (every locale prefixed: /cs, /en) is required for the static
  // GitHub Pages export: there is no middleware on a static host to rewrite the
  // unprefixed default-locale paths, so the prefixes must be real folders. The
  // root "/" redirects to /cs via app/page.tsx.
  localePrefix: "always",
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
