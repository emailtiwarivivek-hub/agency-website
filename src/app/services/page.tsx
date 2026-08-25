import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Arrow, Button, Reveal } from "@/components/ui";
import { CtaBand } from "@/components/home/cta-band";
import { PricingCards } from "@/components/home/pricing-cards";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Brand, performance media, creative studio, lifecycle, measurement and web — six disciplines run as one connected growth system.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title={
          <>
            Everything that <span className="text-brand">moves</span> the number
          </>
        }
        body="You can buy any of these on their own. They work considerably better bought together, because the handoffs between them are where most growth programmes quietly fall apart."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }]}
      >
        <Button href="/contact" size="lg">
          Scope an engagement
          <Arrow />
        </Button>
      </PageHero>

      <div className="shell py-20 md:py-28">
        <div className="space-y-5">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={0.04}>
              <article id={s.slug} className="scroll-mt-28 rounded-3xl border border-line bg-bg-elevated p-8 md:p-12">
                <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr]">
                  <div>
                    <span className="label text-fg-faint">{s.number}</span>
                    <h2 className="display mt-4 text-[clamp(2rem,4.5vw,3.25rem)]">{s.title}</h2>
                    <p className="round mt-4 text-lg text-brand">{s.short}</p>
                    <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-fg-muted">{s.summary}</p>

                    <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-[0.9375rem] text-fg-muted">
                          <span className="mt-[0.5rem] size-1.5 shrink-0 rounded-full bg-brand" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-line bg-bg-subtle p-7">
                    <h3 className="label text-fg-faint">What you get</h3>
                    <ul className="mt-5 divide-y divide-[var(--line)]">
                      {s.deliverables.map((d, n) => (
                        <li key={d} className="flex items-center gap-4 py-4">
                          <span className="label w-6 text-brand">{String(n + 1).padStart(2, "0")}</span>
                          <span className="text-[0.9375rem] text-fg">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="border-y border-line bg-bg-subtle">
        <PricingCards />
      </div>

      <CtaBand />
    </>
  );
}
