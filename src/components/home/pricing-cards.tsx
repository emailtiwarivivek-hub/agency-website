"use client";

import Link from "next/link";
import { pricing } from "@/lib/content";
import { Arrow, Reveal, SectionHeading } from "@/components/ui";

function Tick() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 size-4 shrink-0 text-brand" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m4 10.5 4 4 8-9" />
    </svg>
  );
}

export function PricingCards({ heading = true }: { heading?: boolean }) {
  return (
    <section id="pricing" className="shell scroll-mt-28 py-24 md:py-32">
      {heading ? (
        <SectionHeading
          label="Engagements"
          align="center"
          title="Flat fees, published up front"
          body="We do not take a cut of your media budget. Fees are the same whether you spend more or less, so our advice can be too."
        />
      ) : null}

      <div className={`grid gap-5 lg:grid-cols-3 ${heading ? "mt-16" : ""}`}>
        {pricing.map((plan, i) => (
          <Reveal key={plan.slug} delay={i * 0.08} className="h-full">
            <div
              className={`relative flex h-full flex-col rounded-3xl border p-8 md:p-9 ${
                plan.featured
                  ? "border-brand bg-bg-elevated shadow-[0_30px_80px_-40px_var(--brand-glow)]"
                  : "border-line bg-bg-elevated"
              }`}
            >
              {plan.featured ? (
                <span className="label absolute -top-3 left-8 rounded-full bg-brand px-4 py-1.5 text-white">
                  Most partners start here
                </span>
              ) : null}

              <h3 className="display text-3xl">{plan.name}</h3>
              <p className="round mt-2 text-[0.9375rem] text-brand">{plan.tagline}</p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-fg-muted">{plan.description}</p>

              <p className="mt-8 flex items-baseline gap-2">
                <span className="display text-[3.25rem]">{plan.price}</span>
                <span className="text-[0.9375rem] text-fg-faint">{plan.cadence}</span>
              </p>

              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3 text-[0.9375rem] text-fg-muted">
                    <Tick />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-2">
                <Link
                  href="/contact"
                  className={`group inline-flex h-12 items-center justify-center gap-2 rounded-full text-[0.9375rem] font-medium transition-all hover:-translate-y-0.5 ${
                    plan.featured ? "bg-brand text-white hover:bg-brand-strong" : "border border-line-strong text-fg hover:border-brand"
                  }`}
                >
                  {plan.cta}
                  <Arrow />
                </Link>
                <Link
                  href={`/pricing/${plan.slug}`}
                  className="text-center text-[0.8125rem] text-fg-faint transition-colors hover:text-brand"
                >
                  What&apos;s included in detail
                </Link>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
