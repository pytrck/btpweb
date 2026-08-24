import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { projectSlugs, getProject } from "@/content/work";
import { buildMeta } from "@/lib/meta";
import { Button } from "@/components/ui/Button";
import { AnimatedSeam } from "@/components/ui/AnimatedSeam";

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Metadata {
  const project = getProject(params.locale, params.slug);
  if (!project) return {};
  return buildMeta({
    title: project.title,
    description: project.summary,
    path: `/prace/${project.slug}`,
    locale: params.locale,
  });
}

export default async function CaseStudy({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(params.locale);
  const project = getProject(params.locale, params.slug);
  if (!project) notFound();
  const t = await getTranslations("caseStudy");

  // Brief → approach set up the story; result + impact are the payoff, pulled
  // out below at a larger scale.
  const story = [
    { t: t("brief"), d: project.overview },
    { t: t("role"), d: project.role },
    { t: t("problem"), d: project.challenge },
    { t: t("approach"), d: project.approach },
  ];

  return (
    <>
      <section className="container-x grid grid-cols-12 gap-y-6 pb-12 pt-section">
        <p className="label col-span-12 text-paper">{project.tag}</p>
        <h1 className="col-span-12 mt-4 font-head text-h1 font-bold text-balance md:col-span-11">
          {project.title}
        </h1>
        <p className="col-span-12 text-lg text-muted md:col-span-7 md:col-start-5">
          {project.summary}
        </p>
      </section>

      <AnimatedSeam />

      {/* Metrics as oversized editorial figures, not boxed cells. */}
      <section className="container-x py-section">
        <div className="grid gap-y-10 sm:grid-cols-3 sm:gap-x-12">
          {project.metrics.map((m) => (
            <div key={m.l}>
              <p className="font-head text-[clamp(2.75rem,6vw,4.5rem)] font-bold leading-[0.9]">
                {m.v}
              </p>
              <span aria-hidden className="mt-4 block h-px w-8 bg-fracture" />
              <p className="mt-4 text-sm text-muted">{m.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The story: brief → approach. */}
      <section className="container-x grid gap-x-16 gap-y-12 pb-section md:grid-cols-2">
        {story.map((b) => (
          <div key={b.t}>
            <p className="label text-paper">{b.t}</p>
            <p className="mt-4 text-lg">{b.d}</p>
          </div>
        ))}
      </section>

      {/* The payoff: result + impact, at a larger scale. */}
      <section className="container-x pb-section">
        <div className="border-t border-line pt-12 md:grid md:grid-cols-[1fr_1.3fr] md:gap-x-16">
          <div>
            <p className="label text-paper">{t("result")}</p>
            <p className="mt-4 font-head text-h2 font-bold leading-tight text-balance">
              {project.result}
            </p>
          </div>
          <div className="mt-8 md:mt-0">
            <p className="label">{t("impact")}</p>
            <p className="mt-4 text-lg text-muted">{project.impact}</p>
          </div>
        </div>

        <div className="mt-16">
          <p className="label">{t("tech")}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {project.stack.map((s) => (
              <span key={s} className="border border-line px-4 py-2 font-mono text-sm text-muted">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x pb-section">
        <div className="border border-line p-12">
          <h2 className="font-head text-h2 font-bold">{t("similar")}</h2>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button href="/kontakt">{t("start")}</Button>
            <Button href="/prace" variant="ghost">
              {t("back")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
