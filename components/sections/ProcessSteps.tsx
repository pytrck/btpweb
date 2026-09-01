import { useTranslations } from "next-intl";
import { SectionHeader } from "./SectionHeader";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

type Step = { t: string; d: string; note?: string };

/**
 * A real timeline: dots ride a single hairline rail (desktop), so the four steps
 * read as a sequence rather than four identical grid cells. Mobile drops the
 * rail and stacks them.
 */
export function ProcessSteps() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as Step[];
  return (
    <section className="container-x py-section">
      <SectionHeader title={t("title")} />
      <div className="relative">
        {/* the rail the nodes sit on (desktop only) */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-[9px] hidden h-px bg-gradient-to-r from-line via-line to-transparent md:block"
        />
        <Stagger className="grid gap-y-12 md:grid-cols-4 md:gap-x-8" stagger={0.09}>
          {steps.map((s) => (
            <StaggerItem key={s.t}>
              {/* node - opaque ink fill masks the rail so it connects dot-to-dot */}
              <span
                aria-hidden
                className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-line bg-ink"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent-from shadow-[0_0_8px_1px_rgba(143,2,248,0.5)]" />
              </span>
              <h3 className="mt-5 font-head text-h3">{s.t}</h3>
              <p className="mt-2 text-sm text-muted">{s.d}</p>
              {s.note && (
                <p className="mt-4 inline-block border border-line px-3 py-1 font-mono text-xs text-accent-from">
                  {s.note}
                </p>
              )}
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
