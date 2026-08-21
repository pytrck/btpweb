# Redesign brief: make the premium feel authored

## Direction

The site already has a strong and distinctive BTP world: dark ink, sharp typography, purple atmosphere, fracture lines, glitch language, and the ScrollOrb. Keep those. They express the brand's point of view: different, energetic, and slightly unexpected.

The goal is not to make the site quieter or more conventional. The goal is to make everything around those signature elements feel equally intentional, so the result feels like a confident studio system rather than a collection of impressive effects.

## What will make it feel less generic

| Before | After |
| --- | --- |
| The visual identity does most of the differentiation | Keep the identity, then add differentiation through specific copy, real work, unusual composition, and clear opinions |
| Several sections use the same container, heading, grid, border, and card rhythm | Give each section a distinct role and composition: full-bleed work, editorial list, proof band, narrow copy, or structured process |
| Premium is communicated mainly through polish and motion | Communicate premium through restraint, specificity, art direction, and the quality of the decisions shown |
| The same visual treatment can make services, work, process, and proof feel interchangeable | Make each content type visually recognizable before the user reads the details |

## Preserve the BTP signature, but systematize it

| Brand element | Make it feel authored by |
| --- | --- |
| Purple glow | Define a small range of purple intensities: bright for action, soft for atmosphere, low-opacity for structure. Use the glow to frame content, not obscure it |
| Glitch language | Give it a vocabulary of calm, medium, and energetic states. Use calm chromatic shifts for small interactions and the strongest fracture for major brand moments |
| ScrollOrb | Keep it as a recognizable BTP character. Give its trajectory, scale, and resting position a deliberate relationship to the page narrative |
| Fracture lines and seams | Use them as punctuation: to introduce a transition, mark a split, or close the experience. They should have editorial meaning, not merely fill empty space |
| Grain and grid | Keep them as material and spatial texture. Tune opacity and scale per context so they support hierarchy and do not flatten every section into the same surface |
| Spotlight and magnetic interaction | Keep them where they reward exploration. The resting state must still be complete, and repetitive card variants should not all have the exact same response |

## Typography

The type system is already strong. The main improvement is to create more contrast between voices instead of giving every section the same headline-plus-mono-label treatment.

| Before | After |
| --- | --- |
| Large bold heading, mono uppercase kicker, and purple accent in most sections | Let the hero use the largest display treatment. Use sentence-case titles, short introductions, or image-led headings elsewhere |
| Tight display leading and tracking are used as the default | Keep tight leading for major display type; give supporting headings and paragraphs more breathing room |
| Labels behave like interface metadata everywhere | Keep mono labels for orientation, metrics, dates, and technical details. Remove labels that do not add information |
| Muted body copy is used for almost everything | Increase contrast for important proof and outcomes. Use opacity to establish secondary information, not to make core content hard to read |

Recommended rules:

- Use `text-wrap: balance` on headings and `text-wrap: pretty` on longer copy.
- Keep mono type for compact metadata rather than general brand voice.
- Use tabular numerals for `Counter` and any changing statistics.
- Let copy length and line breaks create some of the visual rhythm.

## Composition and rhythm

The home page has enough sections to benefit from changes of pace. Keep the expressive effects, but do not put every section into the same component-shaped container.

| Before | After |
| --- | --- |
| Most sections follow container + heading + grid | Alternate between full-bleed imagery, asymmetric two-column layouts, narrow editorial copy, and one dense proof section |
| The off-grid hero is the only major compositional surprise | Carry the off-grid idea into two or three deliberate moments, then return to a calm grid so the contrast is meaningful |
| Dividers do most of the announcing | Keep fracture dividers as BTP punctuation and let whitespace, tonal changes, and image crops handle the rest |
| The page presents many separate promise, proof, service, problem, process, fit, FAQ, and CTA sections | Make the narrative easier to remember: what you do, proof it works, how you work, who it is for, and what to do next |

Suggested home-page rhythm:

1. Hero: one bold claim, signature atmosphere, and one clear action.
2. Proof: a client, outcome, or strong metric immediately after the claim.
3. Featured work: large visual case studies with real context.
4. Services: concise editorial list rather than another identical card wall.
5. Process: three or four steps with a human explanation.
6. Fit and FAQ: resolve objections without introducing another visual language.
7. CTA: bring the full fracture treatment back as the closing signature.

## Make the work section the visual anchor

The premium feeling should come as much from the work as from the atmosphere. Specific project evidence will make the distinctive effects feel like part of a real studio identity.

| Before | After |
| --- | --- |
| `WorkCard` is primarily text inside a bordered tile | Lead with a real image, product frame, mockup, or carefully art-directed project poster |
| Work cards share almost all interaction behavior with service cards | Give work one focused behavior: image crop, caption reveal, or a precise case-study cue |
| Results are small supporting paragraphs | Promote the outcome into a short, memorable line with a number or concrete change when available |
| Tags read as generic metadata | Use tags to state the context: sector, problem, or role, such as `Fintech / repositioning` |

If imagery is not ready, use fewer projects and create specific typographic posters or product screenshots. Specificity is more premium than an empty atmospheric tile.

## Component recommendations

| Component | Direction |
| --- | --- |
| `Hero.tsx` | Keep the fracture idea and brand atmosphere. Improve the hierarchy around the headline and make the first action unmistakable |
| `HeroAtmosphere.tsx` | Keep the glows, grid, and parallax. Tune scale, contrast, and movement per breakpoint so text remains dominant |
| `Nav.tsx` | Keep the distinctive logo treatment and branded energy. Make active state, spacing, and wayfinding more deliberate |
| `ServiceCard.tsx` | Consider a numbered editorial list or two-column service index with a short “best for” line and one outcome |
| `WorkCard.tsx` | Rebuild around an image or project frame, with text and result supporting the visual |
| `SectionHeader.tsx` | Add variants: left editorial, split title/description, and image-led intro |
| `FractureDivider.tsx` / `SectionSeam.tsx` | Keep them as intentional BTP transitions, not automatic separators between every section |
| `ScrollOrb.tsx` | Keep it. Refine its trajectory and placement so it feels like part of the narrative rather than an unrelated floating decoration |
| `globals.css` | Keep the effect vocabulary, but document tokens and intended contexts so future sections use consistent BTP primitives |

## Motion and interaction

Motion should communicate state, hierarchy, or the “break the pattern” idea. It can remain expressive; it just needs different levels of intensity.

| Before | After |
| --- | --- |
| Every interaction aims to be noticeable | Use a clear motion scale: quiet for links, tactile for buttons, expressive for brand moments |
| `Button` uses magnetic cursor movement and a tap scale | Keep the magnetic behavior where it supports the CTA, and use the recommended tactile press value `scale(0.96)` |
| Glitch effects have similar energy across contexts | Keep the glitch language, but vary frequency and intensity so navigation, cards, hero, and CTA each have their own role |
| Scroll-linked opacity, scale, drift, seams, and parallax stack together | Keep the relationships that make the composition feel alive; make each section's primary movement clear and interruptible |
| Hover can become essential to understanding a card | Make the resting state complete. Hover should reward attention, never carry required information |

Implementation details:

- Never use `transition: all`; name the properties being transitioned.
- Keep interactive hit areas at least 40×40px.
- Keep icon movement optically aligned rather than mathematically centered.
- Use `prefers-reduced-motion` to preserve the orb and BTP identity in a calm static state while removing unnecessary movement.
- Add `initial={false}` to presence-based UI where the default state should not animate on first render.

## Add human specificity

The easiest way to remove the generic AI feeling is to make the content impossible to confuse with another agency site. Add:

- A clear point of view about the work you take and the work you decline.
- Specific project constraints, decisions, and outcomes-not only polished service descriptions.
- A team detail with an opinion or texture, not only job titles.
- Real client names, logos, screenshots, or measurable proof as soon as available.
- A few unusual static editorial details that feel like BTP, alongside the existing motion language.

Do not add more motifs before the content becomes more specific. The current visual language is strong enough; it needs better material to act on.

## Practical first pass

### Pass 1 - clarify the system

- Keep `ScrollOrb`, but define its visual role and make its path feel intentional across the page.
- Keep spotlight and magnetic interactions where they reward discovery; remove them only from repetitive variants.
- Keep looping glitch effects as part of the brand, but vary their frequency and intensity by context.
- Keep purple lines and vapor dividers; use them to establish hierarchy rather than applying them to every boundary.
- Let the hero's fracture moment settle quickly, then let the static identity carry the rest of the page.

### Pass 2 - change the structures

- Rebuild `WorkCard` around an image or project frame.
- Change `ServiceCard` into an editorial list with varied row lengths.
- Add at least one full-bleed work section and one narrow copy section.
- Merge duplicate promise/proof sections on the home page.

### Pass 3 - tune the details

- Review type contrast and line length on every section.
- Apply balanced heading wraps and tabular numerals where relevant.
- Use concentric radii for genuinely nested surfaces.
- Add subtle image outlines and restrained shadows only where they clarify depth.
- Verify keyboard focus, mobile spacing, and reduced-motion behavior after the structural pass.

## Definition of done

The redesign is working when:

- The site still feels unmistakably BTP: different, energetic, and visually memorable.
- The purple atmosphere, glitch language, and orb feel like a coherent identity rather than isolated tricks.
- A screenshot without animation still looks authored and specific.
- Work imagery and proof are as memorable as the atmosphere.
- Services, work, proof, and process are visually distinguishable at a glance.
- The page has clear content hierarchy even when the expressive effects are present.
- Motion makes interactions clearer and reinforces the brand instead of merely proving that motion exists.
