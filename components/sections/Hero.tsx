"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { HeroAtmosphere } from "@/components/ui/HeroAtmosphere";
import { heroContainer, heroItem, lineMask, EASE } from "@/lib/motion";

const BRAND = "Break The Pattern";

/**
 * Signature moment (GSAP). A bright glint flies in from the LEFT and slashes
 * across the whole "Break The Pattern" phrase, drawing the vapor seam in its
 * wake. As the cut passes through, the type reacts - the two halves snap apart
 * along the fault with a small overshoot, then settle into the refined fractured
 * state. One-time strike (no loop); the only ongoing motion is scroll-linked
 * (the brand drifts off-grid and the seam opens a touch as the hero leaves). The
 * real text stays in the DOM for screen readers and the glyphs are never hidden,
 * so readability holds throughout.
 */
function FracturedBrand({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const root = useRef<HTMLSpanElement>(null);
  const upper = useRef<HTMLSpanElement>(null);
  const lower = useRef<HTMLSpanElement>(null);
  const seam = useRef<HTMLSpanElement>(null);
  const glint = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const off = 3;

    const ctx = gsap.context(() => {
      gsap.set(seam.current, { yPercent: -50, transformOrigin: "left center" });
      gsap.set(glint.current, { xPercent: -50, yPercent: -50, opacity: 0 });

      // Reduced motion → resolve straight to the resting fractured state. It's a
      // static visual, not motion, so the brand keeps its identity; no strike,
      // no ScrollTrigger.
      if (reduce) {
        gsap.set(seam.current, { clipPath: "inset(0 0% 0 0)", opacity: 0.85 });
        gsap.set(upper.current, { x: -off, y: -1 });
        gsap.set(lower.current, { x: off, y: 1 });
        return;
      }

      // Seam starts fully clipped from the right (invisible), so the draw reveals
      // it left→right without distorting the gradient.
      gsap.set(seam.current, { clipPath: "inset(0 100% 0 0)", opacity: 0.95 });
      gsap.set([upper.current, lower.current], { x: 0, y: 0 });

      // Fires after the framer headline entrance settles (~1s) so the strike
      // lands on the fully-revealed brand, not on text still masked mid-reveal.
      const tl = gsap.timeline({ delay: 1.5 });

      // 1) The glint flies in from the left and races across the phrase, drawing
      //    the seam in its wake.
      tl.to(glint.current, { opacity: 1, duration: 0.1 }, 0)
        .fromTo(
          glint.current,
          { x: 0 },
          { x: () => el.offsetWidth, duration: 0.5, ease: "power2.inOut" },
          0
        )
        .fromTo(
          seam.current,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 0.5, ease: "power2.inOut" },
          0
        )
        .to(glint.current, { opacity: 0, duration: 0.22 }, 0.4)
        // 2) The text reacts to the cut - snaps apart with a slight overshoot...
        .to(upper.current, { x: -(off + 3.5), y: -2.5, duration: 0.16, ease: "power3.out" }, 0.32)
        .to(lower.current, { x: off + 3.5, y: 2.5, duration: 0.16, ease: "power3.out" }, 0.32)
        // 3) ...then settles into the refined fractured state.
        .to(upper.current, { x: -off, y: -1, duration: 0.6, ease: "power2.out" }, 0.52)
        .to(lower.current, { x: off, y: 1, duration: 0.6, ease: "power2.out" }, 0.52)
        .to(seam.current, { opacity: 0.72, duration: 0.6 }, 0.55);

      // Scroll-linked: brand drifts off-grid, seam opens a little as the hero
      // leaves. Separate properties, so nothing fights the strike above.
      const section = el.closest("section");
      if (section) {
        const st = { trigger: section, start: "top top", end: "bottom top", scrub: true } as const;
        gsap.fromTo(el, { x: 0 }, { x: 44, ease: "none", scrollTrigger: st });
        gsap.fromTo(seam.current, { scaleY: 1 }, { scaleY: 2.4, ease: "none", scrollTrigger: st });
      }
    }, el);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <span ref={root} className="relative inline-block align-baseline" aria-label={text}>
      <span className="sr-only">{text}</span>
      {/* upper half (in-flow, sizes the box) */}
      <span ref={upper} aria-hidden className="vapor-text block" style={{ clipPath: "inset(0 0 49% 0)" }}>
        {text}
      </span>
      {/* lower half (overlaid) */}
      <span ref={lower} aria-hidden className="vapor-text absolute inset-0" style={{ clipPath: "inset(51% 0 0 0)" }}>
        {text}
      </span>
      {/* the seam riding the fault line */}
      <span
        ref={seam}
        aria-hidden
        className="vapor-center absolute left-[-2%] top-1/2 h-[2px] w-[104%]"
        style={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
      />
      {/* the glint that flies in and slashes across */}
      <span
        ref={glint}
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 h-3 w-3 rounded-full"
        style={{
          opacity: 0,
          // white-hot core so the strike reads as a slash of light; the bloom
          // stays acid-purple (brand). Dimmed to a flat #8f02f8 at go-live,
          // which lost the cut against the near-black hero.
          background: "#f4e9ff",
          boxShadow: "0 0 24px 8px rgba(143,2,248,0.85), 0 0 10px 3px rgba(214,150,255,0.95)",
        }}
      />
    </span>
  );
}

/**
 * Two-line editorial headline: a quieter "setup" line sets up the tension, then
 * a dominant "payoff" line lands it. The brand name in the payoff is the
 * fractured signature. Splits on the first sentence break so the line break is
 * deliberate, not automatic.
 */
function HeroHeadline({ title }: { title: string }) {
  const idx = title.indexOf(". ");
  const setup = idx >= 0 ? title.slice(0, idx + 1) : title;
  const payoff = idx >= 0 ? title.slice(idx + 2) : "";

  const bIdx = payoff.indexOf(BRAND);
  const payoffContent =
    bIdx >= 0 ? (
      <>
        {payoff.slice(0, bIdx)}
        <FracturedBrand text={BRAND} />
        {payoff.slice(bIdx + BRAND.length)}
      </>
    ) : (
      payoff
    );

  return (
    <>
      <span className="block text-balance text-[0.48em] font-medium leading-[1.12] tracking-[-0.01em] text-paper/65">
        {setup}
      </span>
      {payoff && (
        <span className="mt-4 block text-balance tracking-[-0.025em]">{payoffContent}</span>
      )}
    </>
  );
}

export function Hero() {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Cinematic exit: drift up, recede in scale, fade (framer - kept simple).
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, reduce ? 1 : 0]);
  // The fracture line beneath the hero grows as you leave.
  const seamScale = useTransform(scrollYProgress, [0, 0.55], [0, 1]);
  const seamOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 0.9]);

  return (
    <section ref={ref} className="relative">
      {/* atmosphere: engineering grid + vapor aura give the flat ink depth
          without touching the composition. Scrolls away with the hero. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-grid absolute inset-0" />
        <div
          className="absolute -top-[28%] left-[-12%] h-[75vh] w-[70vw] rounded-full"
          style={{
            background: "radial-gradient(closest-side, rgba(143,2,248,0.055), transparent 72%)",
          }}
        />
        <div
          className="absolute -bottom-[35%] right-[-18%] h-[65vh] w-[55vw] rounded-full"
          style={{
            background: "radial-gradient(closest-side, rgba(255,255,255,0.03), transparent 72%)",
          }}
        />
      </div>
      <motion.div
        style={{ y, scale, opacity }}
        className="container-x relative z-10 grid min-h-[86vh] grid-cols-12 content-center gap-y-8 py-section"
      >
        <motion.div className="contents" variants={heroContainer} initial="hidden" animate="show">
          <div className="col-span-12 md:col-span-11">
            <motion.p variants={heroItem} className="label text-accent-from">
              {t("kicker")}
            </motion.p>
            <motion.h1
              variants={lineMask}
              className="mt-6 font-head text-[clamp(2.9rem,6.6vw,5.4rem)] font-bold leading-[0.95]"
            >
              <HeroHeadline title={t("title")} />
            </motion.h1>
          </div>
          {/* off-grid: subtitle pushed right, breaking the left column */}
          <div className="col-span-12 md:col-span-7 md:col-start-5">
            <motion.p variants={heroItem} className="max-w-xl text-lg text-muted">
              {t("subtitle")}
            </motion.p>
            <motion.div variants={heroItem} className="mt-8 flex flex-wrap gap-4">
              <Button href="/kontakt">{t("ctaPrimary")}</Button>
              <Button href="/prace" variant="ghost">
                {t("ctaSecondary")}
              </Button>
            </motion.div>
            {/* live availability signal — quiet, mono, one pulsing vapor dot */}
            <motion.p
              variants={heroItem}
              className="mt-9 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-muted"
            >
              <span aria-hidden className="relative flex h-2 w-2">
                <span className="dot-ping absolute inset-0 rounded-full bg-accent-from opacity-70" />
                <span className="relative h-2 w-2 rounded-full bg-accent-from shadow-[0_0_12px_2px_rgba(143,2,248,0.45)]" />
              </span>
              {t("status")}
            </motion.p>
          </div>
        </motion.div>
      </motion.div>

      {/* scroll-reactive fracture line - grows as you leave the hero */}
      <div className="container-x" aria-hidden>
        <motion.div
          className="h-px w-full origin-center vapor-center"
          style={{ scaleX: seamScale, opacity: seamOpacity }}
        />
      </div>
    </section>
  );
}
