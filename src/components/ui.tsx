"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* Arrow ---------------------------------------------------------- */

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-4 transition-transform duration-200 group-hover:translate-x-0.5 ${className}`}
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

/* Button --------------------------------------------------------- */

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "invert";
  size?: "md" | "lg";
  className?: string;
};

export function Button({ href, children, variant = "primary", size = "md", className = "" }: ButtonProps) {
  const sizes = { md: "h-11 px-6 text-[0.9375rem]", lg: "h-14 px-8 text-base" };
  const variants = {
    primary:
      "bg-brand text-white hover:bg-brand-strong hover:-translate-y-0.5 shadow-[0_10px_30px_-12px_var(--brand-glow)]",
    outline: "border border-line-strong text-fg hover:border-brand hover:text-brand hover:-translate-y-0.5",
    invert: "bg-paper text-ink hover:-translate-y-0.5",
  };
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

/* Label chip ----------------------------------------------------- */

export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`label inline-flex items-center gap-2 text-brand ${className}`}>
      <span className="inline-block h-px w-6 bg-brand" aria-hidden />
      {children}
    </span>
  );
}

/* Reveal --------------------------------------------------------- */

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const observed = useInView(ref, { once: true, margin: "-70px" });
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    if (observed || fallback) return;
    const check = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight - 40 && r.bottom > 0) setFallback(true);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [observed, fallback]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={observed || fallback ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.21, 0.6, 0.35, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Section heading ------------------------------------------------ */

export function SectionHeading({
  label,
  title,
  body,
  align = "left",
  className = "",
}: {
  label?: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}>
      {label ? <Label className={align === "center" ? "justify-center" : ""}>{label}</Label> : null}
      <h2 className="display mt-6 text-[clamp(2.4rem,6vw,5rem)]">{title}</h2>
      {body ? (
        <p className={`mt-6 text-lg leading-relaxed text-fg-muted ${align === "center" ? "mx-auto max-w-2xl" : "max-w-xl"}`}>
          {body}
        </p>
      ) : null}
    </Reveal>
  );
}

/* Animated counter ----------------------------------------------- */

export function Counter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);
  const target = parseFloat(value);
  const decimals = value.includes(".") ? 1 : 0;

  useEffect(() => {
    if (!inView || Number.isNaN(target)) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1300;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setN(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {Number.isNaN(target) ? value : n.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* Marquee -------------------------------------------------------- */

export function Marquee({
  items,
  className = "",
  reverse = false,
  slow = false,
}: {
  items: ReactNode[];
  className?: string;
  reverse?: boolean;
  slow?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div
        className={`marquee-track ${reverse ? "marquee-track--reverse" : ""} ${slow ? "marquee-track--slow" : ""}`}
      >
        {doubled.map((item, i) => (
          <div key={i} className="shrink-0">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
