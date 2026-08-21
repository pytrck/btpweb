import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { buildMeta } from "@/lib/meta";
import { PageHeader } from "@/components/sections/PageHeader";
import { CTABlock } from "@/components/sections/CTABlock";
import { ScrollOrb } from "@/components/ui/ScrollOrb";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Team } from "@/components/sections/Team";

type Block = { t: string; d: string };
type Stat = { v: string; l: string };

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "pages.about" });
  return buildMeta({ title: t("title"), description: t("subtitle"), path: "/o-nas", locale: params.locale });
}

export default async function AboutPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations("pages.about");
  const blocks = t.raw("blocks") as Block[];
  const capabilities = t.raw("capabilities") as string[];
  const stats = t.raw("stats") as Stat[];
  const standards = t.raw("standards") as Block[];
  const refuse = t.raw("refuse") as string[];
  return (
    <div className="relative">
      <ScrollOrb text="NO EXCUSES" amp={30} cycles={1.4} jag={11} anchor={0.46} />
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <section className="container-x pb-section">
        <Stagger className="hairgrid md:grid-cols-2" stagger={0.1}>
          {blocks.map((b) => (
            <StaggerItem key={b.t} className="bg-ink p-10">
              <h2 className="font-head text-h3">{b.t}</h2>
              <p className="mt-3 text-muted">{b.d}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="container-x pb-section">
        <SectionHeader kicker={t("capsTitle")} title={t("statsTitle")} />
        <Stagger className="hairgrid sm:grid-cols-3" stagger={0.1}>
          {stats.map((s, i) => (
            <StaggerItem key={i} effect="scale" className="bg-ink px-6 py-12">
              <p className="font-head text-h2 font-bold">{s.v}</p>
              <p className="mt-2 text-sm text-muted">{s.l}</p>
            </StaggerItem>
          ))}
        </Stagger>
        <Stagger className="-mt-px hairgrid sm:grid-cols-2 md:grid-cols-3" stagger={0.06}>
          {capabilities.map((c, i) => (
            <StaggerItem key={i} className="group flex items-center gap-4 bg-ink p-6">
              <span className="text-accent-from">{String.fromCharCode(0x2014)}</span>
              <span className="text-muted transition-colors duration-300 group-hover:text-paper">
                {c}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="container-x pb-section">
        <SectionHeader kicker={t("standardsTitle")} title={t("futureTitle")} />
        <Stagger className="hairgrid md:grid-cols-3" stagger={0.1}>
          {standards.map((s) => (
            <StaggerItem key={s.t} className="bg-ink p-10">
              <h3 className="font-head text-h3">{s.t}</h3>
              <p className="mt-3 text-muted">{s.d}</p>
            </StaggerItem>
          ))}
        </Stagger>
        <p className="label mt-16 text-accent-from">{t("refuseTitle")}</p>
        <Stagger className="mt-6 hairgrid sm:grid-cols-2" stagger={0.06}>
          {refuse.map((r, i) => (
            <StaggerItem key={i} className="flex items-center gap-4 bg-ink p-6">
              <span className="font-mono text-accent-from">×</span>
              <span className="text-muted">{r}</span>
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-10 max-w-2xl border-l-2 border-accent-from pl-6 text-lg text-muted">
          {t("future")}
        </p>
      </section>

      {/* Auto-hidden until team members are added in content/team.ts */}
      <Team />

      <CTABlock />
    </div>
  );
}
