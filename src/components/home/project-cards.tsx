"use client";

import Link from "next/link";
import { projects } from "@/lib/content";
import { Arrow, Reveal, SectionHeading } from "@/components/ui";

export function ProjectCards({ limit = 6, heading = true }: { limit?: number; heading?: boolean }) {
  const items = projects.slice(0, limit);

  return (
    <section className="border-y border-line bg-bg-subtle py-24 md:py-32">
      <div className="shell">
        {heading ? (
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              label="Selected work"
              title={
                <>
                  Numbers with
                  <br />
                  workings attached
                </>
              }
            />
            <Reveal delay={0.1}>
              <Link href="/projects" className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-brand">
                All eight projects
                <Arrow />
              </Link>
            </Reveal>
          </div>
        ) : null}

        <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${heading ? "mt-16" : ""}`}>
          {items.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.08}>
              <div className="flip-scene h-[24rem]">
                <div className="flip-inner rounded-2xl">
                  {/* front */}
                  <div
                    className="flip-face rounded-2xl border border-line"
                    style={{ background: `linear-gradient(145deg, ${p.hue}, ${p.hue2})` }}
                  >
                    <div className="flex h-full flex-col justify-between p-7 text-white">
                      <div className="flex items-start justify-between gap-4">
                        <span className="label rounded-full bg-white/15 px-3 py-1.5 text-white/85 backdrop-blur-sm">
                          {p.sector}
                        </span>
                        <span className="label text-white/70">{p.year}</span>
                      </div>
                      <div>
                        <p className="display text-[3.5rem] leading-none">{p.metric}</p>
                        <p className="mt-2 max-w-[15rem] text-[0.875rem] text-white/85">{p.metricLabel}</p>
                        <p className="display mt-6 text-2xl">{p.client}</p>
                      </div>
                    </div>
                  </div>

                  {/* back */}
                  <div className="flip-face flip-face--back rounded-2xl border border-line bg-bg-elevated">
                    <div className="flex h-full flex-col p-7">
                      <span className="label text-brand">{p.client}</span>
                      <h3 className="display mt-4 text-2xl leading-tight text-fg">{p.title}</h3>
                      <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-fg-muted">{p.blurb}</p>
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {p.services.map((s) => (
                          <span key={s} className="rounded-full border border-line px-3 py-1 text-[0.75rem] text-fg-faint">
                            {s}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/projects/${p.slug}`}
                        className="group mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-brand"
                      >
                        Read the case study
                        <Arrow />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
