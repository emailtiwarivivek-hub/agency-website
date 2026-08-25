import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { PricingCards } from "@/components/home/pricing-cards";
import { FaqAccordion } from "@/components/home/faq-accordion";
import { CtaBand } from "@/components/home/cta-band";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Flat, published fees. Sprint, Retainer and Partner engagements with no percentage of media spend.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        label="Pricing"
        title={
          <>
            No cut of your <span className="text-brand">media budget</span>
          </>
        }
        body="Fees are flat and published. The moment our income scales with your spend we stop being able to tell you to spend less."
        crumbs={[{ label: "Home", href: "/" }, { label: "Pricing", href: "/pricing" }]}
      />
      <PricingCards heading={false} />
      <FaqAccordion />
      <CtaBand />
    </>
  );
}
