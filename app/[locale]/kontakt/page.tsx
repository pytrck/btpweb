import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { buildMeta } from "@/lib/meta";
import { PageHeader } from "@/components/sections/PageHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { ScrollOrb } from "@/components/ui/ScrollOrb";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "pages.contact" });
  return buildMeta({ title: t("title"), description: t("subtitle"), path: "/kontakt", locale: params.locale });
}

export default async function ContactPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations("pages.contact");
  const help = t.raw("helpItems") as string[];
  const channels = t.raw("channels") as { label: string; value: string }[];
  const checklist = t.raw("checklist") as string[];
  const after = t.raw("after") as { n: string; t: string; d: string }[];
  const guarantees = t.raw("guarantees") as { t: string; d: string }[];
  return (
    <div className="relative">
      <ScrollOrb text="LET'S BREAK IT" amp={42} cycles={2.1} jag={21} />
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <section className="container-x pb-section">
        <p className="label text-accent-from">{t("guaranteesTitle")}</p>
        <div className="mt-6 hairgrid md:grid-cols-3">
          {guarantees.map((g) => (
            <div key={g.t} className="bg-ink p-8">
              <h3 className="font-head text-h3">{g.t}</h3>
              <p className="mt-2 text-sm text-muted">{g.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x grid gap-12 pb-section md:grid-cols-2">
        <div>
          <p className="label text-accent-from">{t("help")}</p>
          <ul className="mt-4 space-y-3">
            {help.map((h) => (
              <li key={h} className="flex gap-3 text-lg">
                <span className="text-accent-from">-</span>
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-10 border-t border-line pt-8">
            <p className="label">{t("channelsTitle")}</p>
            <dl className="mt-4 space-y-3">
              {channels.map((c) => (
                <div key={c.label} className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                  <dt className="text-muted">{c.label}</dt>
                  <dd className="font-mono text-sm">{c.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-8">
            <p className="label">{t("checklistTitle")}</p>
            <ul className="mt-4 space-y-2">
              {checklist.map((c) => (
                <li key={c} className="flex gap-3 text-sm text-muted">
                  <span className="text-accent-from">-</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-10 max-w-sm text-muted">{t("response")}</p>
        </div>
        <ContactForm />
      </section>

      <section className="container-x pb-section">
        <p className="label text-accent-from">{t("afterTitle")}</p>
        <div className="mt-6 hairgrid md:grid-cols-3">
          {after.map((a) => (
            <div key={a.n} className="bg-ink p-8">
              <span className="font-mono text-2xl text-muted">{a.n}</span>
              <h3 className="mt-4 font-head text-h3">{a.t}</h3>
              <p className="mt-2 text-sm text-muted">{a.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 border-l-2 border-accent-from pl-6 text-lg">{t("reassurance")}</p>
        <div className="mt-10 border-t border-line pt-6">
          <p className="label">{t("areaTitle")}</p>
          <p className="mt-3 max-w-xl text-muted">{t("area")}</p>
        </div>
      </section>
    </div>
  );
}
