# CLAUDE.md — agent guide

Notes for an AI agent working in this repo. Read `README.md` for the full
picture; this file is the short version plus the traps.

## What this is

Statically-exported (`output: "export"`) Next.js 16 / React 19 site for a
Saint-Petersburg hotel. RU at the root (`app/*`), EN mirror under `app/en/*`.
Bun for everything (runtime, package manager, tests). Biome for lint+format.
Tailwind v4 configured in CSS. Deployed as plain HTML via rsync to a BeGet host.

## Hard constraints (do not violate)

- **Additive DX only. No behaviour or design change. Never break the build.**
- **Bun only.** Never create an npm/yarn/pnpm lockfile. Commands go through
  Bun (`bun install`, `bun dev`, `bun run build`, `bun run fix`).
- **Tests use the built-in `bun test`.** Do not add Jest/Vitest or any
  test-runner dependency.
- **Biome** owns lint+format (4-space indent). Run `bun run fix` before
  finishing. Do not add ESLint/Prettier.
- Documentation stays in English; do not localize dev docs. Site content is
  Russian — don't "fix" Russian strings to English.

## Commands

```bash
bun install
bun dev                 # next dev :3000
bun run build           # next build && next-image-export-optimizer && node scripts/fix-en-lang.mjs
bun run lint            # biome check
bun run fix             # biome format --write + biome lint --fix   ← run before committing
bun test                # built-in runner
```

## Gotchas (the important part)

- **Tailwind v4 `@theme` caches in `.next`.** The theme tokens live in
  `app/globals.css` (`@import "tailwindcss"` + `@theme { … }`), not a config
  file. After editing `@theme` tokens (colors, fonts) or otherwise seeing stale
  styles, `rm -rf .next` and rebuild — a warm `.next` cache serves the old
  theme. There is no `tailwind.config.js`.

- **`fix-en-lang.mjs` only rewrites `<html lang>` for EN, in `build`.** There is
  ONE root layout (`app/layout.tsx`, kept single so the global not-found stays
  intact) which hardcodes `<html lang="ru">`; the Metadata API can't set
  `<html lang>` per route, so EN pages inherit `lang="ru"` in the raw static
  HTML and the script flips it to `en` for `out/en/*.html` only. Consequences:
  - In `bun dev` EN pages *will* show `lang="ru"` (client `HtmlLangSync` patches
    it at runtime; the static-HTML fix is a post-export step).
  - `og:locale` and `WebSite` JSON-LD `inLanguage` are now emitted **natively**
    in English — `app/en/layout.tsx` provides a full `en_US` OpenGraph default
    and renders `SiteShell(locale="en")`, so `buildSiteSchema("en")` emits
    `inLanguage:"en"`. The script no longer touches them.
  - A child page's `openGraph` **replaces** (does not deep-merge) a parent's, so
    setting `openGraph.locale` alone drops `og:image`/`og:type`. Use
    `buildPageMetadata` (`lib/i18n/metadata.ts`) which re-emits the full block.

- **Remote images don't load in the preview sandbox.** Images come from
  `academia.spb.ru` / `static.academia.spb.ru` and are optimized at build by
  `next-image-export-optimizer`. In a no-network preview they'll be broken —
  that's the sandbox, not a bug. Verify against a real `bun run build` (which
  needs network to fetch remote images the first time).

- **TravelLine links must full-load.** TL is loaded as a plain
  `<script defer>` (not `next/script`) because `beforeInteractive` isn't
  emitted under `output: "export"`. TL modal/param links (`cert-open`,
  `tl-booking-open`) and external/`#`/`_blank` links MUST be raw `<a>` (full
  navigation), not client-nav `<Link>` — otherwise the TL loader never runs on
  that navigation. `components/ui/Button.tsx` already routes these correctly
  (`requiresFullNavigation`); don't "optimize" those into `<Link>`.
  `components/sections/TravelLineManager.tsx` refreshes TL widgets per locale
  via pathname + `MutationObserver`; keep that intact when moving widgets.

- **Locale flows from per-locale layouts as a prop.** RU routes live in the
  `app/(ru)/` route group (URLs unchanged) under `app/(ru)/layout.tsx`; EN under
  `app/en/layout.tsx`. Each renders `components/layout/SiteShell` with an
  explicit `locale`, so `Header`/`Footer`/`SkipLink` and the site JSON-LD get
  locale server-side (no client detection). `page.tsx` files likewise pass
  `locale` down to their `components/pages/*` component. `useLocale()`
  (`lib/i18n/useLocale.ts`, reads `usePathname()`) remains only for deep client
  components that already need `pathname` — there is still no server locale in a
  static export, so don't detect locale from headers/request. The single root
  (`app/layout.tsx`) holds only `<html>`/`<body>`, fonts, third-party scripts
  and the providers (`SmoothScroll`/`LazyMotion`); the global `app/not-found.tsx`
  wraps itself in `SiteShell(locale="ru")` since it renders in the bare root.

- **remark/rehype plugins are strings, not imports** in `next.config.ts`
  (`["remark-gfm"]`) — Turbopack rejects JS-function plugins.

- **`bun run start` is a no-op for this site.** It's `next start`, which doesn't
  serve an export. Preview `out/` with the `ssg-preview` launch config
  (`bun run .claude/ssg-server.ts`, :4173) after building.

## Architecture cheatsheet

- **Page pattern:** `app/**/page.tsx` (thin: `metadata` + `<XPage locale>`) →
  `components/pages/<X>Page.tsx` (the actual page). EN routes under `app/en/**`
  render the same component with `locale="en"`.
- **Dynamic routes** (`rooms/[slug]`, `services/[slug]`, `blog/[slug]`,
  `events/[slug]`) use `generateStaticParams` + `export const dynamicParams =
  false` so only known slugs are exported.
- **Data** lives in `data/*.tsx`, keyed by locale (e.g. `AllRooms.ru` /
  `AllRooms.en`). Import only what a page needs — these files are large.
- **i18n helpers:** pure logic in `lib/i18n/routing.tsx`; metadata/alternates in
  `lib/i18n/metadata.ts`. RU-only sections (`/blog`, `/policy`, `/legal`,
  `RU_ONLY_SEGMENTS`) get no `en` hreflang.
- **SEO:** JSON-LD builders in `lib/seo/schema.ts`, constants in
  `lib/seo/site.ts`, rendered via `components/seo/StructuredData.tsx`.
- **Blog:** `content/blog/*.mdx` export `meta` + default component; `draft:true`
  hides from list/sitemap/RSS. Global MDX mapping in `mdx-components.tsx`.
- **Images:** always via `components/ui/OptimizedImage.tsx` (custom `next/image`
  loader). `next.config.ts` whitelists the two remote hosts.
- **Path alias:** `@/*` → repo root.

## Deploy reality

Production = build locally, `rsync out/` → BeGet
(`al.bgt:~/academia-shuvaloff.ru/public_html`) over SSH; optionally
`bun run indexnow` after. The `Dockerfile` / `docker-compose.yml` /
`bun run docker-build` (busybox httpd, ghcr image) exist but are **not** the
current production method — don't assume Docker/ghcr is live.

## Before you finish

1. `bun run fix` (Biome format + lint).
2. If you changed `@theme`/globals or see stale styles: `rm -rf .next`.
3. For anything touching EN locale signals, the layout, or `out/` structure:
   run `bun run build` and confirm `fix-en-lang.mjs` reports the expected
   `html lang=en` / `og:locale=en_US` / `inLanguage=en` counts.
