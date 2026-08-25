import Link from "next/link";
import { Logo } from "./logo";
import { services, site } from "@/lib/content";

const columns = [
  {
    title: "Services",
    links: services.map((s) => ({ label: s.title, href: `/services#${s.slug}` })),
  },
  {
    title: "Studio",
    links: [
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "More",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Style guide", href: "/style-guide" },
      { label: "Checkout demo", href: "/checkout" },
      { label: "Members area", href: "/401" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg-subtle">
      <div className="shell pb-10 pt-20 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-sm">
            <Logo width={190} />
            <p className="mt-6 text-[0.95rem] leading-relaxed text-fg-muted">
              A creative marketing studio in Bengaluru working with consumer and B2B teams
              who care more about contribution margin than impressions.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {site.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="label rounded-full border border-line px-4 py-2 text-fg-muted transition-colors hover:border-brand hover:text-brand"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="label text-fg-faint">{col.title}</h3>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-[0.95rem] text-fg-muted transition-colors hover:text-brand">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 text-[0.8125rem] text-fg-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-brand">
              {site.email}
            </a>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-brand">
              {site.phone}
            </a>
          </div>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="display translate-y-[22%] whitespace-nowrap text-center text-[clamp(4rem,19vw,17rem)] leading-[0.8] text-fg opacity-[0.06]">
          {site.name}
        </p>
      </div>
    </footer>
  );
}
