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
  const dash = String.fromCharCode(0x2014);

  return (
    <div className="relative">
      <ScrollOrb text="NO EXCUSES" amp={30} cycles={1.4} jag={11} anchor={0.46} />
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      {/* Narrative blocks in a 2-col grid, but the closing block breaks the
          rhythm: it spans full width and speaks louder - the pattern breaking
          on the final beat, which is the whole point of the name. */}
      <section className="container-x pb-section">
        <Stagger className="hairgrid md:grid-cols-2" stagger={0.1}>
          {blocks.map((b, i) => {
            const last = i === blocks.length - 1;
            return (
              <StaggerItem
                key={b.t}
                className={`bg-ink p-10 ${last ? "md:col-span-2 md:p-14" : ""}`}
              >
                <h2 className={last ? "font-head text-h2 font-bold text-balance" : "font-head text-h3"}>
                  {b.t}
                </h2>
                <span aria-hidden className="mt-3 block h-px w-8 bg-fracture" />
                <p className={`mt-3 text-muted ${last ? "text-lg md:max-w-2xl" : ""}`}>{b.d}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      <section className="container-x pb-section">
        <SectionHeader title={t("statsTitle")} />
        <Stagger className="hairgrid sm:grid-cols-3" stagger={0.1}>
          {stats.map((s, i) => (
            <StaggerItem key={i} effect="scale" className="bg-ink px-6 py-12">
              <p className="font-head text-h2 font-bold">{s.v}</p>
              <p className="mt-2 text-sm text-muted">{s.l}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Capabilities - a plain ruled list, not a grid. */}
      <section className="container-x pb-section">
        <SectionHeader title={t("capsTitle")} />
        <Stagger className="grid gap-x-12 sm:grid-cols-2" stagger={0.06}>
          {capabilities.map((c, i) => (
            <StaggerItem
              key={i}
              className="group flex items-center gap-4 border-b border-line py-4"
            >
              <span aria-hidden className="text-accent-from">{dash}</span>
              <span className="text-muted transition-colors duration-300 group-hover:text-paper">
                {c}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="container-x pb-section">
        <SectionHeader title={t("standardsTitle")} />
        <Stagger className="hairgrid md:grid-cols-3" stagger={0.1}>
          {standards.map((s) => (
            <StaggerItem key={s.t} className="bg-ink p-10">
              <h3 className="font-head text-h3">{s.t}</h3>
              <span aria-hidden className="mt-3 block h-px w-8 bg-fracture" />
              <p className="mt-3 text-muted">{s.d}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <p className="label mt-16 text-accent-from">{t("refuseTitle")}</p>
        <Stagger className="mt-6 grid gap-x-12 sm:grid-cols-2" stagger={0.06}>
          {refuse.map((r, i) => (
            <StaggerItem
              key={i}
              className="flex items-center gap-4 border-b border-line py-4 text-muted"
            >
              <span aria-hidden className="font-mono text-accent-from">×</span>
              {r}
            </StaggerItem>
          ))}
        </Stagger>

        {/* "Where we're heading" - headed block, replacing the old accent side-stripe. */}
        <div className="mt-16 max-w-2xl">
          <p className="label text-accent-from">{t("futureTitle")}</p>
          <p className="mt-4 text-lg text-muted">{t("future")}</p>
        </div>
      </section>

      {/* Auto-hidden until team members are added in content/team.ts */}
      <Team />

      <CTABlock />
    </div>
  );
}
