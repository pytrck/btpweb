import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { KineticStrip } from "@/components/sections/KineticStrip";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { StatsBand } from "@/components/sections/StatsBand";
import { SolveGrid } from "@/components/sections/SolveGrid";
import { WhyList } from "@/components/sections/WhyList";
import { Fit } from "@/components/sections/Fit";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { TrustBar } from "@/components/sections/TrustBar";
import { LogoWall } from "@/components/sections/LogoWall";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { CTABlock } from "@/components/sections/CTABlock";
import { FractureDivider } from "@/components/ui/FractureDivider";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { ScrollOrb } from "@/components/ui/ScrollOrb";

/**
 * Narrative arc: hero → promise → proof → what we do → your problems → why us →
 * how → honest fit → objections → signature CTA. TrustBar rides directly under
 * the hero so the concrete promises (24h / warranty / diagnostics) sell on the
 * first scroll. Expect was cut - it repeated WhyList and the promise band.
 */
export default function Home({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <div className="relative">
      {/* full-page glitch orb rides a sine trajectory behind the content */}
      <ScrollOrb />
      <Hero />
      <TrustBar />
      {/* Auto-hidden until client logos are added in content/proof.ts */}
      <LogoWall />
      <KineticStrip />
      <StatsBand />
      <FeaturedWork />
      <FractureDivider />
      <ServicesPreview />
      <SolveGrid />
      <WhyList />
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
