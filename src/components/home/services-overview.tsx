"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { services } from "@/lib/content";
import { Arrow, Reveal, SectionHeading } from "@/components/ui";

export function ServicesOverview() {
  const [active, setActive] = useState<string | null>(services[0].slug);

  return (
    <section className="shell py-24 md:py-32">
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          label="What we do"
          title={
            <>
              Six disciplines,
              <br />
              <span className="outline-text">one system</span>
            </>
          }
        />
        <Reveal delay={0.1} className="max-w-sm">
          <p className="text-lg leading-relaxed text-fg-muted">
            Most agencies sell you a channel. We sell you the connective tissue between
            them, because that is where the compounding actually happens.
          </p>
          <Link href="/services" className="group mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-brand">
            All services
            <Arrow />
          </Link>
        </Reveal>
      </div>

      <div className="mt-16 border-t border-line">
        {services.map((s, i) => {
          const open = active === s.slug;
          return (
            <Reveal key={s.slug} delay={i * 0.04}>
              <Link
                href={`/services#${s.slug}`}
                onMouseEnter={() => setActive(s.slug)}
                onFocus={() => setActive(s.slug)}
                className="group block border-b border-line py-7 transition-colors hover:bg-bg-subtle/60"
              >
                <div className="flex items-center gap-5 md:gap-10">
                  <span className="label w-8 shrink-0 text-fg-faint transition-colors group-hover:text-brand">
                    {s.number}
                  </span>
                  <h3
                    className={`display flex-1 text-[clamp(1.75rem,4.6vw,3.5rem)] transition-colors ${
                      open ? "text-brand" : "text-fg"
                    }`}
                  >
                    {s.title}
                  </h3>
                  <span className="hidden max-w-xs flex-1 text-[0.9375rem] leading-relaxed text-fg-muted lg:block">
                    {s.short}
                  </span>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-fg-muted transition-all group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                    <Arrow />
                  </span>
                </div>

                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.21, 0.6, 0.35, 1] }}
                      className="overflow-hidden lg:pl-[3.25rem]"
                    >
                      <div className="flex flex-wrap gap-2 pt-5">
                        {s.bullets.map((b) => (
                          <span
                            key={b}
                            className="round rounded-full border border-line bg-bg-elevated px-4 py-2 text-[0.8125rem] text-fg-muted"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
