# AGENTS.md - Z-FRET Project Guide

## Overview

Next.js app for Japanese music chord/lyric library. Scrapes data from ufret.jp. Features: browse/search songs/artists, view chords with lyrics, YouTube playback, favorites, history, dark/light theme.

**Stack**: Next.js 16 (App Router), React 19, TypeScript, Cheerio (scraping), React Player, Zod, Tailwind CSS 4, Radix UI, next-themes, nuqs, Sonner

## Project Structure

```
src/
├── app/              # Next.js pages (/, /song/[id], /artist/[name], /search, /trending, /favorites, /history)
├── components/       # React components (ui/, list.tsx, player.tsx, header.tsx, etc.)
├── hooks/           # use-favorites.ts, use-browsing-history.ts
└── lib/             # song.ts (scraping), search.ts, env.ts, constants.ts, utils.ts
```

## Key Files

**`lib/song.ts`**: `fetchSong(id)`, `fetchArtistSongs()`, `fetchRelatedSongs()`, `fetchTopSongs()`, `fetchTopArtists()`  
**`lib/search.ts`**: `search(query)` returns `{ artists, songs }`  
**`hooks/use-favorites.ts`**: localStorage favorites (`addFavorite`, `removeFavorite`, `toggleFavorite`)  
**`hooks/use-browsing-history.ts`**: localStorage history (`addHistoryItem`, `clearAllHistory`)  
**`components/list.tsx`**: Compound component (`List.Root`, `List.Header`, `List.Content`, `List.Item`, `List.Footer`)  
**`components/player.tsx`**: YouTube player (lazy loads on click)

## Architecture

- **Server Components**: Default, use `"use server"` for actions, `cache()` + `cacheLife()` for caching
- **Caching**: Songs `cacheLife("max")`, home/artists `cacheLife("days")`
- **Client State**: localStorage via hooks (`useFavorites`, `useBrowsingHistory`), URL state via `nuqs`
- **Patterns**: Compound components, `ClientOnly` wrapper for client features, Radix UI Slot

## Routes

- `/` - Home (trending)
- `/song/[id]` - Song page (chords/lyrics)
- `/artist/[name]` - Artist songs (URL-encoded name)
- `/search` - Search
- `/trending/songs`, `/trending/artists` - Rankings
- `/favorites`, `/history` - User data

## Data Flow

**Song Page**: Navigate → `fetchSong(id)` → scrape ufret.jp → parse chords/lyrics → `fetchRelatedSongs()` → render + update localStorage  
**Search**: Query → `search(query)` → scrape → return `{ artists, songs }`

## External APIs

**ufret.jp** (scraping):

- Songs: `https://www.ufret.jp/song.php?data={id}`
- Artists: `https://www.ufret.jp/artist.php?data={encodedName}`
- Search: `https://www.ufret.jp/search.php?key={query}`
- Rankings: `/rank.php` (songs), `/rank_artist.php` (artists)

**YouTube**: `react-player`, thumbnails: `https://img.youtube.com/vi/{videoId}/mqdefault.jpg`

## Guidelines

- Server Components by default, `"use client"` only when needed
- Use `cache()` + `cacheLife()` for server functions
- Validate with Zod, handle errors
- TypeScript strict mode, type all props
- Tailwind CSS 4, dark mode via next-themes
- Fonts: Lexend (primary), Kosugi (Japanese)

## Common Tasks

**New Page**: Create `src/app/[route]/page.tsx` (Server Component), add `loading.tsx` if needed  
**New Component**: Create in `src/components/`, add `"use client"` if needed, use Tailwind  
**New localStorage Hook**: Add key to `constants.ts`, create hook using `@uidotdev/usehooks`  
**Modify Scraping**: Update `lib/song.ts` or `lib/search.ts`, add Zod validation, update cache

## Important Notes

- **Scraping is fragile**: HTML changes on ufret.jp will break functionality
- **Aggressive caching**: Reduces load, songs cached max, others daily
- **Client/Server**: `ClientOnly` for localStorage features, watch hydration mismatches
- **Env**: `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` required (validated via @t3-oss/env-nextjs)
