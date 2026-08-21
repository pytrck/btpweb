import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { services, getService } from "@/content/services";
import { buildMeta } from "@/lib/meta";
import { Button } from "@/components/ui/Button";
import { AnimatedSeam } from "@/components/ui/AnimatedSeam";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Metadata {
  const service = getService(params.slug);
  if (!service) return {};
  return buildMeta({
    title: service.title,
    description: service.description,
    path: `/sluzby/${service.slug}`,
    locale: params.locale,
  });
}

export default function ServiceDetail({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(params.locale);
  const service = getService(params.slug);
  if (!service) notFound();

  return (
    <>
      <section className="container-x grid grid-cols-12 gap-y-6 pb-12 pt-section">
        <p className="label col-span-12">{service.title}</p>
        <h1 className="col-span-12 mt-4 font-head text-h1 font-bold md:col-span-11">
          {service.headline}
        </h1>
        <p className="col-span-12 text-lg text-muted md:col-span-7 md:col-start-5">
          {service.description}
        </p>
      </section>

      <AnimatedSeam />

      <section className="container-x grid gap-12 py-section md:grid-cols-2">
        <div>
          <p className="label">Pro koho</p>
          <p className="mt-4 text-lg">{service.forWhom}</p>
        </div>
        <div>
          <p className="label">Proč nám věřit</p>
          <ul className="mt-4 space-y-3">
            {service.proof.map((p) => (
              <li key={p} className="flex gap-3 text-muted">
                <span className="text-accent-from">-</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x hairgrid pb-section md:grid-cols-2">
        <div className="bg-ink p-10">
          <p className="label text-accent-from">Co je v ceně</p>
          <ul className="mt-6 space-y-4">
            {service.included.map((it) => (
              <li key={it} className="flex gap-3">
                <span className="text-accent-from">-</span>
                {it}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-ink p-10">
          <p className="label text-accent-from">Typicky řešíme</p>
          <ul className="mt-6 space-y-4 text-muted">
            {service.solves.map((it) => (
              <li key={it} className="flex gap-3">
                <span className="text-accent-from">-</span>
                {it}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x hairgrid pb-section md:grid-cols-2">
        <div className="bg-ink p-10">
          <p className="label">Termín</p>
          <p className="mt-4 text-lg">{service.turnaround}</p>
        </div>
        <div className="bg-ink p-10">
          <p className="label">Co dostanete</p>
          <p className="mt-4 text-lg">{service.deliverable}</p>
        </div>
      </section>

      <section className="container-x pb-section">
        <div className="border border-line p-12">
          <h2 className="font-head text-h2 font-bold">{service.cta}</h2>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button href="/kontakt">{service.cta}</Button>
            <Button href="/prace" variant="ghost">
              Ukázat práci
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
