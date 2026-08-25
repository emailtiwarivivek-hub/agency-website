"use client";

import { testimonials } from "@/lib/content";
import { Marquee, SectionHeading } from "@/components/ui";

function Card({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figure className="mx-2.5 flex h-full w-[21rem] flex-col rounded-2xl border border-line bg-bg-elevated p-7 md:w-[25rem]">
      <div className="flex gap-1 text-brand" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} viewBox="0 0 20 20" className="size-4" fill="currentColor">
            <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5Z" />
          </svg>
        ))}
      </div>
      <blockquote className="mt-5 flex-1 text-[1.0625rem] leading-relaxed text-fg">{t.quote}</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-soft text-[0.8125rem] font-semibold text-brand">
          {t.initials}
        </span>
        <span>
          <span className="block text-[0.9375rem] font-medium text-fg">{t.name}</span>
          <span className="block text-[0.8125rem] text-fg-faint">
            {t.role}, {t.company}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export function TestimonialWall() {
  const half = Math.ceil(testimonials.length / 2);
  const rowA = testimonials.slice(0, half);
  const rowB = testimonials.slice(half);

  return (
    <section className="overflow-hidden py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          label="Client reviews"
          align="center"
          title="The reviews we would want to read"
        />
      </div>

      <div className="mt-16 space-y-5 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <Marquee items={rowA.map((t) => <Card key={t.name} t={t} />)} />
        <Marquee reverse slow items={rowB.map((t) => <Card key={t.name} t={t} />)} />
      </div>
    </section>
  );
}
