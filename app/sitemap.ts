import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { serviceSlugs } from "@/content/services";
import { projectSlugs } from "@/content/work";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/prace",
    "/sluzby",
    "/o-nas",
    "/kontakt",
    ...serviceSlugs.map((slug) => `/sluzby/${slug}`),
    ...projectSlugs.map((slug) => `/prace/${slug}`),
  ];
  return routing.locales.flatMap((locale) => {
    // default locale (cs) lives at the root; non-default keeps its /<locale> prefix
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
    return paths.map((path) => ({
      url: `${site.url}${prefix}${path}`,
      lastModified: new Date(),
    }));
  });
}
