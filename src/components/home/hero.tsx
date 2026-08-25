"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button, Arrow, Marquee } from "@/components/ui";
import { projects, site } from "@/lib/content";

/* Pointer-reactive collage --------------------------------------- */

const tiles = [
  { slug: 0, depth: 34, className: "left-[2%] top-[14%] h-36 w-28 md:h-52 md:w-40", rotate: -8 },
  { slug: 1, depth: 20, className: "left-[10%] bottom-[10%] h-28 w-36 md:h-36 md:w-52", rotate: 6 },
  { slug: 4, depth: 46, className: "right-[3%] top-[10%] h-32 w-40 md:h-44 md:w-56", rotate: 7 },
  { slug: 3, depth: 26, className: "right-[8%] bottom-[13%] h-36 w-28 md:h-52 md:w-40", rotate: -5 },
];

const chips = [
  { text: "4.2x ROAS", depth: 58, className: "left-[24%] top-[8%]" },
  { text: "38% pipeline lift", depth: 40, className: "right-[24%] bottom-[8%]" },
  { text: "Studio since 2019", depth: 70, className: "left-[2%] top-[62%] hidden lg:block" },
];

export function Hero() {
  const wrap = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 90, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 90, damping: 20, mass: 0.6 });

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      px.set((e.clientX - r.left) / r.width - 0.5);
      py.set((e.clientY - r.top) / r.height - 0.5);
    };
    const onLeave = () => {
      px.set(0);
      py.set(0);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [px, py]);

  return (
    <section ref={wrap} className="relative overflow-hidden pb-16 pt-16 md:pb-24 md:pt-24">
      <div className="grid-lines" aria-hidden />
      <div className="noise" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-20rem] -z-10 h-[40rem] w-[70rem] -translate-x-1/2 rounded-full opacity-30 blur-[130px]"
        style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 65%)" }}
      />

      {/* collage */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden>
        {tiles.map((t, i) => {
          const p = projects[t.slug];
          return (
            <Parallax key={i} sx={sx} sy={sy} depth={t.depth} className={`absolute ${t.className}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.85, rotate: t.rotate * 2 }}
                animate={{ opacity: 1, scale: 1, rotate: t.rotate }}
                transition={{ duration: 0.9, delay: 0.35 + i * 0.09, ease: [0.21, 0.6, 0.35, 1] }}
                className="h-full w-full overflow-hidden rounded-2xl border border-line shadow-[var(--shadow-tile)]"
                style={{ background: `linear-gradient(140deg, ${p.hue}, ${p.hue2})` }}
              >
                <div className="flex h-full flex-col justify-between p-3.5 text-white/95">
                  <span className="label text-[0.5625rem] text-white/70">{p.sector}</span>
                  <span className="display text-2xl leading-none md:text-3xl">{p.metric}</span>
                </div>
              </motion.div>
            </Parallax>
          );
        })}

        {chips.map((c, i) => (
          <Parallax key={c.text} sx={sx} sy={sy} depth={c.depth} className={`absolute ${c.className}`}>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
              className="round inline-block rounded-full border border-line bg-bg-elevated/85 px-4 py-2 text-[0.8125rem] text-fg backdrop-blur-md"
            >
              {c.text}
            </motion.span>
          </Parallax>
        ))}
      </div>

      {/* headline */}
      <div className="shell relative">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex w-fit items-center gap-3 rounded-full border border-line bg-bg-elevated/70 py-2 pl-3 pr-5 backdrop-blur-md"
        >
          <span className="relative grid size-4 place-items-center">
            <span className="absolute size-1.5 rounded-full bg-brand pulse-dot" />
            <span className="size-1.5 rounded-full bg-brand" />
          </span>
          <span className="label text-fg-muted">Four partner slots open for Q4</span>
        </motion.div>

        <h1 className="display mx-auto mt-9 max-w-[14ch] text-center text-[clamp(3rem,11vw,9.5rem)]">
          {["Marketing", "that earns", "its budget"].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                initial={{ y: "108%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.08 * i, ease: [0.21, 0.7, 0.3, 1] }}
                className="block"
              >
                {i === 2 ? <span className="text-brand">{line}</span> : line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42 }}
          className="mx-auto mt-8 max-w-xl text-center text-lg leading-relaxed text-fg-muted"
        >
          Brand, media, creative and measurement built as one system — then run against a
          single number your finance team already believes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.52 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button href="/contact" size="lg" className="w-full sm:w-auto">
            Start a project
            <Arrow />
          </Button>
          <Button href="/projects" variant="outline" size="lg" className="w-full sm:w-auto">
            See the work
          </Button>
        </motion.div>
      </div>

      {/* ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="relative mt-20 border-y border-line bg-bg-subtle py-4 md:mt-28"
      >
        <Marquee
          items={site.clients.flatMap((c) => [
            <span key={c} className="display px-8 text-xl text-fg-faint md:text-2xl">
              {c}
            </span>,
            <span key={c + "-dot"} className="grid h-full place-items-center">
              <span className="size-1.5 rounded-full bg-brand" />
            </span>,
          ])}
        />
      </motion.div>
    </section>
  );
}

function Parallax({
  sx,
  sy,
  depth,
  className,
  children,
}: {
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
  depth: number;
  className?: string;
  children: React.ReactNode;
}) {
  const x = useTransform(sx, (v) => v * depth);
  const y = useTransform(sy, (v) => v * depth);
  return (
    <motion.div style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
}
