import site from "@/content/data/site.json";
import services from "@/content/data/services.json";
import projects from "@/content/data/projects.json";
import testimonials from "@/content/data/testimonials.json";
import pricing from "@/content/data/pricing.json";
import faqs from "@/content/data/faqs.json";
import team from "@/content/data/team.json";
import values from "@/content/data/values.json";
import milestones from "@/content/data/milestones.json";
import jobs from "@/content/data/jobs.json";

export { site, services, projects, testimonials, pricing, faqs, team, values, milestones, jobs };

export type Service = (typeof services)[number];
export type Project = (typeof projects)[number];
export type Plan = (typeof pricing)[number];
export type Job = (typeof jobs)[number];
export type Testimonial = (typeof testimonials)[number];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getPlan(slug: string) {
  return pricing.find((p) => p.slug === slug);
}

export function getJob(slug: string) {
  return jobs.find((j) => j.slug === slug);
}

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
