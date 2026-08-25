import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/content";

export function Logo({ width = 176, className = "" }: { width?: number; className?: string }) {
  const height = Math.round((width * 193) / 847);
  return (
    <Link href="/" aria-label={`${site.fullName} home`} className={`inline-block shrink-0 ${className}`}>
      <Image
        src="/logo.png"
        alt={site.fullName}
        width={width}
        height={height}
        priority
        className="logo-swap logo-swap--light h-auto w-auto"
        style={{ width, height }}
      />
      <Image
        src="/logo-dark.png"
        alt={site.fullName}
        width={width}
        height={height}
        priority
        className="logo-swap logo-swap--dark h-auto w-auto"
        style={{ width, height }}
      />
    </Link>
  );
}
