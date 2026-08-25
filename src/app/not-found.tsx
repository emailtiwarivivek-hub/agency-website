import { Arrow, Button } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="display text-[clamp(4rem,16vw,12rem)] leading-none text-brand">404</p>
      <h1 className="display mt-6 text-[clamp(1.75rem,4vw,3rem)]">This page isn&apos;t converting</h1>
      <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-fg-muted">
        Mostly because it does not exist. Try the work, or tell us what you were looking for.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Button href="/projects">
          See the work
          <Arrow />
        </Button>
        <Button href="/contact" variant="outline">
          Contact
        </Button>
      </div>
    </section>
  );
}
