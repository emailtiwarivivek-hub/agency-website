"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const QUOTE = "Honest answers cost us money.";

export function PinnedQuote() {
  const ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [bounds, setBounds] = useState({ from: 0, to: 0 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [bounds.from, bounds.to]);
  const line = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Measure the real text width so the last word always lands inside the viewport,
  // however wide the screen is and whatever the font renders at.
  useEffect(() => {
    const measure = () => {
      const el = textRef.current;
      if (!el) return;
      const vw = window.innerWidth;
      const pad = Math.min(Math.max(vw * 0.05, 20), 80);
      const overflow = el.scrollWidth - vw;
      setBounds({ from: pad, to: overflow > 0 ? -(overflow + pad) : pad });
    };

    measure();
    window.addEventListener("resize", measure);
    // Anton loads async — re-measure once the real face is in.
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section
      ref={ref}
      className="relative h-[240vh] text-white"
      style={{ background: "linear-gradient(160deg, var(--brand-deep), var(--brand))" }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-20">
        <div className="noise" aria-hidden />

        <div className="shell relative flex items-center justify-between">
          <span className="label text-white/60">Our operating principle</span>
          <span className="label text-white/60">GrowthLab / 2019—</span>
        </div>

        <motion.p
          ref={textRef}
          style={{ x }}
          className="display mt-8 w-max whitespace-nowrap text-[clamp(4rem,16vw,14rem)] leading-none"
        >
          {QUOTE}
        </motion.p>

        <div className="shell relative mt-10">
          <div className="h-px w-full bg-white/25">
            <motion.div style={{ width: line }} className="h-px bg-white" />
          </div>
          <p className="round mt-7 max-w-xl text-lg leading-relaxed text-white/80">
            If the honest answer is spend less, fix the product, or hire in-house instead —
            that is the answer you get. It costs us revenue and buys us clients who stay
            five years.
          </p>
        </div>
      </div>
    </section>
  );
}
