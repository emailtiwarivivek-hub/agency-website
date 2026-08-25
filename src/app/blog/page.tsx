import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { BlogList } from "@/components/blog-list";
import { CtaBand } from "@/components/home/cta-band";
import { getAllPosts, getCategories } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Field notes",
  description: "Writing on measurement, creative volume, positioning and the parts of growth marketing nobody puts in a case study.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        label="Field notes"
        title={
          <>
            What we learned <span className="text-brand">the hard way</span>
          </>
        }
        body="Twelve pieces on measurement, creative volume, positioning and the parts of the job that never make it into a case study."
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }]}
      />
      <BlogList posts={getAllPosts()} categories={getCategories()} />
      <CtaBand />
    </>
  );
}
