import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/ui";
import { FaqAccordion } from "@/components/home/faq-accordion";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a 30-minute call with GrowthLab. No pitch deck — your numbers on screen and an honest read.",
};

const steps = [
  "A partner replies within one working day, usually with a couple of questions.",
  "Thirty-minute call with your numbers on screen. No deck, no discovery theatre.",
  "If it's a fit, you get a written plan with a forecast inside a week.",
];

export default function ContactPage() {
  const details = [
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
    { label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    { label: "Studio", value: site.address },
    { label: "Hours", value: "Mon–Fri, 9:30–18:30 IST" },
  ];

  return (
    <>
      <PageHero
        label="Contact"
        title={
          <>
            Tell us what&apos;s <span className="text-brand">stuck</span>
          </>
        }
        body="Every enquiry is read by a partner. If we are not the right fit we will usually point you to someone who is."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact", href: "/contact" }]}
      />

      <section className="shell py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <ContactForm />

          <div className="space-y-8">
            <Reveal>
              <div className="rounded-3xl border border-line bg-bg-subtle p-7">
                <h2 className="label text-fg-faint">What happens next</h2>
                <ol className="mt-6 space-y-5">
                  {steps.map((step, i) => (
                    <li key={step} className="flex gap-4">
                      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand text-[0.75rem] font-semibold text-white">
                        {i + 1}
                      </span>
                      <span className="text-[0.9375rem] leading-relaxed text-fg-muted">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <dl className="divide-y divide-[var(--line)] rounded-3xl border border-line bg-bg-elevated px-7">
                {details.map((d) => (
                  <div key={d.label} className="py-5">
                    <dt className="label text-fg-faint">{d.label}</dt>
                    <dd className="mt-2 text-[0.9375rem] text-fg">
                      {d.href ? (
                        <a href={d.href} className="transition-colors hover:text-brand">
                          {d.value}
                        </a>
                      ) : (
                        d.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <FaqAccordion limit={6} />
    </>
  );
}
