import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { Arrow, Reveal } from "@/components/ui";
import { CtaBand } from "@/components/home/cta-band";
import { getProject, projects } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: "Project not found" };
  return { title: `${p.client} — ${p.title}`, description: p.blurb };
}

const sections = [
  { key: "challenge", label: "The challenge" },
  { key: "approach", label: "What we did" },
  { key: "outcome", label: "The outcome" },
] as const;

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <PageHero
        label={`${project.client} · ${project.sector}`}
        title={project.headline}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: project.client, href: `/projects/${project.slug}` },
        ]}
      />

      <section className="shell py-16 md:py-24">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl border border-line p-8 md:p-14"
            style={{ background: `linear-gradient(140deg, ${project.hue}, ${project.hue2})` }}
          >
            <div className="noise" aria-hidden />
            <div className="relative grid gap-10 text-white md:grid-cols-3">
              <div>
                <p className="display text-[clamp(3.5rem,9vw,6rem)] leading-none">{project.metric}</p>
                <p className="mt-3 max-w-xs text-[0.9375rem] text-white/85">{project.metricLabel}</p>
              </div>
              {project.secondary.map((s) => (
                <div key={s.label} className="self-end">
                  <p className="display text-[clamp(2rem,4.5vw,3rem)] leading-none">{s.value}</p>
                  <p className="mt-2 text-[0.875rem] text-white/80">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <dl className="divide-y divide-[var(--line)] border-y border-line">
              {[
                ["Client", project.client],
                ["Sector", project.sector],
                ["Year", project.year],
                ["Duration", project.duration],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-4 py-4">
                  <dt className="label text-fg-faint">{k}</dt>
                  <dd className="text-[0.9375rem] text-fg">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.services.map((s) => (
                <span key={s} className="rounded-full border border-line px-4 py-2 text-[0.8125rem] text-fg-muted">
                  {s}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="space-y-12">
            {sections.map((s, i) => (
              <Reveal key={s.key} delay={i * 0.06}>
                <h2 className="display text-[clamp(1.75rem,3.4vw,2.5rem)]">{s.label}</h2>
                <p className="mt-5 text-[1.0625rem] leading-relaxed text-fg-muted">{project[s.key]}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-bg-subtle py-16">
        <div className="shell">
          <Link href={`/projects/${next.slug}`} className="group flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="label text-fg-faint">Next project</span>
              <p className="display mt-3 text-[clamp(2rem,5vw,3.5rem)] transition-colors group-hover:text-brand">
                {next.client}
              </p>
            </div>
            <span className="grid size-14 shrink-0 place-items-center rounded-full border border-line text-fg transition-all group-hover:border-brand group-hover:bg-brand group-hover:text-white">
              <Arrow className="size-5" />
            </span>
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
