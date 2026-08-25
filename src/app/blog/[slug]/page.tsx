import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { Arrow, Reveal } from "@/components/ui";
import { CtaBand } from "@/components/home/cta-band";
import { formatDate, getAllPosts, getPost, getPostSlugs } from "@/lib/blog";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = getAllPosts().filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero
        label={`${post.category} · ${post.readingTime}`}
        title={post.title}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.category, href: "/blog" },
        ]}
      />

      <article className="shell py-16 md:py-24">
        <Reveal className="flex flex-wrap items-center gap-4 border-b border-line pb-8 text-[0.875rem] text-fg-muted">
          <span className="grid size-10 place-items-center rounded-full bg-brand-soft text-[0.75rem] font-semibold text-brand">
            {post.author.split(" ").map((w) => w[0]).join("")}
          </span>
          <span className="text-fg">{post.author}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-10 text-[1.25rem] leading-relaxed text-fg">{post.excerpt}</p>
          <div
            className="prose-growthlab mt-10 max-w-3xl"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </Reveal>
      </article>

      <section className="border-t border-line bg-bg-subtle py-20">
        <div className="shell">
          <h2 className="display text-[clamp(1.75rem,3.4vw,2.5rem)]">Keep reading</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {others.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex flex-col rounded-2xl border border-line bg-bg-elevated p-6 transition-all hover:-translate-y-1 hover:border-brand"
              >
                <span className="label text-brand">{p.category}</span>
                <h3 className="display mt-4 flex-1 text-xl leading-tight transition-colors group-hover:text-brand">
                  {p.title}
                </h3>
                <span className="mt-5 inline-flex items-center gap-2 text-[0.875rem] text-fg-muted">
                  {p.readingTime}
                  <Arrow />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
