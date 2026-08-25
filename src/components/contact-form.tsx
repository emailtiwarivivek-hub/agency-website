"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Arrow } from "./ui";

const budgets = ["Under $10k/mo", "$10k–$25k/mo", "$25k–$60k/mo", "$60k+/mo", "Not sure yet"];
const interests = ["Brand", "Performance media", "Creative studio", "Lifecycle", "Measurement", "Web"];

const field =
  "w-full rounded-xl border border-line bg-bg px-4 py-3.5 text-[0.9375rem] text-fg placeholder:text-fg-faint transition-colors focus:border-brand focus:outline-none";

export function ContactForm() {
  const [selected, setSelected] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const toggle = (item: string) =>
    setSelected((prev) => (prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]));

  // Demo only — wire this to a route handler, your CRM or a form provider.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="rounded-3xl border border-line bg-bg-elevated p-7 md:p-9">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-14 text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-brand-soft text-brand">
              <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 13 4 4 10-11" />
              </svg>
            </span>
            <h3 className="display mt-6 text-3xl">Got it</h3>
            <p className="mx-auto mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-fg-muted">
              A partner replies within one working day — usually with two or three questions
              before we book anything.
            </p>
            <button type="button" onClick={() => setSent(false)} className="mt-7 text-[0.875rem] font-medium text-brand hover:underline">
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={onSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="label mb-2.5 block text-fg-faint">Name</span>
                <input required name="name" className={field} placeholder="Priya Raghunathan" />
              </label>
              <label className="block">
                <span className="label mb-2.5 block text-fg-faint">Work email</span>
                <input required type="email" name="email" className={field} placeholder="you@company.com" />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="label mb-2.5 block text-fg-faint">Company</span>
                <input name="company" className={field} placeholder="Company name" />
              </label>
              <label className="block">
                <span className="label mb-2.5 block text-fg-faint">Monthly media budget</span>
                <select name="budget" className={field} defaultValue="">
                  <option value="" disabled>
                    Select a range
                  </option>
                  {budgets.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </label>
            </div>

            <div>
              <span className="label mb-3 block text-fg-faint">What do you need help with?</span>
              <div className="flex flex-wrap gap-2">
                {interests.map((item) => {
                  const on = selected.includes(item);
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => toggle(item)}
                      aria-pressed={on}
                      className={`rounded-full border px-4 py-2 text-[0.875rem] transition-colors ${
                        on ? "border-brand bg-brand text-white" : "border-line text-fg-muted hover:border-brand hover:text-brand"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
              <input type="hidden" name="interests" value={selected.join(", ")} />
            </div>

            <label className="block">
              <span className="label mb-2.5 block text-fg-faint">What&apos;s the constraint right now?</span>
              <textarea
                name="message"
                rows={4}
                className={`${field} resize-none`}
                placeholder="A sentence or two is plenty. What's stuck, and what have you already tried?"
              />
            </label>

            <button
              type="submit"
              className="group inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand px-8 text-base font-medium text-white transition-all hover:bg-brand-strong hover:-translate-y-0.5 sm:w-auto"
            >
              Send it over
              <Arrow />
            </button>

            <p className="text-[0.8125rem] text-fg-faint">
              Demo form — no data leaves the browser. Connect it to your CRM or a route
              handler before launch.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
