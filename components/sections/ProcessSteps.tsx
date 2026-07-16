import { useTranslations } from "next-intl";
import { SectionHeader } from "./SectionHeader";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

type Step = { t: string; d: string; note?: string };

export function ProcessSteps() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as Step[];
  return (
    <section className="container-x py-section">
      <SectionHeader kicker={t("kicker")} title={t("title")} />
      <Stagger className="hairgrid md:grid-cols-4" stagger={0.09}>
        {steps.map((s) => (
          <StaggerItem key={s.t} className="group bg-ink p-8">
            <h3 className="font-head text-h3">{s.t}</h3>
            <p className="mt-2 text-sm text-muted">{s.d}</p>
            {s.note && (
              <p className="mt-4 inline-block border border-line px-3 py-1 font-mono text-xs text-accent-from">
                {s.note}
              </p>
            )}
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
