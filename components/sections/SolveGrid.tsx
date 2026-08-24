import { useTranslations } from "next-intl";
import { SectionHeader } from "./SectionHeader";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

export function SolveGrid() {
  const t = useTranslations("solve");
  const items = t.raw("items") as string[];
  return (
    <section className="container-x py-section">
      <SectionHeader title={t("title")} />
      <Stagger className="hairgrid sm:grid-cols-2 md:grid-cols-3" stagger={0.06}>
        {items.map((it, i) => (
          <StaggerItem
            key={i}
            className="group flex items-center gap-4 bg-ink p-6 transition-colors hover:bg-ink"
          >
            <span className="text-accent-from">{String.fromCharCode(0x2014)}</span>
            <span className="text-muted transition-colors duration-300 group-hover:text-paper">
              {it}
            </span>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
