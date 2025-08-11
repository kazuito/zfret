# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Use pnpm as the package manager for this project.**

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build production version (run this to confirm no errors)
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint checks

## Project Architecture

Z-FRET is a Next.js 15 application that provides chord information for songs by scraping data from ufret.jp. The application is built with:

- **Next.js 15** with App Router and React 19
- **Hono** for API routes with Vercel Edge Runtime
- **Zod** for schema validation
- **TailwindCSS** for styling with custom CSS variables
- **Radix UI** components for UI elements
- **cheerio** for server-side HTML parsing

### Key Components

- **API Layer** (`src/app/api/[[...route]]/route.ts`): Hono-based API with three main endpoints:

  - `GET /api/song/:id` - Fetch individual song data with chords
  - `GET /api/artist/:name` - Fetch songs by artist
  - `GET /api/search?q=query` - Search songs and artists

- **Data Layer** (`src/lib/song.ts`): Core scraping logic that:

  - Parses HTML from ufret.jp using cheerio
  - Extracts chord progressions from embedded JavaScript data
  - Transforms chord/lyric data into structured format
  - Handles artist and song search functionality

- **Pages**:
  - `/` - Homepage with top songs and artists rankings
  - `/search` - Search interface with client-side state management
  - `/song/[id]` - Individual song view with chord progressions
  - `/artist/[name]` - Artist page with song listings

### Data Structure

Songs contain chord progressions where each line is an array of objects with:

```typescript
{
  chord: string | null,  // Guitar chord (e.g., "Am", "G7")
  lyric: string         // Lyric text
}
```

YouTube video IDs are extracted when available for songs.

### Styling

- Dark theme by default (`dark` class on body)
- Custom CSS variables for theming
- Responsive design with mobile-first approach
- Gradient text effects for lyrics display
- Sticky search bars and song headers

### Key Patterns

- Server Components for data fetching
- Client Components for interactive features (search, navigation)
- Form actions for search functionality
- URL state management for search queries
- Error handling with Zod validation
- Proper encoding/decoding for Japanese text in URLs

## Development Notes

- The application scrapes external content, so network requests may occasionally fail
- Japanese language support is built-in (lang="ja" in layout)
- Edge runtime is used for API routes to improve performance
- Server-side rendering is used for SEO and performance
- The app uses modern Next.js patterns with async Server Components
