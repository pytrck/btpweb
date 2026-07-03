import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { site } from "@/content/site";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import "../globals.css";

const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

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
      languages: { cs: site.url, en: `${site.url}/en` },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: t("title"),
      description: t("description"),
      url,
      locale: params.locale === "en" ? "en_US" : "cs_CZ",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

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

  return (
    <html lang={locale} className={`${space.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        {/* Content-Security-Policy — GitHub Pages can't send HTTP headers, so this
            meta is the hardening ceiling. Locks every resource to same-origin
            (blocks external script/style/img/connect exfiltration). 'unsafe-inline'
            is unavoidable: a static export ships Next's inline bootstrap + framer's
            inline styles with no nonce. Production-only: dev's HMR needs eval, which
            this policy (deliberately) forbids. Real headers (HSTS, X-Frame-Options)
            need a host with a _headers file (Cloudflare/Netlify). */}
        {process.env.NODE_ENV === "production" && (
          <meta
            httpEquiv="Content-Security-Policy"
            content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; base-uri 'self'; form-action 'self'; object-src 'none'; frame-ancestors 'none'"
          />
        )}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body>
        {/* film grain above everything — the "printed on something" depth */}
        <div aria-hidden className="grain" />
        <NextIntlClientProvider messages={messages}>
          <Nav />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
