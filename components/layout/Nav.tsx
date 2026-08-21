"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Link, usePathname, routing } from "@/i18n/routing";
import { EASE } from "@/lib/motion";

const links = [
  { href: "/prace", key: "work" },
  { href: "/sluzby", key: "services" },
  { href: "/o-nas", key: "about" },
  { href: "/kontakt", key: "contact" },
] as const;

// CS/EN toggle. usePathname() (next-intl) returns the path without the locale
// prefix, so re-linking it with a target `locale` swaps only the prefix and
// keeps the visitor on the same page.
function LocaleSwitcher({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const active = useLocale();
  return (
    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide">
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden className="text-muted/40">/</span>}
          <Link
            href={pathname}
            locale={l}
            onClick={onNavigate}
            aria-current={l === active ? "true" : undefined}
            className={`btp-focus transition-colors ${
              l === active ? "text-paper" : "text-muted hover:text-paper"
            }`}
          >
            {l}
          </Link>
        </span>
      ))}
    </div>
  );
}

export function Nav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <motion.header
      animate={{
        backgroundColor: scrolled ? "rgba(5,5,5,0.85)" : "rgba(5,5,5,0.4)",
        borderColor: scrolled ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0)",
      }}
      transition={{ duration: 0.4, ease: EASE }}
      className="sticky top-0 z-50 border-b backdrop-blur-md"
    >
      <motion.div
        animate={{ height: scrolled ? 56 : 64 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="container-x flex items-center justify-between"
      >
        <Link href="/" className="btp-focus glitch-hover">
          <Image
            src="/logo.png"
            alt="BTP"
            width={512}
            height={512}
            className="h-8 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.key}
              href={l.href}
              className="btp-focus group relative py-1 text-sm text-muted transition-colors hover:text-paper data-[active=true]:text-paper"
              data-active={isActive(l.href)}
            >
              {t(l.key)}
              <span
                className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-fracture transition-transform duration-300 ease-out group-hover:scale-x-100 group-data-[active=true]:scale-x-100"
                aria-hidden
              />
            </Link>
          ))}
          <Link
            href="/kontakt"
            className="btp-focus btn-paper rounded px-4 py-2 text-sm font-medium"
          >
            {t("cta")}
          </Link>
          <LocaleSwitcher />
        </nav>

        <button
          className="btp-focus flex h-8 w-8 flex-col items-center justify-center md:hidden"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <motion.span
            animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="block h-px w-6 bg-paper"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="mt-1.5 block h-px w-6 bg-paper"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mt-1.5 block h-px w-6 bg-paper"
          />
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden border-t border-line bg-ink md:hidden"
          >
            <motion.div
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } }}
              initial="hidden"
              animate="show"
              className="container-x flex flex-col py-4"
            >
              {links.map((l) => (
                <motion.div
                  key={l.key}
                  variants={{
                    hidden: { opacity: 0, x: reduce ? 0 : -12 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
                  }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-lg text-paper data-[active=true]:text-accent-from"
                    data-active={isActive(l.href)}
                  >
                    {t(l.key)}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/kontakt"
                onClick={() => setOpen(false)}
                className="btn-paper mt-2 rounded px-4 py-3 text-center text-sm font-medium"
              >
                {t("cta")}
              </Link>
              <div className="mt-4 border-t border-line pt-4">
                <LocaleSwitcher onNavigate={() => setOpen(false)} />
              </div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
