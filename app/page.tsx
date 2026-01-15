import { SearchBar } from "@/components/search/search-bar";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProperties } from "@/components/home/featured-properties";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { OurServices } from "@/components/home/our-services";
import { FeaturedExperiences } from "@/components/home/featured-experiences";
import { PremiumVideoSection } from "@/components/home/premium-video-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CTASection } from "@/components/home/cta-section";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <WhyChooseUs />
      <OurServices />
      <FeaturedProperties />
      <FeaturedExperiences />
      <PremiumVideoSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}