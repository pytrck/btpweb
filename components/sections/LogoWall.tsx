import { useTranslations } from "next-intl";
import { clientLogos } from "@/content/proof";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

/**
 * Client / partner logo belt. Auto-hides while there are no logos.
 * When populated: monochrome marks on the ink surface, fixed row height for a
 * tidy baseline regardless of source aspect ratio, vapor on hover.
 */
export function LogoWall() {
  const t = useTranslations("proof");
  if (clientLogos.length === 0) return null;

  return (
    <section className="border-y border-line">
      <div className="container-x py-12">
        <p className="label mb-8 text-center text-paper">{t("logosKicker")}</p>
        <Stagger
          className="grid grid-cols-2 items-center gap-x-10 gap-y-8 sm:grid-cols-3 md:grid-cols-5"
          stagger={0.06}
        >
          {clientLogos.map((logo) => {
            const img = (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logo.src}
                alt={logo.name}
                className="mx-auto h-7 w-auto max-w-[140px] object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 md:h-8"
              />
            );
            return (
              <StaggerItem key={logo.name} className="flex items-center justify-center">
                {logo.href ? (
                  <a href={logo.href} target="_blank" rel="noopener noreferrer" className="btp-focus">
                    {img}
                  </a>
                ) : (
                  img
                )}
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
