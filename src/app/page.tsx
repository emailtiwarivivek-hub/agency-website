import { Hero } from "@/components/home/hero";
import { ServicesOverview } from "@/components/home/services-overview";
import { ProjectCards } from "@/components/home/project-cards";
import { StatsBand } from "@/components/home/stats-band";
import { PinnedQuote } from "@/components/home/pinned-quote";
import { TestimonialWall } from "@/components/home/testimonial-wall";
import { PricingCards } from "@/components/home/pricing-cards";
import { FaqAccordion } from "@/components/home/faq-accordion";
import { CtaBand } from "@/components/home/cta-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <ProjectCards limit={6} />
      <StatsBand />
      <PinnedQuote />
      <TestimonialWall />
      <PricingCards />
      <FaqAccordion />
      <CtaBand />
    </>
  );
}
