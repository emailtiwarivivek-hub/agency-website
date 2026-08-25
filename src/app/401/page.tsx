import type { Metadata } from "next";
import { Arrow, Button } from "@/components/ui";

export const metadata: Metadata = { title: "Members only" };

export default function UnauthorizedPage() {
  return (
    <section className="shell flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="display text-[clamp(4rem,14vw,10rem)] leading-none text-brand">401</p>
      <h1 className="display mt-6 text-[clamp(1.75rem,4vw,3rem)]">Members only</h1>
      <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-fg-muted">
        Client dashboards, source files and experiment libraries live behind this door.
        Ask your partner for access.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Button href="/contact">
          Request access
          <Arrow />
        </Button>
        <Button href="/" variant="outline">
          Back home
        </Button>
      </div>
    </section>
  );
}
