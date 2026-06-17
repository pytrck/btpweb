import { useTranslations } from "next-intl";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { Counter } from "@/components/ui/Counter";

type Stat = { v: string; l: string };

export function StatsBand() {
  const t = useTranslations("stats");
  const items = t.raw("items") as Stat[];
  return (
    <section className="border-y border-line">
      <Stagger
        className="container-x hairgrid sm:grid-cols-2 md:grid-cols-4"
        stagger={0.1}
      >
        {items.map((s, i) => (
          <StaggerItem key={i} effect="scale" className="bg-ink px-6 py-12">
            <p className="font-head text-h2 font-bold">
              <Counter value={s.v} />
            </p>
            <p className="mt-2 text-sm text-muted">{s.l}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
