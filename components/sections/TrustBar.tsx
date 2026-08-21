import { useTranslations } from "next-intl";

export function TrustBar() {
  const t = useTranslations("trust");
  const items = [t("reply"), t("warranty"), t("diag")];
  return (
    <section className="border-y border-line bg-ink/60">
      <div className="container-x hairgrid md:grid-cols-3 [background-color:transparent]">
        {items.map((item) => (
          <div key={item} className="flex items-center justify-center gap-3 px-6 py-8">
            <span
              aria-hidden
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-from shadow-[0_0_10px_2px_rgba(143,2,248,0.35)]"
            />
            <p className="font-head text-sm tracking-wide">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
