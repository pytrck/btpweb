import { useTranslations } from "next-intl";
import { testimonials } from "@/content/proof";
import { SectionHeader } from "./SectionHeader";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

/** References / testimonials. Auto-hides while empty; scales to a grid later. */
export function Testimonials() {
  const t = useTranslations("proof");
  if (testimonials.length === 0) return null;

  return (
    <section className="container-x py-section">
      <SectionHeader kicker={t("testimonialsKicker")} title={t("testimonialsTitle")} />
      <Stagger className="hairgrid md:grid-cols-2" stagger={0.1}>
        {testimonials.map((item, i) => (
          <StaggerItem key={i} className="bg-ink p-10">
            <p className="text-lg leading-relaxed">
              <span className="mr-1 font-head text-accent-from">“</span>
              {item.quote}
            </p>
            <p className="mt-6 font-head">{item.author}</p>
            {item.role && <p className="text-sm text-muted">{item.role}</p>}
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
