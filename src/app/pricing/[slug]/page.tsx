import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { Arrow, Button, Reveal } from "@/components/ui";
import { CtaBand } from "@/components/home/cta-band";
import { getPlan, pricing } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return pricing.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const plan = getPlan(slug);
  if (!plan) return { title: "Plan not found" };
  return { title: `${plan.name} engagement`, description: plan.description };
}

export default async function PlanPage({ params }: Params) {
  const { slug } = await params;
  const plan = getPlan(slug);
  if (!plan) notFound();

  return (
    <>
      <PageHero
        label={`${plan.price} · ${plan.cadence}`}
        title={plan.name}
        body={plan.tagline}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Pricing", href: "/pricing" },
          { label: plan.name, href: `/pricing/${plan.slug}` },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/checkout" size="lg">
            {plan.cta}
            <Arrow />
          </Button>
          <Button href="/pricing" variant="outline" size="lg">
            Compare plans
          </Button>
        </div>
      </PageHero>

      <section className="shell grid gap-12 py-20 lg:grid-cols-[1.3fr_1fr] md:py-28">
        <div className="space-y-12">
          <Reveal>
            <h2 className="display text-[clamp(1.75rem,3.4vw,2.5rem)]">What&apos;s included</h2>
            <ul className="mt-7 divide-y divide-[var(--line)] border-y border-line">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-4 py-4">
                  <svg viewBox="0 0 20 20" className="mt-1 size-4 shrink-0 text-brand" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m4 10.5 4 4 8-9" />
                  </svg>
                  <span className="text-[1.0625rem] text-fg">{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="display text-[clamp(1.75rem,3.4vw,2.5rem)]">Not included</h2>
            <ul className="mt-7 space-y-3">
              {plan.notIncluded.map((f) => (
                <li key={f} className="flex items-start gap-4 text-[0.9375rem] text-fg-muted">
                  <span className="mt-2 h-px w-4 shrink-0 bg-fg-faint" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-line bg-bg-elevated p-8">
            <h2 className="label text-fg-faint">How it runs</h2>
            <ol className="mt-6 space-y-6">
              {plan.timeline.map((t, i) => (
                <li key={t} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-soft text-[0.75rem] font-semibold text-brand">
                    {i + 1}
                  </span>
                  <span className="text-[0.9375rem] leading-relaxed text-fg-muted">{t}</span>
                </li>
              ))}
            </ol>

            <div className="mt-8 border-t border-line pt-6">
              <p className="flex items-baseline gap-2">
                <span className="display text-4xl">{plan.price}</span>
                <span className="text-[0.875rem] text-fg-faint">{plan.cadence}</span>
              </p>
              <Link
                href="/contact"
                className="group mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand text-[0.9375rem] font-medium text-white transition-all hover:bg-brand-strong"
              >
                {plan.cta}
                <Arrow />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
