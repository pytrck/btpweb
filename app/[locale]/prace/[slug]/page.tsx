import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { projects, getProject } from "@/content/work";
import { buildMeta } from "@/lib/meta";
import { Button } from "@/components/ui/Button";
import { AnimatedSeam } from "@/components/ui/AnimatedSeam";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return buildMeta({
    title: project.title,
    description: project.summary,
    path: `/prace/${project.slug}`,
    locale: params.locale,
  });
}

const blocks = (p: ReturnType<typeof getProject>) =>
  p
    ? [
        { t: "Zadání", d: p.overview },
        { t: "Naše role", d: p.role },
        { t: "Problém", d: p.challenge },
        { t: "Řešení", d: p.approach },
        { t: "Výsledek", d: p.result },
        { t: "Dopad", d: p.impact },
      ]
    : [];

export default function CaseStudy({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(params.locale);
  const project = getProject(params.slug);
  if (!project) notFound();

  return (
    <>
      <section className="container-x grid grid-cols-12 gap-y-6 pb-12 pt-section">
        <p className="label col-span-12">{project.tag}</p>
        <h1 className="col-span-12 mt-4 font-head text-h1 font-bold md:col-span-11">
          {project.title}
        </h1>
        <p className="col-span-12 text-lg text-muted md:col-span-7 md:col-start-5">
          {project.summary}
        </p>
      </section>

      <AnimatedSeam />

      <section className="container-x pb-4">
        <div className="hairgrid sm:grid-cols-3">
          {project.metrics.map((m) => (
            <div key={m.l} className="bg-ink px-6 py-10">
              <p className="font-head text-h2 font-bold">{m.v}</p>
              <p className="mt-2 text-sm text-muted">{m.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x grid gap-12 py-section md:grid-cols-2">
        {blocks(project).map((b) => (
          <div key={b.t}>
            <p className="label">{b.t}</p>
            <p className="mt-4 text-lg">{b.d}</p>
          </div>
        ))}
        <div className="md:col-span-2">
          <p className="label">Technologie</p>
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
          <h2 className="font-head text-h2 font-bold">Chcete něco podobného?</h2>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button href="/kontakt">Začít projekt</Button>
            <Button href="/prace" variant="ghost">
              Zpět na práci
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
