import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  author: string;
  readingTime: string;
  excerpt: string;
};

export type FullPost = Post & { html: string };

function read(slug: string) {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf8");
  return matter(raw);
}

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map((slug) => {
      const { data } = read(slug);
      return { slug, ...(data as Omit<Post, "slug">) };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): FullPost | null {
  if (!getPostSlugs().includes(slug)) return null;
  const { data, content } = read(slug);
  return {
    slug,
    ...(data as Omit<Post, "slug">),
    html: marked.parse(content, { async: false }) as string,
  };
}

export function getCategories(): string[] {
  return Array.from(new Set(getAllPosts().map((p) => p.category))).sort();
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
