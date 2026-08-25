"use client";

import { Arrow, Button, Reveal } from "@/components/ui";
import { site } from "@/lib/content";

export function CtaBand() {
  return (
    <section className="shell py-24 md:py-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-bg-elevated px-7 py-20 text-center md:px-16 md:py-28">
          <div className="grid-lines" aria-hidden />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-52 h-96 opacity-40 blur-[110px]"
            style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 60%)" }}
          />
          <h2 className="display relative mx-auto max-w-[14ch] text-[clamp(2.75rem,8vw,6.5rem)]">
            Let&apos;s find the constraint
          </h2>
          <p className="relative mx-auto mt-7 max-w-xl text-lg leading-relaxed text-fg-muted">
            Thirty minutes, your numbers on screen, and a straight answer about whether we
            are the right people for it.
          </p>
          <div className="relative mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/contact" size="lg" className="w-full sm:w-auto">
              Book a call
              <Arrow />
            </Button>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex h-14 items-center justify-center rounded-full border border-line-strong px-8 text-base font-medium text-fg transition-all hover:-translate-y-0.5 hover:border-brand hover:text-brand"
            >
              {site.email}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
