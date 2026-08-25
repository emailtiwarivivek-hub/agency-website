"use client";

import { site } from "@/lib/content";
import { Counter, Reveal } from "@/components/ui";

export function StatsBand() {
  return (
    <section className="shell py-24 md:py-28">
      <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {site.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.07} className="bg-bg p-8 md:p-10">
            <p className="display text-[clamp(3rem,6vw,4.5rem)] text-brand">
              <Counter value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-fg-muted">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
