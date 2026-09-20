import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { site, socialLinks } from "@/content/site";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Telemetry } from "@/components/layout/Telemetry";
import "../globals.css";

const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

// Single source for the analytics origin: the script URL and the CSP allowance
// must agree, and an empty value keeps the CSP as tight as it was before.
const UMAMI_HOST = site.umamiId ? "https://cloud.umami.is" : "";
// Clarity loads its tag from www.clarity.ms, then its recording runtime from
// scripts.clarity.ms, and sends beacons to regional *.clarity.ms hosts.
// bat.bing.com is deliberately NOT allowed: that is the
// advertising-ID sync, and we deny ad storage.
const CLARITY_SRC = site.clarityId ? "https://www.clarity.ms https://scripts.clarity.ms" : "";
const CLARITY_API = site.clarityId ? "https://*.clarity.ms" : "";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "meta" });
  const url = params.locale === "en" ? `${site.url}/en` : site.url;
  return {
    metadataBase: new URL(site.url),
    title: { default: t("title"), template: `%s - ${site.name}` },
    description: t("description"),
    alternates: {
      canonical: url,
      languages: { cs: site.url, en: `${site.url}/en`, "x-default": site.url },
    },
    // Search Console ownership proof. Emitted only once a token is set in
    // content/site.ts; DNS TXT verification is the no-code alternative.
    ...(site.googleVerification ? { verification: { google: site.googleVerification } } : {}),
    openGraph: {
      type: "website",
      siteName: site.name,
      title: t("title"),
      description: t("description"),
      url,
      locale: params.locale === "en" ? "en_US" : "cs_CZ",
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/opengraph-image.png"],
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#050505",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  if (!routing.locales.includes(locale as "cs" | "en")) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });

  // Organization schema - ties the domain to the brand name, contact and social
  // profiles so Google can show a knowledge panel and sitelinks. Deliberately
  // not LocalBusiness: that needs a real postal address to earn a rich result.
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: tMeta("description"),
    email: site.email,
    logo: `${site.url}/android-chrome-512x512.png`,
    image: `${site.url}/opengraph-image.png`,
    areaServed: site.city,
    sameAs: socialLinks.map((s) => s.href),
  };

  return (
    <html lang={locale} className={`${space.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        {/* Content-Security-Policy - GitHub Pages can't send HTTP headers, so this
            meta is the hardening ceiling. Locks every resource to same-origin
            (blocks external script/style/img/connect exfiltration). 'unsafe-inline'
            is unavoidable: a static export ships Next's inline bootstrap + framer's
            inline styles with no nonce. Production-only: dev's HMR needs eval, which
            this policy (deliberately) forbids. Real headers (HSTS, X-Frame-Options)
            need a host with a _headers file (Cloudflare/Netlify). */}
        {process.env.NODE_ENV === "production" && (
          <meta
            httpEquiv="Content-Security-Policy"
            content={`default-src 'self'; script-src 'self' 'unsafe-inline' ${UMAMI_HOST} ${CLARITY_SRC}; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://api.web3forms.com ${UMAMI_HOST} ${CLARITY_API}; base-uri 'self'; form-action 'self'; object-src 'none'; frame-ancestors 'none'`}
          />
        )}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body>
        {/* skip link - first focusable element, hidden until keyboard-focused (WCAG 2.4.1) */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-paper focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
        >
          {tNav("skip")}
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd).replace(/</g, "\\u003c") }}
        />
        {/* film grain above everything - the "printed on something" depth */}
        <div aria-hidden className="grain" />
        <NextIntlClientProvider messages={messages}>
          <ScrollProgress />
          <Telemetry />
          <Nav />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <CookieConsent
            analyticsId={site.umamiId}
            analyticsHost={UMAMI_HOST}
            clarityId={site.clarityId}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
