import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { buildMeta } from "@/lib/meta";
import { PageHeader } from "@/components/sections/PageHeader";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

type Section = { t: string; p: string[]; links?: { label: string; href: string }[] };

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "pages.privacy" });
  return buildMeta({ title: t("title"), description: t("subtitle"), path: "/soukromi", locale: params.locale });
}

/**
 * Privacy policy (GDPR art. 13 disclosures). Deliberately quiet: no orb, no
 * closing CTA - a legal page shouldn't sell. The copy lives in messages/*.json
 * as plain paragraphs plus optional outbound links per section; the facts about
 * processors (Web3Forms, Umami, GitHub) were checked against their own
 * published statements when written - re-check them if a provider changes.
 */
export default async function PrivacyPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations("pages.privacy");
  const sections = t.raw("sections") as Section[];

  return (
    <div className="relative">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <section className="container-x pb-section">
        <p className="label text-accent-from">{t("updated")}</p>
        <Stagger className="mt-8 max-w-3xl" stagger={0.06}>
          {sections.map((s) => (
            <StaggerItem key={s.t} className="border-t border-line py-10">
              <h2 className="font-head text-h3">{s.t}</h2>
              <span aria-hidden className="mt-3 block h-px w-8 bg-fracture" />
              {s.p.map((para, i) => (
                <p key={i} className="mt-4 text-muted">
                  {para}
                </p>
              ))}
              {s.links?.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btp-focus mt-4 inline-flex items-center gap-2 text-sm font-medium text-paper"
                >
                  {l.label}
                  <span aria-hidden className="text-accent-from">→</span>
                </a>
              ))}
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </div>
  );
}
