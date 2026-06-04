import "./globals.css";

// Root-level branded 404. Self-contained (own <html>/<body>) because it renders
// outside the [locale] layout. Catches unmatched URLs that bubble to the root.
// CSS-only (no client JS) so it always renders server-side. Returns 404 status.
export default function NotFound() {
  const primary =
    "inline-flex items-center justify-center rounded border border-paper bg-paper px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-transparent hover:text-paper";
  const ghost =
    "inline-flex items-center justify-center rounded border border-line px-6 py-3 text-sm font-medium text-paper transition-colors hover:border-paper";

  return (
    <html lang="cs">
      <body className="bg-ink text-paper font-body antialiased">
        <main className="mx-auto flex min-h-screen w-full max-w-content flex-col justify-center px-6 py-24 md:px-10">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-accent-from">
            CHYBA 404 — BREAK THE PATTERN
          </p>

          {/* Signature: the 404 sliced by a vapor crack that radiates from centre */}
          <div className="relative mt-6 w-fit">
            <h1 className="font-head text-[clamp(5rem,22vw,16rem)] font-bold leading-none tracking-tight">
              4<span className="vapor-text">0</span>4
            </h1>
            <div
              className="vapor-center absolute left-[-4%] top-1/2 h-px w-[108%]"
              style={{ transform: "rotate(-9deg)", opacity: 0.9 }}
              aria-hidden
            />
            <div
              className="absolute left-1/2 top-1/2 h-[6px] w-[6px] -translate-x-1/2 bg-accent-from"
              style={{ transform: "rotate(45deg)" }}
              aria-hidden
            />
          </div>

          <h2 className="mt-8 font-head text-[clamp(2rem,4vw,3rem)] font-bold leading-tight">
            Tady se vzor rozbil.
          </h2>
          <p className="mt-4 max-w-md text-lg text-muted">
            Tahle adresa neexistuje nebo se přesunula. Vraťte se do vzoru — odsud
            se dostanete dál.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href="/" className={primary}>
              Zpět domů
            </a>
            <a href="/sluzby" className={ghost}>
              Služby
            </a>
            <a href="/kontakt" className={ghost}>
              Kontakt
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
