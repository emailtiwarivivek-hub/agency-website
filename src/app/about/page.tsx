import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Arrow, Button, Marquee, Reveal, SectionHeading } from "@/components/ui";
import { StatsBand } from "@/components/home/stats-band";
import { PinnedQuote } from "@/components/home/pinned-quote";
import { CtaBand } from "@/components/home/cta-band";
import { milestones, site, team, values } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "A creative marketing studio in Bengaluru. Small senior team, flat fees, uncomfortable honesty about what is working.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        title={
          <>
            A small studio that says the <span className="text-brand">expensive thing</span>
          </>
        }
        body={`GrowthLab started in ${site.founded} because we kept meeting good companies being sold channel work when they had a positioning problem. Fourteen people later, that is still the pitch.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }]}
      >
        <Button href="/careers" size="lg">
          We&apos;re hiring
          <Arrow />
        </Button>
      </PageHero>

      <StatsBand />

      <section className="border-t border-line bg-bg-subtle py-24 md:py-32">
        <div className="shell">
          <SectionHeading
            label="Principles"
            title={
              <>
                Six things we
                <br />
                <span className="outline-text">won&apos;t trade away</span>
              </>
            }
            body="These cost us money regularly. We keep them anyway, because they are the reason the work compounds."
          />
          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 0.06} className="bg-bg-elevated p-8">
                <span className="label text-brand">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display mt-5 text-2xl">{v.title}</h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-fg-muted">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PinnedQuote />

      <section className="shell py-24 md:py-32">
        <SectionHeading label="The team" title="Who you actually get" />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={(i % 3) * 0.06}>
              <div className="group rounded-2xl border border-line bg-bg-elevated p-7 transition-colors hover:border-brand">
                <span className="grid size-16 place-items-center rounded-2xl bg-brand-soft text-xl font-semibold text-brand">
                  {m.initials}
                </span>
                <h3 className="display mt-6 text-xl">{m.name}</h3>
                <p className="label mt-2 text-fg-faint">{m.role}</p>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-fg-muted">{m.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-bg-subtle py-24 md:py-32">
        <div className="shell grid gap-14 lg:grid-cols-[0.85fr_1.3fr]">
          <SectionHeading label="Short history" title="How we got here" />
          <Reveal delay={0.08}>
            <ol className="relative border-l border-line pl-9">
              {milestones.map((m) => (
                <li key={m.year} className="relative pb-12 last:pb-0">
                  <span className="absolute -left-[2.6rem] top-1.5 size-3 rounded-full bg-brand ring-4 ring-[var(--bg-subtle)]" />
                  <p className="label text-brand">{m.year}</p>
                  <h3 className="display mt-3 text-2xl">{m.title}</h3>
                  <p className="mt-3 text-[1.0625rem] leading-relaxed text-fg-muted">{m.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <Marquee
          slow
          items={site.clients.map((c) => (
            <span key={c} className="display px-10 text-[clamp(2rem,5vw,4rem)] text-fg opacity-25">
              {c}
            </span>
          ))}
        />
      </section>

      <section className="shell pb-24">
        <Reveal>
          <Link
            href="/careers"
            className="group flex flex-col gap-6 rounded-3xl border border-line bg-bg-elevated p-8 transition-colors hover:border-brand md:flex-row md:items-center md:justify-between md:p-12"
          >
            <div>
              <span className="label text-brand">Careers</span>
              <h2 className="display mt-4 text-[clamp(2rem,4.5vw,3.25rem)]">Three roles open</h2>
              <p className="mt-4 max-w-lg text-[1.0625rem] leading-relaxed text-fg-muted">
                We hire twice a year and read every application ourselves. No take-home
                longer than two hours, salary bands in the first email.
              </p>
            </div>
            <span className="grid size-14 shrink-0 place-items-center rounded-full border border-line text-fg transition-all group-hover:border-brand group-hover:bg-brand group-hover:text-white">
              <Arrow className="size-5" />
            </span>
          </Link>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
