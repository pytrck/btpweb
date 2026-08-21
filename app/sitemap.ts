import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { projects } from "@/content/work";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/prace",
    "/sluzby",
    "/o-nas",
    "/kontakt",
    ...services.map((s) => `/sluzby/${s.slug}`),
    ...projects.map((p) => `/prace/${p.slug}`),
  ];
  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${site.url}/${locale}${path}`,
      lastModified: new Date(),
    })),
  );
}
