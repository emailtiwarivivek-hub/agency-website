import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ProjectCards } from "@/components/home/project-cards";
import { StatsBand } from "@/components/home/stats-band";
import { TestimonialWall } from "@/components/home/testimonial-wall";
import { CtaBand } from "@/components/home/cta-band";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Eight case studies from GrowthLab — contribution margin, pipeline, CAC and retention results across consumer, B2B and marketplace clients.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        label="Projects"
        title={
          <>
            Eight engagements, and what <span className="text-brand">changed</span>
          </>
        }
        body="We have left out the campaigns that only produced a nice-looking deck. These are the ones where the P&L moved."
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }]}
      />
      <StatsBand />
      <ProjectCards limit={8} heading={false} />
      <TestimonialWall />
      <CtaBand />
    </>
  );
}
