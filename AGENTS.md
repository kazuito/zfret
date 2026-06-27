# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
(`CLAUDE.md` imports this file via `@AGENTS.md`.)

## What this is

Z-FRET is a chord library web app. It has no database of its own — all song,
artist, chord, and ranking data is **scraped on demand from ufret.jp** (a
Japanese chord site) and cached. User-specific data (favorites, history) lives
only in the browser's localStorage.

## Commands

Package manager is **pnpm** (Node 22, pinned via `mise.toml`).

- `pnpm dev` — run dev server (Turbopack)
- `pnpm build` / `pnpm start` — production build / serve
- `pnpm check` — Biome lint + format with autofix (run this before committing)
- `pnpm lint` — Biome lint only
- `pnpm format` — Biome format only
- `pnpm typecheck` — `tsc --noEmit`
- `pnpm knip` — find unused files/exports/dependencies

There is no test suite. The Husky **pre-commit** hook runs `pnpm lint` +
`pnpm typecheck`; quality gating happens there, not in CI tests.

## Stack

Next.js 16 (preview) App Router with React 19 Server Components. Tooling/libs
that differ from typical setups:

- **Biome** for lint + format (not ESLint/Prettier). Config in `biome.json`:
  double quotes, semicolons, 2-space indent, 80 col. `useSortedClasses` is on
  for the `clsx`, `cva`, `cn`, `tw` functions — keep Tailwind class lists sorted.
- **Tailwind v4** (CSS-first config in `app/globals.css`, no `tailwind.config`).
- **shadcn** (`base-nova` style) generating components on top of **Base UI**
  (`@base-ui/react`) — not Radix. **Hugeicons** for icons.
- **TanStack Query**, **nuqs** (URL search-param state), **next-themes**,
  **sonner** (toasts), **zod** (v4), **motion**, **cheerio** (scraping).
- `next.config.ts` enables `cacheComponents` (the `"use cache"` directive) and
  `partialPrefetching`.
- Path alias: `@/*` maps to the repo root.

## Architecture

### Data flow: scrape → parse → cached query → page

1. `features/song/scrape.ts` fetches ufret.jp HTML and uses cheerio to extract
   data; pure DOM/string extraction lives in `features/song/parse.ts`. Chord
   data is pulled out of inline `<script>` globals via regex
   (`var ufret_chord_datas = [...]`, `var ytID = '...'`).
2. `features/song/queries.ts` wraps the scrapers with `"use cache"` +
   `cacheLife(...)` and is what pages call (`getSong`, `getArtistSongs`,
   `getTopSongs`, `getTopArtists`, `getRelatedSongs`). `actions.ts` is the
   `"use server"` entry for search.
3. Route segments in `app/` (Server Components) call these queries directly.

Cache tiers reflect data volatility: song/artist/related pages use
`cacheLife("weeks")`, rankings `"days"`, search `"hours"`. When changing what a
scraper returns, remember results are cached aggressively.

### Domain modules (`features/`)

- `features/song` — scraping, parsing, queries, the search server action, and
  the `Song`/`SearchResult` types.
- `features/chords` — pure music theory. `analyze.ts` parses a chord symbol
  (root, quality, optional `/bass` slash chord) into pitches + intervals using
  `notes.ts` and `qualities.ts`; `components/` renders guitar/piano diagrams
  from that analysis. No network or DOM here.
- `features/favorites` — favorites list + sorting, persisted to localStorage.

### Client persistence

There is no user backend. Favorites, browsing history, and search history are
stored in localStorage under keys defined in `lib/constants.ts` (`LS_KEYS`),
all built on the `useLocalStorageState` hook (`hooks/`). Anything user-specific
should follow this pattern, not a server call.

### Routing & layout

App Router with co-located `_components/` folders per segment. The root layout
wraps everything in `Providers` (Nuqs → next-themes → TanStack Query) plus the
sidebar/header/footer shell and the sonner `Toaster`. Dynamic segments:
`song/[id]`, `artist/[name]`; `trending/` has `songs`/`artists` subroutes.

## Conventions

- **No explanatory "AI slop" comments.** Code should be self-describing; add a
  comment only when intent genuinely cannot be expressed in the code.
- Shared UI primitives live in `components/ui` (shadcn-generated); app-specific
  shared components in `components/`. Use the `cn()` helper (`lib/utils.ts`) for
  conditional classes.
- Validate scraped/external data shapes with zod before trusting them
  (see `parseChords`).
