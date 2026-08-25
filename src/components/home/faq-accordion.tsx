"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs } from "@/lib/content";
import { Reveal, SectionHeading } from "@/components/ui";

export function FaqAccordion({ limit }: { limit?: number }) {
  const [open, setOpen] = useState<number | null>(0);
  const items = limit ? faqs.slice(0, limit) : faqs;

  return (
    <section id="faq" className="scroll-mt-28 border-y border-line bg-bg-subtle py-24 md:py-32">
      <div className="shell grid gap-14 lg:grid-cols-[0.85fr_1.3fr]">
        <SectionHeading
          label="Questions"
          title={
            <>
              Asked on
              <br />
              every first call
            </>
          }
          body="If yours is not here, ask it directly — a partner answers every email."
        />

        <Reveal delay={0.1}>
          <div className="border-t border-line">
            {items.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className={`text-[1.0625rem] font-medium transition-colors ${isOpen ? "text-brand" : "text-fg"}`}>
                      {f.q}
                    </span>
                    <span
                      className={`grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                        isOpen ? "rotate-45 border-brand bg-brand text-white" : "border-line text-fg-muted"
                      }`}
                    >
                      <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M8 3v10M3 8h10" />
                      </svg>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.21, 0.6, 0.35, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-7 pr-12 text-[0.9375rem] leading-relaxed text-fg-muted">{f.a}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
