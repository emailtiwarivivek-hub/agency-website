"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Label } from "./ui";

export function PageHero({
  label,
  title,
  body,
  crumbs,
  children,
  align = "left",
}: {
  label: string;
  title: ReactNode;
  body?: ReactNode;
  crumbs?: { label: string; href: string }[];
  children?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <section className="relative overflow-hidden border-b border-line pb-16 pt-14 md:pb-24 md:pt-20">
      <div className="grid-lines" aria-hidden />
      <div className="noise" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-24rem] -z-10 h-[34rem] w-[56rem] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 65%)" }}
      />

      <div className={`shell relative ${align === "center" ? "text-center" : ""}`}>
        {crumbs ? (
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 text-[0.8125rem] text-fg-faint">
            {crumbs.map((c, i) => (
              <span key={c.href} className="flex items-center gap-2">
                {i > 0 ? <span aria-hidden>/</span> : null}
                <Link href={c.href} className="transition-colors hover:text-brand">
                  {c.label}
                </Link>
              </span>
            ))}
          </nav>
        ) : null}

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Label className={align === "center" ? "justify-center" : ""}>{label}</Label>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className={`display mt-7 text-[clamp(2.75rem,8vw,6.5rem)] ${align === "center" ? "mx-auto max-w-[16ch]" : "max-w-[15ch]"}`}
        >
          {title}
        </motion.h1>

        {body ? (
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className={`mt-7 text-lg leading-relaxed text-fg-muted md:text-xl ${align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"}`}
          >
            {body}
          </motion.p>
        ) : null}

        {children ? (
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.24 }}
            className="mt-10"
          >
            {children}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
