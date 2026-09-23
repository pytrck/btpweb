import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getProjects, categories } from "@/content/work";
import { Link } from "@/i18n/routing";
import { PageHeader } from "@/components/sections/PageHeader";
import { CTABlock } from "@/components/sections/CTABlock";
import { ScrollOrb } from "@/components/ui/ScrollOrb";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { buildMeta } from "@/lib/meta";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "pages.work" });
  return buildMeta({ title: t("title"), description: t("subtitle"), path: "/prace", locale: params.locale });
}

export default async function WorkPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations("pages.work");
  const c = await getTranslations("cards");
  const projects = getProjects(params.locale);
  // Grouped by the three pillars. Categories with no case study yet are skipped
  // rather than rendered empty - promote a group to its own /prace/<category>
  // page once it holds enough work to stand on its own.
  const groups = categories
    .map((c) => ({ category: c, items: projects.filter((p) => p.category === c) }))
    .filter((g) => g.items.length > 0);
  return (
    <div className="relative">
      <ScrollOrb text="PROOF NOT HYPE" amp={46} cycles={2.6} jag={17} />
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <section className="container-x pb-section">
        {groups.length > 0 ? (
          groups.map((group) => (
            <div key={group.category} id={group.category} className="scroll-mt-24 pt-12 first:pt-0">
              <h2 className="label text-accent-from">{t(`categories.${group.category}`)}</h2>
              <Stagger className="mt-6 border-t border-line" stagger={0.1}>
                {group.items.map((p) => (
              <StaggerItem key={p.slug}>
                <Link
                  href={`/prace/${p.slug}`}
                  data-umami-event="work-click"
                  data-umami-event-slug={p.slug}
                  className="btp-focus group relative block border-b border-line py-10 md:py-14"
                >
                  {/* the seam ignites along the bottom edge on hover */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-fracture transition-transform duration-500 ease-out group-hover:scale-x-100"
                  />
                  <div className="grid items-baseline gap-x-10 gap-y-4 md:grid-cols-[1fr_auto]">
                    <div>
                      <span className="label text-accent-from">{p.tag}</span>
                      <h3 className="mt-3 font-head text-[clamp(2.25rem,5.5vw,4rem)] font-bold leading-[0.95] tracking-[-0.025em] transition-colors duration-300 group-hover:text-paper">
                        {p.title}
                      </h3>
                      <p className="mt-4 max-w-xl text-muted">{p.summary}</p>
                      {p.result && (
                        <p className="mt-4 text-sm text-paper">
                          <span className="font-mono text-xs uppercase tracking-wide text-accent-from">
                            {c("result")} -{" "}
                          </span>
                          {p.result}
                        </p>
                      )}
                    </div>
                    <span
                      aria-hidden
                      className="hidden self-center text-3xl text-accent-from transition-transform duration-300 group-hover:translate-x-2 md:block"
                    >
                      →
                    </span>
                  </div>
                </Link>
              </StaggerItem>
                ))}
              </Stagger>
            </div>
          ))
        ) : (
          <div className="border border-line p-12">
            <p className="font-head text-h3">{t("empty")}</p>
          </div>
        )}
      </section>
      <CTABlock />
    </div>
  );
}
