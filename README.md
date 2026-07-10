# ACADEMIA Особняк Шувалова — сайт отеля

Marketing/booking site for a boutique hotel in a 19th-century mansion in the
centre of Saint Petersburg. Statically-exported Next.js site with a Russian
root and an English sub-tree, deployed as plain HTML to a BeGet host.

The site content is in Russian; this documentation is for developers and is
kept in English.

## Stack

| Area | Choice |
| --- | --- |
| Framework | Next.js **16.1.6**, App Router, `output: "export"` (pure SSG, no server at runtime) |
| UI | React **19.2.3**, TypeScript 5 |
| Styling | Tailwind **v4** via `@tailwindcss/postcss` — configured in CSS (`@import "tailwindcss"` + `@theme` in `app/globals.css`), **no `tailwind.config.js`** |
| Animation | `framer-motion` 12 (`LazyMotion` + `domAnimation`), `lenis` smooth scroll |
| Images | `next-image-export-optimizer` (custom `next/image` loader → WEBP; optimizes remote images at build time) |
| Content | MDX blog via `@next/mdx` + `remark-gfm`; posts in `content/blog/*.mdx` |
| Icons | `@phosphor-icons/react` + local `components/ui/icons` |
| Runtime & PM | **Bun 1.3+** (runtime, package manager, and test runner) — `bun.lock` |
| Lint/format | **Biome 2.2.0** (single tool for lint + format, 4-space indent) |
| i18n | `ru` at the site root (`app/*`), `en` under `app/en/*` |

## Prerequisites

- **Bun** ≥ 1.3 (`curl -fsSL https://bun.sh/install | bash`). Bun is the only
  supported package manager — do not introduce npm/yarn/pnpm lockfiles.
- The build downloads and optimizes **remote images** from `academia.spb.ru` /
  `static.academia.spb.ru`, so the first build needs network access.

## Commands

All scripts run through Bun. See `package.json`.

```bash
bun install          # install dependencies (uses bun.lock)

bun dev              # next dev — http://localhost:3000 (HMR)

bun run build        # full static export → out/  (see "Build pipeline" below)

bun run lint         # biome check   (lint, no writes)
bun run format       # biome format --write
bun run fix          # bun format + bun lint --fix   (run before committing)

bun test             # built-in Bun test runner (no extra dep; see "Testing")

bun run indexnow     # ping IndexNow with blog URLs (run AFTER a prod deploy)
bun run docker-build # build+push the busybox image to ghcr (NOT the prod path)
```

`bun run start` (`next start`) is not meaningful for an `output: "export"`
site — preview the exported HTML with the SSG server instead (see *Previewing
the export*).

## Build pipeline

`bun run build` is three sequential steps:

```
next build                    # SSG render → out/ (HTML, JS, RSC payloads)
next-image-export-optimizer   # rewrite <Image> assets → WEBP in out/, fetch + cache remote images
node scripts/fix-en-lang.mjs  # post-process out/en/*.html to fix EN locale signals
```

### Why `fix-en-lang.mjs` exists

There is a **single shared root layout** (`app/layout.tsx`); there is no
`app/en/layout.tsx`. At build time that layout cannot know whether it is
rendering an RU or EN route, so it hardcodes RU-flavoured locale signals that
every EN page inherits. The Metadata API cannot override some of them per page
(`<html lang>` is not settable via metadata; a child `openGraph` *replaces*
rather than deep-merges the layout's, so patching `og:locale` there would drop
`og:image`/`og:type`). The script therefore rewrites three things **in
`out/en/*.html` only**, leaving RU output untouched:

1. `<html lang="ru">` → `lang="en"`
2. `og:locale` `ru_RU`→`en_US` and `og:locale:alternate` `en_US`→`ru_RU`
3. the `WebSite` JSON-LD node's `"inLanguage":"ru"` → `"en"`

It uses Node built-ins only, is tightly scoped by anchored regexes, and runs as
the **final** build step. Because it operates on `out/en/`, corrected locale
signals only appear in a real `bun run build`, never in `bun dev`.

At runtime, `components/i18n/HtmlLangSync.tsx` also syncs
`document.documentElement.lang` from the pathname after hydration.

## Project layout

```
app/
  layout.tsx            # single shared root layout (fonts, TravelLine, Metrika, header/footer)
  page.tsx              # RU home; passes locale="ru" to <HomePage>
  <section>/page.tsx    # RU route: exports metadata + renders components/pages/<X>Page
  rooms/[slug]/         # dynamic routes: generateStaticParams + dynamicParams=false
  blog/[slug]/          # MDX blog post route (+ /blog/page/[n], /blog/author, feed.xml)
  en/                   # English mirror; en/<section>/page.tsx renders the same <X>Page locale="en"
  robots.ts sitemap.ts manifest.ts   # generated metadata routes
  llms.txt/ llms-full.txt/           # LLM-facing text routes

components/
  pages/<X>Page.tsx     # one component per page; takes a `locale` prop
  sections/  ui/  layout/  blog/  seo/  a11y/  i18n/

content/blog/*.mdx      # blog posts (export `meta` + default MDX component)
data/*.tsx              # RoomsData / ServicesData / EventsData / SalesData / smiData, keyed by locale
lib/
  i18n/routing.tsx      # pure locale logic (localizeHref, stripLocalePrefix, …)
  i18n/metadata.ts      # getLocaleAlternates, buildPageMetadata, siteMetadataBase
  i18n/useLocale.ts     # client hook: locale from usePathname()
  seo/schema.ts         # JSON-LD builders
  seo/site.ts           # site constants (URL, name, address, contacts, images)
  blog.ts               # MDX post loading, related posts, pagination
scripts/
  fix-en-lang.mjs       # post-build EN locale fix (part of `build`)
  indexnow.mjs          # IndexNow submission (post-deploy)
public/scripts/*.js     # third-party widgets loaded from the layout (see Conventions)
mdx-components.tsx       # global MDX element mapping (img→figure, custom Columns/FAQ, etc.)
next.config.ts postcss.config.mjs biome.json tsconfig.json
```

TypeScript path alias: `@/*` → repo root (`tsconfig.json`).

## i18n model

- **Two locales**, `ru` (default) and `en`. RU lives at the site root; EN is a
  parallel tree under `/en/`.
- Each `app/**/page.tsx` is a thin wrapper that exports `metadata` and renders
  a `components/pages/<X>Page` with an explicit `locale` prop. The EN
  `app/en/**/page.tsx` renders the **same** page component with `locale="en"`.
- **Locale is derived on the client** from the pathname
  (`lib/i18n/useLocale.ts` → `usePathname()` → `detectLocaleFromPath`). There
  is no server-side locale; a static export has no request context.
- Pure, testable helpers live in `lib/i18n/routing.tsx`: `normalizePath`,
  `stripLocalePrefix`, `detectLocaleFromPath`, `localizeHref`,
  `isExternalHref`, `hasEnglishVersion`.
- **RU-only sections** have no EN twin: `/blog`, `/policy`, `/legal`
  (`RU_ONLY_SEGMENTS`). They emit no `en` hreflang and point `x-default` at the
  RU page. `getLocaleAlternates` (`lib/i18n/metadata.ts`) encodes this for
  canonical + `hreflang`.

## SEO / metadata

- Per-page metadata via `buildPageMetadata` / `getLocaleAlternates`
  (`lib/i18n/metadata.ts`); site-wide constants in `lib/seo/site.ts`.
- JSON-LD via `lib/seo/schema.ts` builders rendered through
  `components/seo/StructuredData.tsx`.
- `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts` are metadata routes;
  `trailingSlash: true` means every URL ends in `/`.

## Blog (MDX)

- Posts are `content/blog/<slug>.mdx`, each exporting a `meta` object
  (`BlogPostMeta` in `lib/blog.ts`) and a default MDX component.
- `draft: true` removes a post from listings, the sitemap, and RSS
  (`app/blog/feed.xml`), and 404s the detail route.
- `mdx-components.tsx` maps MDX elements globally (e.g. `img` → optimized
  `<figure>`, custom `Columns`/`FAQ`/`Space` available without import).
- **remark plugins are configured as strings** (`["remark-gfm"]`) in
  `next.config.ts` — Turbopack cannot accept JS function plugins.

## Third-party widgets

Loaded from `app/layout.tsx`, sourced from `public/scripts/`:

- **TravelLine** (`travelline.js`) — booking engine. Loaded as a **plain
  `<script defer>`, not `next/script`**, because `beforeInteractive` is not
  emitted into HTML under `output: "export"`.
  `components/sections/TravelLineManager.tsx` watches the pathname and a
  `MutationObserver` to (re-)initialize/refresh TL widgets for the current
  locale. TL modal/param links (`cert-open`, `tl-booking-open`) must trigger a
  **full page load** — `components/ui/Button.tsx` renders a raw `<a>` for those
  (plus external/`#anchor`/`_blank`) and a client-nav `<Link>` otherwise.
- **Yandex Metrika** (`metrika.js`) via `next/script` `strategy="lazyOnload"`.
- **Call tracking** (`calltracking.js`) via `strategy="afterInteractive"`.
- **HotBot** — inline script, lazily injected on first scroll.

## Previewing the export

`.claude/launch.json` defines two servers:

- `dev` — `next dev` on :3000 (HMR).
- `ssg-preview` — `bun run .claude/ssg-server.ts` on :4173, a tiny static
  server for `out/`. To preview the **real** exported site: `bun run build`
  first, then start `ssg-preview`.

## Deploy

**Production (current, authoritative):** build locally, then `rsync` the
contents of `out/` to the BeGet host over SSH:

```bash
bun run build
rsync -az --delete out/ al.bgt:~/academia-shuvaloff.ru/public_html/
bun run indexnow        # optional: ping IndexNow with blog URLs
```

`out/` is plain static HTML/JS/assets — any static host will serve it. There is
no application server in production.

**Docker (exists, NOT the current prod path):** the `Dockerfile` builds with
Bun and serves `out/` from a `busybox` `httpd` on port 5171;
`bun run docker-build` pushes `ghcr.io/me-danila/shuvaloff-ssg:latest` and
`docker-compose.yml` runs it. Kept for reference — production is the rsync path
above.

## Testing

Use Bun's **built-in** test runner: `bun test`. Do not add a separate
test-runner dependency (Jest/Vitest/etc.). The pure helpers in
`lib/i18n/routing.tsx` and `lib/seo/*` are the natural units to cover. No tests
exist yet.

## Conventions & constraints

- `app/**/page.tsx` stays thin: metadata + `<XPage locale=…>`. Real markup
  lives in `components/pages/`. Most page components are server components;
  add `"use client"` only where interactivity requires it.
- Use the `OptimizedImage` wrapper (`components/ui/OptimizedImage.tsx`) for
  images — the project uses a **custom** `next/image` loader.
- Run `bun run fix` before committing (Biome, 4-space indent, organized
  imports). A **pre-commit hook** (`.githooks/pre-commit`, wired up by the
  `prepare` script on `bun install`) runs `bun lint` and blocks commits with
  Biome errors — bypass with `git commit --no-verify`.
- Hard project rules: **additive changes only, no behaviour/design change,
  never break the build.** See `docs/AUDIT-PLAN.md` for the audit backlog and
  `CLAUDE.md` for agent-facing gotchas.
