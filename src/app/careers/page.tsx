import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Arrow, Reveal, SectionHeading } from "@/components/ui";
import { CtaBand } from "@/components/home/cta-band";
import { jobs, values } from "@/lib/content";

export const metadata: Metadata = {
  title: "Careers",
  description: "Open roles at GrowthLab. Published salary bands, two-hour take-homes, no account managers.",
};

const perks = [
  "Published salary bands, reviewed annually",
  "Four-day fortnight in December and June",
  "₹1.5L annual learning and conference budget",
  "Hybrid — three days in the Bengaluru studio",
  "Every application read by a partner",
  "No timesheets, ever",
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        label="Careers"
        title={
          <>
            Small rooms, <span className="text-brand">senior people</span>
          </>
        }
        body="We hire twice a year, read every application ourselves, and tell you the band in the first email."
        crumbs={[{ label: "Home", href: "/" }, { label: "Careers", href: "/careers" }]}
      />

      <section className="shell py-16 md:py-24">
        <SectionHeading label="Open roles" title="Three seats" />
        <div className="mt-12 border-t border-line">
          {jobs.map((job, i) => (
            <Reveal key={job.slug} delay={i * 0.05}>
              <Link
                href={`/careers/${job.slug}`}
                className="group flex flex-col gap-4 border-b border-line py-8 transition-colors hover:bg-bg-subtle/60 md:flex-row md:items-center md:justify-between"
              >
                <div className="md:max-w-xl">
                  <h3 className="display text-[clamp(1.5rem,3.4vw,2.5rem)] transition-colors group-hover:text-brand">
                    {job.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-muted">{job.summary}</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="label text-fg-faint">{job.team}</p>
                    <p className="mt-1.5 text-[0.875rem] text-fg-muted">{job.location}</p>
                    <p className="mt-1 text-[0.875rem] text-brand">{job.salary}</p>
                  </div>
                  <span className="grid size-12 shrink-0 place-items-center rounded-full border border-line text-fg transition-all group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                    <Arrow />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-bg-subtle py-24">
        <div className="shell grid gap-14 lg:grid-cols-[0.85fr_1.3fr]">
          <SectionHeading label="Working here" title="What the deal is" />
          <Reveal delay={0.08}>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {perks.map((p) => (
                <li key={p} className="rounded-2xl border border-line bg-bg-elevated px-5 py-4 text-[0.9375rem] text-fg-muted">
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[0.9375rem] leading-relaxed text-fg-muted">
              Our principles are not a poster. They decide who we hire, which clients we
              take and what we say when a plan is not working — starting with{" "}
              <span className="text-fg">“{values[0].title.toLowerCase()}”</span>.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
