"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Arrow, Reveal } from "@/components/ui";
import type { Post } from "@/lib/blog";

export function BlogList({ posts, categories }: { posts: Post[]; categories: string[] }) {
  const [active, setActive] = useState("All");
  const filtered = useMemo(
    () => (active === "All" ? posts : posts.filter((p) => p.category === active)),
    [active, posts],
  );

  return (
    <section className="shell py-16 md:py-24">
      <Reveal className="flex flex-wrap gap-2">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            aria-pressed={active === c}
            className={`label rounded-full border px-4 py-2.5 transition-colors ${
              active === c ? "border-brand bg-brand text-white" : "border-line text-fg-muted hover:border-brand hover:text-brand"
            }`}
          >
            {c}
          </button>
        ))}
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 0.06} className="h-full">
            <Link
              href={`/blog/${p.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-line bg-bg-elevated p-7 transition-all hover:-translate-y-1 hover:border-brand"
            >
              <div className="flex items-center gap-3 text-[0.75rem] text-fg-faint">
                <span className="label text-brand">{p.category}</span>
                <span>·</span>
                <span>{p.readingTime}</span>
              </div>
              <h2 className="display mt-5 text-2xl leading-tight transition-colors group-hover:text-brand">{p.title}</h2>
              <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-fg-muted">{p.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-[0.875rem] font-medium text-fg">
                Read
                <Arrow />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-fg-muted">Nothing filed under {active} yet.</p>
      ) : null}
    </section>
  );
}
