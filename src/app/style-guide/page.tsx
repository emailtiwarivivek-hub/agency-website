import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Arrow, Button, Label, Reveal } from "@/components/ui";

export const metadata: Metadata = {
  title: "Style guide",
  description: "Colour tokens, type scale and components used across the GrowthLab site.",
};

const swatches = [
  { name: "brand", token: "--brand", note: "Logo blue #0005DD in light, lifted for dark" },
  { name: "brand-strong", token: "--brand-strong", note: "Hover and active" },
  { name: "brand-soft", token: "--brand-soft", note: "Tinted surfaces" },
  { name: "bg", token: "--bg", note: "Page canvas" },
  { name: "bg-subtle", token: "--bg-subtle", note: "Alternating bands" },
  { name: "bg-elevated", token: "--bg-elevated", note: "Cards" },
  { name: "fg", token: "--fg", note: "Primary text" },
  { name: "fg-muted", token: "--fg-muted", note: "Body copy" },
  { name: "fg-faint", token: "--fg-faint", note: "Meta and labels" },
  { name: "line", token: "--line", note: "Default borders" },
];

const scale = [
  { name: "Display XL", cls: "display text-[clamp(3rem,8vw,6rem)]", sample: "Compounds" },
  { name: "Display L", cls: "display text-[clamp(2rem,5vw,3.5rem)]", sample: "Section heading" },
  { name: "Display M", cls: "display text-2xl", sample: "Card heading" },
  { name: "Body L", cls: "text-lg text-fg-muted", sample: "Lead paragraph copy for section intros." },
  { name: "Body", cls: "text-[0.9375rem] text-fg-muted", sample: "Default body copy used across cards and lists." },
  { name: "Label", cls: "label text-brand", sample: "Section label" },
  { name: "Round", cls: "round text-lg", sample: "Varela Round accent copy" },
];

export default function StyleGuidePage() {
  return (
    <>
      <PageHero
        label="Style guide"
        title="The system"
        body="Every colour is a CSS custom property defined twice — once for dark, once for light. Change --brand and the whole site re-skins."
        crumbs={[{ label: "Home", href: "/" }, { label: "Style guide", href: "/style-guide" }]}
      />

      <section className="shell py-16 md:py-24">
        <Reveal>
          <h2 className="display text-3xl">Colour</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {swatches.map((s) => (
              <div key={s.name} className="overflow-hidden rounded-2xl border border-line">
                <div className="h-24" style={{ background: `var(${s.token})` }} />
                <div className="bg-bg-elevated p-4">
                  <p className="text-[0.875rem] font-medium text-fg">{s.name}</p>
                  <p className="mt-1 font-mono text-[0.6875rem] text-fg-faint">{s.token}</p>
                  <p className="mt-2 text-[0.75rem] leading-relaxed text-fg-muted">{s.note}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.06} className="mt-20">
          <h2 className="display text-3xl">Type</h2>
          <div className="mt-8 divide-y divide-[var(--line)] border-y border-line">
            {scale.map((t) => (
              <div key={t.name} className="grid gap-4 py-7 md:grid-cols-[10rem_1fr] md:items-baseline">
                <p className="label text-fg-faint">{t.name}</p>
                <p className={t.cls}>{t.sample}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[0.875rem] text-fg-faint">
            Anton for display, Geist for interface and body, Exo for labels, Varela Round for
            accents. All self-hosted — no external font requests.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-20">
          <h2 className="display text-3xl">Components</h2>

          <div className="mt-8 space-y-10">
            <div>
              <Label>Buttons</Label>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button href="#">
                  Primary
                  <Arrow />
                </Button>
                <Button href="#" variant="outline">
                  Outline
                </Button>
                <Button href="#" variant="invert">
                  Invert
                </Button>
                <Button href="#" size="lg">
                  Large
                  <Arrow />
                </Button>
              </div>
            </div>

            <div>
              <Label>Surfaces</Label>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {["bg", "bg-subtle", "bg-elevated"].map((s) => (
                  <div key={s} className={`rounded-2xl border border-line p-7 bg-${s}`}>
                    <p className="font-mono text-[0.8125rem] text-fg-muted">.bg-{s}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Chips and tags</Label>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Brand", "Performance media", "Lifecycle", "Measurement"].map((c) => (
                  <span key={c} className="rounded-full border border-line px-4 py-2 text-[0.8125rem] text-fg-muted">
                    {c}
                  </span>
                ))}
                <span className="rounded-full bg-brand px-4 py-2 text-[0.8125rem] text-white">Selected</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
