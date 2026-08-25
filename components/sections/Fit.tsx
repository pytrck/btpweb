import { useTranslations } from "next-intl";
import { SectionHeader } from "./SectionHeader";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

export function Fit() {
  const t = useTranslations("fit");
  const forItems = t.raw("for") as string[];
  const notItems = t.raw("not") as string[];

  return (
    <section className="container-x py-section">
      <SectionHeader title={t("title")} />
      {/* Asymmetric fit: the match is the loud column; the "not for you" is a
          quieter aside - the honesty is deliberate, not a symmetric checklist. */}
      <Stagger className="grid gap-y-12 md:grid-cols-[1.4fr_1fr] md:gap-x-16" stagger={0.12}>
        <StaggerItem>
          <p className="label text-accent-from">{t("forTitle")}</p>
          <ul className="mt-6 space-y-4 text-lg">
            {forItems.map((it) => (
              <li key={it} className="flex gap-3">
                <span aria-hidden className="mt-1 text-accent-from">+</span>
                {it}
              </li>
            ))}
          </ul>
        </StaggerItem>
        <StaggerItem>
          <div className="md:border-l md:border-line md:pl-10">
            <p className="label">{t("notTitle")}</p>
            <ul className="mt-6 space-y-3 text-sm text-muted">
              {notItems.map((it) => (
                <li key={it} className="flex gap-3">
                  <span aria-hidden className="mt-px">×</span>
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </StaggerItem>
      </Stagger>
    </section>
  );
}
