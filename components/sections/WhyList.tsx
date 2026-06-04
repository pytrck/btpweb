import { useTranslations } from "next-intl";
import { SectionHeader } from "./SectionHeader";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

type Item = { n: string; t: string; d: string };

export function WhyList() {
  const t = useTranslations("why");
  const items = t.raw("items") as Item[];
  return (
    <section className="container-x py-section">
      <SectionHeader kicker={t("kicker")} title={t("title")} />
      <Stagger className="grid gap-12 md:grid-cols-3" stagger={0.1}>
        {items.map((it) => (
          <StaggerItem key={it.n}>
            <span className="font-mono text-sm text-accent-from">{it.n}</span>
            <h3 className="mt-3 font-head text-h3">{it.t}</h3>
            <p className="mt-2 text-muted">{it.d}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
