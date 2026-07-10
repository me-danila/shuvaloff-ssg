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

- **`fix-en-lang.mjs` only runs in `build`, on `out/en/*.html`.** The single
  shared root layout hardcodes RU locale signals (`<html lang="ru">`,
  `og:locale=ru_RU`, `WebSite` JSON-LD `inLanguage:"ru"`) that EN pages inherit
  and the Metadata API can't override per page. The script rewrites them for EN
  output only. Consequences:
  - In `bun dev` the EN pages *will* show `lang="ru"` / `og:locale=ru_RU`.
    That's expected; the fix is a post-export step, not a dev-time one.
  - A child page's `openGraph` **replaces** (does not deep-merge) the layout's,
    so setting `openGraph.locale` on a page drops `og:image`/`og:type`. Use
    `buildPageMetadata` (`lib/i18n/metadata.ts`) which re-emits the full block.
  - If you touch the layout's `<html>` tag, `og:locale`, or the site JSON-LD,
    re-verify the anchored regexes in `scripts/fix-en-lang.mjs` still match.

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

- **Locale is client-only.** `useLocale()` reads `usePathname()`
  (`lib/i18n/useLocale.ts`) — there is no server locale in a static export.
  Don't try to detect locale from headers/request in a server component.
  `page.tsx` files pass an explicit `locale` prop down instead.

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
