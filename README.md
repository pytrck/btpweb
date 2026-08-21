# Break The Pattern (BTP)

Company website for **Break The Pattern** - repairs, custom web, and technical
services. Czech-first (default locale `cs`), English (`/en`) prepared for later.

Dark / paper / vapor-accent visual system with a "broken pattern" motion
language (fracture seams, scroll-linked reveals, restrained vapor gradient).

---

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** - design tokens in `tailwind.config.ts`
- **Framer Motion** - scroll-linked, reversible motion system (`lib/motion.ts`)
- **next-intl** - i18n, `cs` default (no prefix) + `en` (`/en`)
- Generated OG image via `next/og`

---

## Run locally

```bash
npm install
npm run dev
# http://localhost:3000
```

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

> Node 18.17+ recommended (built/tested on Node 22).

---


Adding content needs **no code changes** - add an entry to the relevant file in
`content/`. New service, project, logo, testimonial, or team member all scale
into existing layouts.

---

## Placeholders to replace before launch

All temporary values are marked `// TODO` or wrapped in `[brackets]`:

- `content/site.ts` - `url` (domain), `email`, `phone`, `city`, social handles
- `messages/cs.json` & `messages/en.json` - phone `+420 [číslo]`, service area
  `[Město a okolí]` / `[City and around]`
- `content/work.ts` - the 3 case studies are illustrative placeholders
- `content/proof.ts` / `content/team.ts` - empty until real data is added

---

## Deployment

Optimized for **Vercel** (zero-config for Next.js App Router):

1. Import the repository in Vercel.
2. No required environment variables yet.
3. Set the production domain, then update `site.url` in `content/site.ts`
   (drives canonical URLs, hreflang, and OG metadata).

The OG image route (`/opengraph-image`) runs on the Edge runtime.

---

## i18n notes

- `cs` is the default locale and serves at `/` (no prefix); `en` serves at `/en`.
- UI strings live in `messages/*.json`; content lives in `content/*.ts`.
- Route slugs are Czech (`/sluzby`, `/prace`, `/o-nas`, `/kontakt`).
