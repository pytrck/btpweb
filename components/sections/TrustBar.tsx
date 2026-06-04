import { useTranslations } from "next-intl";

export function TrustBar() {
  const t = useTranslations("trust");
  const items = [t("reply"), t("warranty"), t("diag")];
  return (
    <section className="border-y border-line">
      <div className="container-x hairgrid md:grid-cols-3">
        {items.map((item) => (
          <div key={item} className="bg-ink px-6 py-8 text-center">
            <p className="font-head text-sm tracking-wide">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
