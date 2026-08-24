import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { serviceSlugs, getService } from "@/content/services";
import { buildMeta } from "@/lib/meta";
import { Button } from "@/components/ui/Button";
import { AnimatedSeam } from "@/components/ui/AnimatedSeam";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Metadata {
  const service = getService(params.locale, params.slug);
  if (!service) return {};
  return buildMeta({
    title: service.title,
    description: service.description,
    path: `/sluzby/${service.slug}`,
    locale: params.locale,
  });
}

export default async function ServiceDetail({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(params.locale);
  const service = getService(params.locale, params.slug);
  if (!service) notFound();
  const t = await getTranslations("serviceDetail");

  return (
    <>
      <section className="container-x grid grid-cols-12 gap-y-6 pb-12 pt-section">
        <p className="label col-span-12 text-paper">{service.title}</p>
        <h1 className="col-span-12 mt-4 font-head text-h1 font-bold text-balance md:col-span-11">
          {service.headline}
        </h1>
        <p className="col-span-12 text-lg text-muted md:col-span-7 md:col-start-5">
          {service.description}
        </p>
      </section>

      <AnimatedSeam />

      {/* Who it's for - a large statement - beside the proof points. */}
      <section className="container-x grid gap-x-16 gap-y-10 py-section md:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="label text-paper">{t("forWhom")}</p>
          <p className="mt-4 font-head text-h3 leading-snug text-balance">{service.forWhom}</p>
        </div>
        <div>
          <p className="label">{t("proof")}</p>
          <ul className="mt-5 space-y-3">
            {service.proof.map((p) => (
              <li key={p} className="flex gap-3 text-muted">
                <span aria-hidden className="text-accent-from">-</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What's included (loud) vs. what we typically fix (quieter aside). */}
      <section className="container-x grid gap-x-16 gap-y-12 pb-section md:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="label text-paper">{t("included")}</p>
          <ul className="mt-6 space-y-4 text-lg">
            {service.included.map((it) => (
              <li key={it} className="flex gap-3">
                <span aria-hidden className="mt-1 text-accent-from">+</span>
                {it}
              </li>
            ))}
          </ul>
        </div>
        <div className="md:border-l md:border-line md:pl-10">
          <p className="label">{t("solves")}</p>
          <ul className="mt-6 space-y-3 text-sm text-muted">
            {service.solves.map((it) => (
              <li key={it} className="flex gap-3">
                <span aria-hidden>-</span>
                {it}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Turnaround + deliverable - vapor-rule labels, no boxes. */}
      <section className="container-x grid gap-x-16 gap-y-10 pb-section md:grid-cols-2">
        <div>
          <p className="label">{t("turnaround")}</p>
          <span aria-hidden className="mt-3 block h-px w-8 bg-fracture" />
          <p className="mt-4 text-lg">{service.turnaround}</p>
        </div>
        <div>
          <p className="label">{t("deliverable")}</p>
          <span aria-hidden className="mt-3 block h-px w-8 bg-fracture" />
          <p className="mt-4 text-lg">{service.deliverable}</p>
        </div>
      </section>

      <section className="container-x pb-section">
        <div className="border border-line p-12">
          <h2 className="font-head text-h2 font-bold">{service.cta}</h2>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button href="/kontakt">{service.cta}</Button>
            <Button href="/prace" variant="ghost">
              {t("seeWork")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
