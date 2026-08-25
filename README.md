# GrowthLab Marketing — Next.js creative agency site

A white-and-blue creative marketing agency site built with **Next.js 16 (App Router)**,
**React 19**, **TypeScript**, **Tailwind CSS v4** and **Framer Motion**. Nineteen pages
across **39 statically prerendered routes**, a white/blue theme toggle, and a JSON + Markdown
content layer with no CMS behind it.

Structure and interaction patterns follow the Mariq template brief (pointer-reactive
collage hero, 3D-flipping project cards, pinned horizontal-scroll quote, testimonial
marquee wall, per-plan pricing pages, MDX-style blog, checkout demo). All copy, data,
design tokens and code are original and built around the GrowthLab identity.

Not a live site — a pre-production build. Clients, results, team and posts are
placeholders.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Node 20.9+ required.

## Brand

White and blue only — there is no black anywhere in the palette. Text is deep navy
(`#0A1259`), not `#000`, and the alternate theme is a deep blue canvas rather than a
dark-grey one.

| Token | Light (default) | Blue theme | Use |
| --- | --- | --- | --- |
| `--brand` | `#0005DD` | `#5B64FF` | Primary. Logo blue in light; lifted for contrast on navy. |
| `--brand-strong` | `#0004A8` | `#838AFF` | Hover / active |
| `--brand-deep` | `#0005DD` | `#0005DD` | Exact logo blue — full-bleed panels |
| `--brand-soft` | `#E8E9FF` | `#101C78` | Tinted surfaces |
| `--bg` | `#FFFFFF` | `#04093A` | Page canvas |
| `--bg-subtle` | `#F2F4FF` | `#060F4C` | Alternating bands |
| `--fg` | `#0A1259` | `#EEF1FF` | Primary text |

Project card gradients all sit inside the blue → indigo → cyan range, so the work
grid reads as one family rather than a rainbow.

`public/logo.png` is the blue lockup (light), `public/logo-dark.png` the pale lockup
(blue theme), `public/mark.png` the square favicon. Both are transparent PNGs derived
from the supplied artwork; the swap is pure CSS so there is no theme flash.

## Pages

| Route | |
| --- | --- |
| `/` | Hero collage, services list, flip cards, stats, pinned quote, testimonial wall, pricing, FAQ, CTA |
| `/services` | Six service blocks with deliverables, pricing, CTA |
| `/projects` | Eight case studies |
| `/projects/[slug]` | Case study detail — challenge / approach / outcome, next-project link |
| `/pricing` | Three engagements |
| `/pricing/[slug]` | Per-plan detail with timeline and exclusions |
| `/blog` | Twelve posts with category filter |
| `/blog/[slug]` | Article with related posts |
| `/about` | Principles, team, timeline, client marquee |
| `/careers` + `/careers/[slug]` | Three roles with detail pages |
| `/contact` | Demo enquiry form, what-happens-next, details |
| `/checkout` | Working cart/scope-builder UI (no payment processor) |
| `/style-guide` | Colour tokens, type scale, components |
| `/401`, `404` | Utility pages |

## Where to change things

**Content** — `src/content/data/*.json` (site details, nav, services, projects,
pricing, FAQs, team, values, milestones, jobs) and `src/content/blog/*.md`
(frontmatter + Markdown). Nothing else needs editing to rebrand or restock the site.

**Colour and type** — `src/app/globals.css`. Every colour is a CSS custom property
defined twice: `:root` (dark) and `:root.light`. Tokens are exposed to Tailwind via
`@theme inline`, so `bg-brand`, `text-fg-muted`, `border-line` work everywhere.
Change `--brand` and the site re-skins.

**Type** — Anton (display), Geist (interface/body), Exo (labels), Varela Round
(accents). All self-hosted via `@fontsource` / `geist`; zero external font requests.

```
src/
  app/            routes, layout, globals.css
  components/     nav, footer, logo, ui primitives, forms
    home/         one file per home-page section
  content/
    data/*.json   all structured content
    blog/*.md     posts with frontmatter
  lib/            content + blog loaders
public/           logo variants and favicon
```

## Notes before launch

- **The contact form and checkout are demos.** Both set local state only. Wire them to
  a route handler (`src/app/api/...`), your CRM, or a form/payment provider.
- **Case study visuals are CSS gradients**, not photography. Swap in real imagery when
  you have it — the card structure takes an image without layout changes.
- Add real OG images, `sitemap.ts` and `robots.ts` before going live.
- White is the default theme; the toggle switches to a deep-blue canvas. A manual choice
  is remembered, and the whole motion layer respects `prefers-reduced-motion`.

## Accessibility

Skip link, focus-visible rings, `aria-expanded` on menu and accordions, `aria-pressed`
on filter and option chips, labelled form fields, semantic landmarks, and a keyboard
path through the 3D flip cards (`:focus-within` flips them too).
