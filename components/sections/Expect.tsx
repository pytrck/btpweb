import { useTranslations } from "next-intl";
import { SectionHeader } from "./SectionHeader";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

type Item = { t: string; d: string };

export function Expect() {
  const t = useTranslations("expect");
  const items = t.raw("items") as Item[];
  return (
    <section className="container-x py-section">
      <SectionHeader kicker={t("kicker")} title={t("title")} />
      <Stagger className="hairgrid sm:grid-cols-2 md:grid-cols-4" stagger={0.08}>
        {items.map((it, i) => (
          <StaggerItem key={i} className="group bg-ink p-8">
            <h3 className="font-head text-h3">{it.t}</h3>
            <p className="mt-2 text-sm text-muted">{it.d}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
