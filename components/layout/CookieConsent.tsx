"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const STORAGE_KEY = "btp-consent-v1";
// Kept local rather than imported from content/site so this component stays a
// leaf the consent check script can run standalone. Both hosts are listed: if
// www ever serves directly instead of redirecting to the apex, a single-host
// filter would silently drop every beacon from those visitors.
const SITE_HOSTS = "breakthepattern.cz,www.breakthepattern.cz";
const MAX_AGE = 180 * 24 * 60 * 60 * 1000;

// Clarity's own snippet defines window.clarity as a command queue before the
// tag finishes downloading, so the consent signal can be sent immediately.
type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[][] };
type ClarityWindow = Window & { clarity?: ClarityFn };

const copy = {
  en: {
    label: "Cookies & privacy", first: "Your data.", second: "Your rules.",
    body: "We break patterns. Your privacy stays intact. You decide whether anonymous analytics can help us make this site better.",
    accept: "Allow analytics", reject: "Only necessary", details: "What’s under the hood?",
    necessary: "Necessary", necessaryBody: "Remembers your privacy choice in this browser for 6 months. Always on.",
    analytics: "Analytics", analyticsBody: "Umami measures page visits and interactions without cookies. Microsoft Clarity additionally records anonymous sessions and builds click heatmaps, and that one does use cookies. Form fields are masked. Both run only with your permission.",
    inactive: "Analytics is currently unconfigured. Nothing is sent; your preference is saved for when it is enabled.",
    foot: "No ads. No pre-ticked boxes.", settings: "Cookie settings", close: "Close settings",
    policy: "Full privacy policy",
    error: "Your browser blocked saving this choice. Analytics stays off. You can still choose ‘Only necessary’.",
  },
  cs: {
    label: "Cookies a soukromí", first: "Tvoje data.", second: "Tvoje pravidla.",
    body: "Boříme vzorce. Ne tvoje soukromí. Ty rozhoduješ, jestli nám anonymní analytika pomůže vylepšovat web.",
    accept: "Povolit analytiku", reject: "Jen nezbytné", details: "Co je pod kapotou?",
    necessary: "Nezbytné", necessaryBody: "Pamatuje si tvoji volbu v tomto prohlížeči po dobu 6 měsíců. Vždy zapnuto.",
    analytics: "Analytika", analyticsBody: "Umami měří návštěvy stránek a interakce bez cookies. Microsoft Clarity navíc nahrává anonymní relace a dělá z nich teplotní mapy kliknutí - ten už cookies používá. Obsah formulářů je maskovaný. Obojí se spustí jen s tvým svolením.",
    inactive: "Analytika zatím není nastavená. Nic se neodesílá; tvoji volbu uložíme pro její případné zapnutí.",
    foot: "Bez reklam. Bez předem zaškrtnutých polí.", settings: "Nastavení cookies", close: "Zavřít nastavení",
    policy: "Celé zásady ochrany soukromí",
    error: "Prohlížeč nepovolil uložit volbu. Analytika zůstává vypnutá. Stále můžeš zvolit „Jen nezbytné“.",
  },
};

export function readConsent(): boolean | null {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (saved && typeof saved.analytics === "boolean" && typeof saved.at === "number"
      && saved.at <= Date.now() && Date.now() - saved.at < MAX_AGE) return saved.analytics;
  } catch { /* Unavailable or corrupt storage means no permission. */ }
  return null;
}

export function CookieConsent({
  analyticsId,
  analyticsHost,
  clarityId,
}: {
  analyticsId: string;
  analyticsHost: string;
  clarityId: string;
}) {
  const locale = useLocale() === "en" ? "en" : "cs";
  const t = copy[locale];
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [consent, setConsent] = useState<boolean | null>(null);
  const [details, setDetails] = useState(false);
  const [error, setError] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  const tracker = useRef<HTMLScriptElement | null>(null);
  const clarityTag = useRef<HTMLScriptElement | null>(null);
  const reopened = useRef(false);

  useEffect(() => {
    const saved = readConsent();
    setConsent(saved);
    setOpen(saved === null);
    const sync = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY && event.key !== null) return;
      // Reload also tears down the tracker's history and event listeners.
      if (tracker.current && readConsent() !== true) window.location.reload();
      else {
        const next = readConsent();
        setConsent(next);
        setOpen(next === null);
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  useEffect(() => {
    if (consent !== true || !analyticsId || !analyticsHost || tracker.current) return;
    const script = document.createElement("script");
    script.src = `${analyticsHost}/script.js`;
    script.defer = true;
    script.dataset.websiteId = analyticsId;
    // Pin the ingest endpoint to the same origin the script came from. Without
    // this the tracker posts to its built-in default (gateway.umami.is), which
    // our connect-src does not allow - every beacon would be dropped by CSP and
    // the dashboard would stay empty with no visible error.
    script.dataset.hostUrl = analyticsHost;
    // Core Web Vitals (LCP/CLS/INP). Opt-in in the tracker; costs nothing extra.
    script.dataset.performance = "true";
    // Only report from the real site, so `next dev` and preview builds can't
    // pollute production numbers.
    script.dataset.domains = SITE_HOSTS;
    tracker.current = script;
    document.head.appendChild(script);

    // Microsoft Clarity: session recordings + heatmaps. Unlike Umami this sets
    // cookies, so it runs only here, after an explicit yes. Host-gated for the
    // same reason as Umami's data-domains - Clarity has no equivalent option.
    if (!clarityId || !SITE_HOSTS.split(",").includes(window.location.hostname)) return;
    const w = window as ClarityWindow;
    const queue: ClarityFn =
      w.clarity ??
      (((...args: unknown[]) => {
        (queue.q = queue.q ?? []).push(args);
      }) as ClarityFn);
    w.clarity = queue;
    const clarity = document.createElement("script");
    clarity.async = true;
    clarity.src = `https://www.clarity.ms/tag/${clarityId}`;
    clarityTag.current = clarity;
    document.head.appendChild(clarity);
    // One toggle on this site, and no advertising on it: grant analytics
    // storage, deny ad storage so Microsoft's advertising cookies stay out.
    queue("consentv2", { ad_Storage: "denied", analytics_Storage: "granted" });

  }, [consent, analyticsId, analyticsHost, clarityId]);

  useEffect(() => {
    if (open && reopened.current) panel.current?.focus({ preventScroll: true });
  }, [open]);

  function choose(analytics: boolean) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ analytics, at: Date.now() }));
    } catch {
      // Never start tracking without a saved choice, or pretend withdrawal worked.
      if (analytics || tracker.current) { setError(true); return; }
    }
    if (!analytics && tracker.current) {
      // Withdrawing consent has to remove Clarity's cookies, not just stop
      // sending; the reload alone would leave them sitting in the browser.
      (window as ClarityWindow).clarity?.("consent", false);
      window.location.reload();
      return;
    }
    setConsent(analytics);
    setError(false);
    setOpen(false);
    if (reopened.current) trigger.current?.focus({ preventScroll: true });
    else document.getElementById("main")?.focus({ preventScroll: true });
  }

  const button = "btp-focus min-h-12 rounded border border-white/25 bg-white/[0.04] px-3 py-3 text-sm font-medium text-paper transition-[background-color,border-color,transform] hover:border-white/60 hover:bg-white/10 active:scale-[0.96] motion-reduce:transform-none";

  return (
    <>
      <div className="container-x pb-6">
        <button ref={trigger} type="button" aria-controls="cookie-consent" aria-expanded={open}
          className="btp-focus min-h-10 font-mono text-xs text-muted transition-colors hover:text-paper"
          onClick={() => { reopened.current = true; setDetails(false); setOpen(true); }}>
          <span aria-hidden className="mr-2 text-accent-from">↳</span>{t.settings}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.section id="cookie-consent" ref={panel} tabIndex={-1} aria-labelledby="cookie-title"
            initial={{ opacity: 0, y: reduce ? 0 : 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduce ? 0 : 8 }}
            transition={{ duration: reduce ? 0.15 : 0.3, ease: [0.2, 0, 0, 1] }}
            className="btp-focus fixed bottom-3 left-3 right-3 z-[70] max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded border border-white/15 bg-[#0b090e] text-paper shadow-[0_24px_80px_rgba(0,0,0,0.65),0_0_50px_-20px_rgba(143,2,248,0.3)] sm:bottom-6 sm:left-6 sm:right-auto sm:w-[460px]"
            onKeyDown={(event) => {
              if (event.key === "Escape" && consent !== null) { setOpen(false); trigger.current?.focus({ preventScroll: true }); }
            }}>
            <div aria-hidden className="h-[3px] bg-[linear-gradient(100deg,#8F02F8_0%,#8F02F8_62%,transparent_62%,transparent_64%,#b77cf5_64%,#160025_100%)]" />
            <div className="px-5 pb-5 pt-4 sm:px-7 sm:pb-6 sm:pt-5">
              <div className="flex min-h-7 items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                <span><span className="text-[#b77cf5]">BTP / </span>{t.label}</span>
                {consent !== null ? (
                  <button type="button" aria-label={t.close} className="btp-focus -mr-2 flex h-10 w-10 items-center justify-center text-lg text-paper"
                    onClick={() => { setOpen(false); trigger.current?.focus({ preventScroll: true }); }}>×</button>
                ) : <span aria-hidden className="text-[#b77cf5]">[ YOU:CTRL ]</span>}
              </div>
              <div className="relative mb-4 mt-5">
                <h2 id="cookie-title" className="relative z-10 font-head text-[clamp(1.75rem,7.5vw,2.65rem)] font-bold uppercase leading-[1.04] tracking-[-0.045em]">
                  {t.first}<br /><span className="ml-3 text-[#b77cf5]">{t.second}</span>
                </h2>
                <svg aria-hidden viewBox="0 0 80 80" className="pointer-events-none absolute -right-1 -top-1 h-16 w-16 opacity-25 sm:opacity-40" fill="none">
                  <path d="M3 3h18v18H3zM27 3h18v18H27zM3 27h18v18H3zM27 27h18v18H27zM51 27h18v18H51zM3 51h18v18H3zM27 51h18v18H27zM51 51h18v18H51z" stroke="white" />
                  <path d="m58 1 18 5-5 18-18-5z" fill="#8f02f8" stroke="#b77cf5" />
                </svg>
              </div>
              <p className="max-w-[37ch] text-pretty text-[13px] leading-relaxed text-[#b7b3be]">{t.body}</p>
              <a href={locale === "en" ? "/en/soukromi/" : "/soukromi/"}
                className="btp-focus mt-2 inline-block text-xs text-[#b7b3be] underline underline-offset-4 hover:text-paper">
                {t.policy}
              </a>
              <div className="mt-5 grid grid-cols-2 gap-2.5">
                <button type="button" className={button} onClick={() => choose(false)}>{t.reject}</button>
                <button type="button" className={button} onClick={() => choose(true)}>{t.accept}</button>
              </div>
              <button type="button" aria-expanded={details} aria-controls="cookie-details"
                className="btp-focus mt-2 flex min-h-11 w-full items-center justify-between text-xs text-[#b7b3be] transition-colors hover:text-paper"
                onClick={() => setDetails(!details)}>{t.details}<span aria-hidden className="text-lg text-[#b77cf5]">{details ? "−" : "+"}</span></button>
              {details && <div id="cookie-details" className="mb-4 space-y-3 border-y border-white/10 py-4 text-xs leading-relaxed text-[#b7b3be]">
                <p><strong className="mb-1 block font-mono text-paper">{t.necessary}</strong>{t.necessaryBody}</p>
                <p><strong className="mb-1 block font-mono text-paper">{t.analytics}</strong>{t.analyticsBody}</p>
                {!analyticsId && <p>{t.inactive}</p>}
              </div>}
              {error && <p role="alert" className="mb-3 text-xs leading-relaxed text-paper">{t.error}</p>}
              <p className="border-t border-white/10 pt-3 font-mono text-[9px] uppercase tracking-[0.08em] text-muted"><span aria-hidden className="mr-2 text-[#b77cf5]">//</span>{t.foot}</p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
