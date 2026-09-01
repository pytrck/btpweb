import type { Metadata } from "next";
import { site } from "@/content/site";

/** Build consistent per-page metadata (title, canonical, hreflang, OG, Twitter).
 *  The OG image is the static card at public/opengraph-image.png. */
export function buildMeta({
  title,
  description,
  path,
  locale,
}: {
  title: string;
  description: string;
  path: string; // e.g. "/sluzby" ("" for home)
  locale: string;
}): Metadata {
  const base = site.url;
  const url = `${base}${locale === "en" ? "/en" : ""}${path}`;
  const ogTitle = `${title} - ${site.name}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { cs: `${base}${path}`, en: `${base}/en${path}` },
    },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: site.name,
      type: "website",
      locale: locale === "en" ? "en_US" : "cs_CZ",
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: ogTitle, description, images: ["/opengraph-image.png"] },
  };
}
