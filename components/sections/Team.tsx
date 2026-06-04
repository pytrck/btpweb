import { useTranslations } from "next-intl";
import { team } from "@/content/team";
import { SectionHeader } from "./SectionHeader";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

/** Team grid. Auto-hides while founder-led; scales as people are added. */
export function Team() {
  const t = useTranslations("team");
  if (team.length === 0) return null;

  return (
    <section className="container-x pb-section">
      <SectionHeader kicker={t("kicker")} title={t("title")} />
      <Stagger className="hairgrid sm:grid-cols-2 md:grid-cols-3" stagger={0.08}>
        {team.map((m) => (
          <StaggerItem key={m.name} className="bg-ink p-8">
            <div className="aspect-square w-full border border-line bg-ink" aria-hidden>
              {m.photo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.photo} alt={m.name} className="h-full w-full object-cover grayscale" />
              )}
            </div>
            <h3 className="mt-5 font-head text-h3">{m.name}</h3>
            <p className="mt-1 text-sm text-muted">{m.role}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
