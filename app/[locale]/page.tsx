import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { StatsBand } from "@/components/sections/StatsBand";
import { Fit } from "@/components/sections/Fit";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { LogoWall } from "@/components/sections/LogoWall";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { CTABlock } from "@/components/sections/CTABlock";
import { FractureDivider } from "@/components/ui/FractureDivider";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { ScrollOrb } from "@/components/ui/ScrollOrb";

/**
 * Narrative arc: hero → proof (stats + work) → what we do → how → honest fit →
 * objections → signature CTA. Distilled: SolveGrid (repeated each service's
 * "solves") and the standalone TrustBar (repeated StatsBand's promise band, with
 * warranty now folded into StatsBand) were cut, as were Expect, KineticStrip and
 * WhyList earlier - none added information.
 */
export default function Home({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <div className="relative">
      {/* full-page glitch orb rides a sine trajectory behind the content */}
      <ScrollOrb />
      <Hero />
      {/* Auto-hidden until client logos are added in content/proof.ts */}
      <LogoWall />
      <StatsBand />
      <FeaturedWork />
      <FractureDivider />
      <ServicesPreview />
      <ProcessSteps />
      <Fit />
      {/* Auto-hidden until testimonials are added in content/proof.ts */}
      <Testimonials />
      <Faq />
      <FractureDivider />
      <CTABlock />
      <StickyCTA />
    </div>
  );
}
