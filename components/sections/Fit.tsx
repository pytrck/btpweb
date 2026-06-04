import { useTranslations } from "next-intl";
import { SectionHeader } from "./SectionHeader";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

export function Fit() {
  const t = useTranslations("fit");
  const forItems = t.raw("for") as string[];
  const notItems = t.raw("not") as string[];

  return (
    <section className="container-x py-section">
      <SectionHeader kicker={t("kicker")} title={t("title")} />
      <Stagger className="hairgrid md:grid-cols-2" stagger={0.1}>
        <StaggerItem className="bg-ink p-10">
          <p className="label text-accent-from">{t("forTitle")}</p>
          <ul className="mt-6 space-y-4">
            {forItems.map((it) => (
              <li key={it} className="flex gap-3">
                <span className="text-accent-from">+</span>
                {it}
              </li>
            ))}
          </ul>
        </StaggerItem>
        <StaggerItem className="bg-ink p-10">
          <p className="label">{t("notTitle")}</p>
          <ul className="mt-6 space-y-4 text-muted">
            {notItems.map((it) => (
              <li key={it} className="flex gap-3">
                <span className="text-muted">—</span>
                {it}
              </li>
            ))}
          </ul>
        </StaggerItem>
      </Stagger>
    </section>
  );
}
