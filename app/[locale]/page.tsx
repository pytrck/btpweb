import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { KineticStrip } from "@/components/sections/KineticStrip";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { StatsBand } from "@/components/sections/StatsBand";
import { SolveGrid } from "@/components/sections/SolveGrid";
import { WhyList } from "@/components/sections/WhyList";
import { Expect } from "@/components/sections/Expect";
import { Fit } from "@/components/sections/Fit";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { TrustBar } from "@/components/sections/TrustBar";
import { LogoWall } from "@/components/sections/LogoWall";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { CTABlock } from "@/components/sections/CTABlock";
import { FractureDivider } from "@/components/ui/FractureDivider";
import { ScrollOrb } from "@/components/ui/ScrollOrb";

export default function Home({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <div className="relative">
      <ScrollOrb />
      <Hero />
      <KineticStrip />
      {/* Auto-hidden until client logos are added in content/proof.ts */}
      <LogoWall />
      <ServicesPreview />
      <FractureDivider />
      <FeaturedWork />
      <StatsBand />
      <WhyList />
      <SolveGrid />
      <ProcessSteps />
      <Expect />
      <Fit />
      <TrustBar />
      {/* Auto-hidden until testimonials are added in content/proof.ts */}
      <Testimonials />
      <Faq />
      <FractureDivider />
      <CTABlock />
    </div>
  );
}
