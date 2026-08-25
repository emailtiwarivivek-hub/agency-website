import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import "@fontsource/anton";
import "@fontsource-variable/exo";
import "@fontsource/varela-round";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL("https://growthlab.marketing"),
  title: {
    default: `${site.fullName} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description:
    "GrowthLab is a creative marketing studio building brand, media, creative, lifecycle and measurement systems for consumer and B2B teams.",
  icons: { icon: "/mark.png", apple: "/mark.png" },
  openGraph: {
    title: `${site.fullName} — ${site.tagline}`,
    description: "Brand, media, creative and measurement, run as one system against one number.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#181818" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={GeistSans.variable}>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand focus:px-5 focus:py-2.5 focus:text-white"
          >
            Skip to content
          </a>
          <NavBar />
          <main id="main" className="pt-[4.5rem] md:pt-20">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
