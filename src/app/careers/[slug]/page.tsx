import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { Arrow, Button, Reveal } from "@/components/ui";
import { CtaBand } from "@/components/home/cta-band";
import { getJob, jobs, site } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return { title: "Role not found" };
  return { title: job.title, description: job.summary };
}

export default async function JobPage({ params }: Params) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  return (
    <>
      <PageHero
        label={`${job.team} · ${job.type}`}
        title={job.title}
        body={job.summary}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "/careers" },
          { label: job.title, href: `/careers/${job.slug}` },
        ]}
      >
        <Button href={`mailto:${site.email}?subject=${encodeURIComponent(job.title)}`} size="lg">
          Apply by email
          <Arrow />
        </Button>
      </PageHero>

      <section className="shell grid gap-12 py-20 lg:grid-cols-[1.4fr_1fr] md:py-28">
        <div className="space-y-12">
          <Reveal>
            <h2 className="display text-[clamp(1.75rem,3.4vw,2.5rem)]">What you&apos;ll do</h2>
            <ul className="mt-6 space-y-3">
              {job.responsibilities.map((r) => (
                <li key={r} className="flex items-start gap-3 text-[1.0625rem] leading-relaxed text-fg-muted">
                  <span className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-brand" />
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="display text-[clamp(1.75rem,3.4vw,2.5rem)]">What we&apos;re looking for</h2>
            <ul className="mt-6 space-y-3">
              {job.requirements.map((r) => (
                <li key={r} className="flex items-start gap-3 text-[1.0625rem] leading-relaxed text-fg-muted">
                  <span className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-brand" />
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <dl className="divide-y divide-[var(--line)] rounded-3xl border border-line bg-bg-elevated px-7">
            {[
              ["Team", job.team],
              ["Location", job.location],
              ["Type", job.type],
              ["Band", job.salary],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-4 py-5">
                <dt className="label text-fg-faint">{k}</dt>
                <dd className="text-[0.9375rem] text-fg">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-[0.875rem] leading-relaxed text-fg-faint">
            Send work, not a cover letter. Two-hour take-home maximum, paid at day rate if
            it goes beyond that.
          </p>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
