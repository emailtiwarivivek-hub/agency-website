"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Arrow } from "./ui";
import { pricing } from "@/lib/content";

const addOns = [
  { id: "studio", label: "Extra studio capacity", price: 4000, note: "+20 concepts per month" },
  { id: "measurement", label: "Measurement rebuild", price: 6500, note: "One-off, six weeks" },
  { id: "workshop", label: "In-house team training", price: 2500, note: "Two days, quarterly" },
];

const field =
  "w-full rounded-xl border border-line bg-bg px-4 py-3.5 text-[0.9375rem] text-fg placeholder:text-fg-faint transition-colors focus:border-brand focus:outline-none";

export function CheckoutClient() {
  const [planSlug, setPlanSlug] = useState("retainer");
  const [selected, setSelected] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const plan = pricing.find((p) => p.slug === planSlug)!;
  const base = plan.price === "Custom" ? 0 : parseInt(plan.price.replace(/[^0-9]/g, ""), 10) * 1000;
  const extras = addOns.filter((a) => selected.includes(a.id)).reduce((n, a) => n + a.price, 0);
  const total = base + extras;

  const money = (n: number) => `$${n.toLocaleString("en-US")}`;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
      <div className="space-y-8">
        <div className="rounded-3xl border border-line bg-bg-elevated p-7 md:p-8">
          <h2 className="label text-fg-faint">1 — Choose an engagement</h2>
          <div className="mt-6 grid gap-3">
            {pricing.map((p) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => setPlanSlug(p.slug)}
                aria-pressed={planSlug === p.slug}
                className={`flex items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition-colors ${
                  planSlug === p.slug ? "border-brand bg-brand-soft" : "border-line hover:border-line-strong"
                }`}
              >
                <span>
                  <span className="block text-[1.0625rem] font-medium text-fg">{p.name}</span>
                  <span className="block text-[0.8125rem] text-fg-muted">{p.tagline}</span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="block text-[1.0625rem] font-semibold text-fg">{p.price}</span>
                  <span className="block text-[0.75rem] text-fg-faint">{p.cadence}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-line bg-bg-elevated p-7 md:p-8">
          <h2 className="label text-fg-faint">2 — Add-ons</h2>
          <div className="mt-6 grid gap-3">
            {addOns.map((a) => {
              const on = selected.includes(a.id);
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setSelected((prev) => (on ? prev.filter((x) => x !== a.id) : [...prev, a.id]))}
                  aria-pressed={on}
                  className={`flex items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition-colors ${
                    on ? "border-brand bg-brand-soft" : "border-line hover:border-line-strong"
                  }`}
                >
                  <span className="flex items-center gap-4">
                    <span
                      className={`grid size-5 shrink-0 place-items-center rounded-md border ${
                        on ? "border-brand bg-brand text-white" : "border-line-strong"
                      }`}
                    >
                      {on ? (
                        <svg viewBox="0 0 20 20" className="size-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m4 10.5 4 4 8-9" />
                        </svg>
                      ) : null}
                    </span>
                    <span>
                      <span className="block text-[0.9375rem] text-fg">{a.label}</span>
                      <span className="block text-[0.75rem] text-fg-faint">{a.note}</span>
                    </span>
                  </span>
                  <span className="shrink-0 text-[0.9375rem] text-fg-muted">+{money(a.price)}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-line bg-bg-elevated p-7 md:p-8">
          <h2 className="label text-fg-faint">3 — Billing contact</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <input className={field} placeholder="Full name" />
            <input className={field} placeholder="Work email" type="email" />
            <input className={field} placeholder="Company" />
            <input className={field} placeholder="VAT / GSTIN (optional)" />
          </div>
        </div>
      </div>

      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-3xl border border-line bg-bg-subtle p-7">
          <h2 className="label text-fg-faint">Summary</h2>

          <div className="mt-6 space-y-3 border-b border-line pb-6">
            <Row label={`${plan.name} engagement`} value={plan.price === "Custom" ? "Custom" : money(base)} />
            {addOns
              .filter((a) => selected.includes(a.id))
              .map((a) => (
                <Row key={a.id} label={a.label} value={money(a.price)} muted />
              ))}
          </div>

          <div className="flex items-baseline justify-between pt-6">
            <span className="text-[0.9375rem] text-fg-muted">
              {plan.cadence === "one-off" ? "Total" : "Per month"}
            </span>
            <span className="display text-3xl">{plan.price === "Custom" ? "Custom" : money(total)}</span>
          </div>

          <button
            type="button"
            onClick={() => setDone(true)}
            className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand py-4 text-[0.9375rem] font-medium text-white transition-all hover:bg-brand-strong"
          >
            Request this scope
            <Arrow />
          </button>

          <p className="mt-4 text-[0.75rem] leading-relaxed text-fg-faint">
            Demo checkout — nothing is charged and no data leaves the browser. Media budget
            is paid by you directly to the platforms.
          </p>
        </div>

        <AnimatePresence>
          {done ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 rounded-2xl border border-brand bg-brand-soft p-5 text-[0.875rem] leading-relaxed text-fg"
            >
              Scope captured. In the real build this would post to your CRM and open a
              calendar link.
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Row({ label, value, muted = false }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className={`text-[0.9375rem] ${muted ? "text-fg-faint" : "text-fg"}`}>{label}</span>
      <span className={`text-[0.9375rem] tabular-nums ${muted ? "text-fg-faint" : "text-fg"}`}>{value}</span>
    </div>
  );
}
