import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { socialLinks } from "@/content/site";

const links = [
  { href: "/prace", key: "work" },
  { href: "/sluzby", key: "services" },
  { href: "/o-nas", key: "about" },
  { href: "/kontakt", key: "contact" },
] as const;

export function Footer() {
  const t = useTranslations("nav");
  const f = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col gap-8 py-section md:flex-row md:items-end md:justify-between">
        <div>
          <Link href="/" className="btp-focus font-head text-2xl font-bold">
            Break The Pattern<span className="text-accent-from">.</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted">{f("tagline")}</p>
        </div>
        <div className="flex flex-col gap-6 md:items-end">
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((l) => (
              <Link key={l.key} href={l.href} className="text-sm text-muted hover:text-paper">
                {t(l.key)}
              </Link>
            ))}
          </nav>
          {socialLinks.length > 0 && (
            <nav className="flex flex-wrap gap-x-6 gap-y-3">
              {socialLinks.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btp-focus font-mono text-xs uppercase tracking-wide text-muted hover:text-paper"
                >
                  {s.key}
                </a>
              ))}
            </nav>
          )}
        </div>
      </div>
      <div className="seam" />
      <div className="container-x py-6 text-xs text-muted">
        © {year} Break The Pattern. {f("rights")}
      </div>
      {/* ghost wordmark sinking below the page edge - the brand, outlined,
          cropped mid-glyph. Decorative only. */}
      <div aria-hidden className="pointer-events-none relative h-[7vw] select-none overflow-hidden">
        <p
          className="absolute inset-x-0 top-0 whitespace-nowrap text-center font-head text-[10.5vw] font-bold leading-[0.8] tracking-[-0.02em] text-transparent"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.08)" }}
        >
          Break The Pattern
        </p>
      </div>
    </footer>
  );
}
