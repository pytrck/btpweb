---
target: app/[locale]/page.tsx
total_score: 31
p0_count: 0
p1_count: 3
timestamp: 2026-07-01T23-22-03Z
slug: app-locale-page-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Nav scroll state, FAQ toggles, stat count-ups, hover feedback all present |
| 2 | Match System / Real World | 4 | Plain direct Czech, natural order, zero jargon |
| 3 | User Control and Freedom | 3 | Nav-home always available, FAQ/marquee interactive; no skip-to-contact |
| 4 | Consistency and Standards | 3 | Cohesive system — arguably over-consistent (hairgrid sameness mid-page) |
| 5 | Error Prevention | 3 | Empty sections auto-hide (LogoWall/Testimonials); no inputs on this page |
| 6 | Recognition Rather Than Recall | 4 | Everything visible, labeled nav, no memory demands |
| 7 | Flexibility and Efficiency | 2 | No sticky CTA on scroll, no one-tap phone, generic hero subhead |
| 8 | Aesthetic and Minimalist Design | 2 | Gorgeous surface, but 4 overlapping trust sections dilute the message |
| 9 | Error Recovery | 3 | n/a on this page; on-brand 404 exists |
| 10 | Help and Documentation | 4 | FAQ section is strong, first item open by default |
| **Total** | | **31/40** | **Good — solid foundation, clear wins in conversion path + message focus** |

## Anti-Patterns Verdict

**Does this look AI-generated? Mostly no — the shell is genuinely distinctive; the middle drifts toward AI grammar.**

**LLM assessment**: The brand identity clears the slop bar decisively — dark ink + vapor #FF10F0, the fracture signature (split-type hero, glint strike, seam draws, FractureDivider), grain + hero grid atmosphere. Nobody guesses "AI made this" from the hero. BUT the mid-page is a monoculture: SolveGrid, ProcessSteps, and Expect are near-identical hairgrid + mono-number + heading + muted-text blocks, and ~8 sections each open with a tiny uppercase tracked eyebrow (CO DĚLÁME / PROČ BTP / CO ŘEŠÍME / JAK TO PROBÍHÁ / CO MŮŽETE ČEKAT / KOMU SEDNEME / ČASTÉ DOTAZY). That per-section eyebrow is the single most saturated AI landing-page tell, and it's on almost every section here. Numbered markers (01/02/03) appear in four sections; only Process is genuinely a sequence.

**Deterministic scan**: `detect.mjs` across page.tsx + all section/card/layout/ui components returned `[]` — zero findings. Clean. (The `vapor-text` gradient in globals.css lives in CSS, out of this markup scan, and is a deliberate one-word brand signature.)

**Visual overlays**: Not injected — reused this session's current post-edit screenshots (hero, services, work, stats, CTA, footer at desktop + mobile) rather than re-instrumenting the running server. Console is clean of app hydration errors; mobile has no horizontal overflow.

## Overall Impression

The page looks premium and on-brand — that half of the job is done. The weakness is **strategic, not visual**: it says "trust us" four different ways and never once shows a real client saying it. For a skeptical repair/web customer, the surface earns a second look but the content doesn't close. Biggest single opportunity: **cut the redundant trust sections and put one piece of real social proof + the concrete promises (24h / price upfront / warranty) high, near the hero, where the decision actually happens.**

## What's Working

1. **The signature identity.** The fracture motif is coherent from hero to divider to hovers. It IS the "break the pattern" promise made visual — rare alignment of concept and craft.
2. **Honest, human copy.** "Bez prodejních keců", concrete promises, the "Fit / not a fit" honesty section. Voice matches brand perfectly and builds trust without hype.
3. **Defensive empty states.** LogoWall and Testimonials auto-hide until populated — no broken "coming soon" placeholders. Good engineering discipline.

## Priority Issues

- **[P1] Message dilution: four sections doing one job.** WhyList (proč nás), SolveGrid (co řešíme), Expect (co můžete čekat), and Fit (komu sedneme) are all "reasons to trust us / what you get." A skimmer hits the same message four times and tunes out.
  - **Why it matters**: Repetition reads as padding, not confidence. It lengthens the scroll to the CTA and buries the strongest points among weaker ones.
  - **Fix**: Pick the two strongest (Fit is distinctive; one of Why/Expect). Merge or cut the rest. Shorter page, sharper pitch.
  - **Suggested command**: `/impeccable distill`

- **[P1] Zero third-party proof on a trust-sale page.** LogoWall + Testimonials are empty; the three work cards are anonymous ("Vzkříšení", "Protiváha"). The skeptic's first question — "has anyone real trusted them?" — is unanswered.
  - **Why it matters**: For repair/web clients choosing on trust, absence of any named client, review, or logo is the biggest conversion leak on the page. No visual polish compensates.
  - **Fix**: Add 2-3 real testimonials (name + what broke + outcome) and/or client logos; attribute at least one work card. This is a **content gap**, not a code fix — the components already exist and will render the moment `content/proof.ts` has data.
  - **Suggested command**: none — gather real content first.

- **[P1] Eyebrow-on-every-section is the AI tell that undercuts "no templates."** ~8 uppercase tracked kickers, one per section.
  - **Why it matters**: It's the exact grammar of the template sites BTP defines itself against. The medium contradicts the message.
  - **Fix**: Vary the cadence — let some sections lead with the headline alone, reserve the kicker for 2-3 where it earns emphasis. Keep it as deliberate rhythm, not default scaffolding.
  - **Suggested command**: `/impeccable typeset`

- **[P2] Conversion path is passive.** Concrete promises (24h reply / price upfront / warranty) live low in StatsBand + TrustBar; no sticky CTA once the hero scrolls off; phone isn't one-tap; hero subhead is generic ("Tým, kterému záleží na výsledku").
  - **Why it matters**: A repair customer often wants to act immediately. Every extra scroll to reach a contact affordance costs conversions, especially on mobile.
  - **Fix**: Surface one promise line near the hero CTAs; add a slim sticky "Začít projekt" (or tap-to-call) after hero exit; make the hero subhead concrete.
  - **Suggested command**: `/impeccable layout` (placement) + `/impeccable clarify` (subhead copy)

- **[P2] Uniform scroll rhythm — no second peak.** 14 visible sections at one density and full width; after the hero, nothing else is a focal moment.
  - **Why it matters**: Peak-end rule — a long even scroll flattens memory. FeaturedWork (the real credibility) deserves more weight than a body section.
  - **Fix**: Give FeaturedWork a distinct treatment/scale; vary section width and vertical rhythm so the page has a shape, not a list.
  - **Suggested command**: `/impeccable layout`

## Persona Red Flags

**Jordan (Confused First-Timer)**: Lands, sees a beautiful hero, scrolls — and hits four "why us" sections before any evidence that a real person was helped. Leaves unsure whether BTP has ever done this for someone like them. No phone number visible without scrolling.

**Casey (Distracted Mobile User)**: Hero CTAs are thumb-reachable (verified), but once she scrolls past the hero there's no persistent way to act — she must scroll back up or open the nav. Wants to tap-to-call a repair shop; there's no tel: affordance.

**Riley (Stress Tester)**: Notices the work case studies are anonymous with unverifiable outcomes ("nárůst příchozích poptávek" — whose?). Reads the empty gap where testimonials/logos would be as "they don't have any yet." The honesty section (Fit) actually wins Riley over — that's the strongest trust moment on the page.

**Petr (project persona — skeptical Czech repair customer, been burned before)**: Believes the design is competent. Still can't find: a price ballpark without clicking into services, a real review, or a fast way to call. The promises land, but "prove it" goes unanswered.

## Minor Observations

- KineticStrip marquee is a nice texture beat but sits between hero and first real content — competes with the hero's exit moment. Consider placing it after ServicesPreview as a divider instead.
- Two FractureDividers is fine (they're signatures), but back-to-back-ish placement risks the effect feeling like filler if sections between them shrink.
- FAQ at 8 items is thorough (good for SEO/objections); fine as-is since it's collapsed.
- StatsBand "0 skrytých příplatků" counting up to 0 is a no-op animation — the count-up reads oddly on a zero. Minor.

## Questions to Consider

- What if the single strongest proof (one real testimonial or named result) sat directly under the hero, before any "why us" section?
- Does the page need four trust sections, or would one confident one plus real evidence do more?
- What would the page look like if a returning visitor could contact you from any scroll position in one tap?
- Is the per-section eyebrow a deliberate brand system, or reflex? If you removed all of them, what would you lose?
