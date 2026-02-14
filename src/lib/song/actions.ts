"use server";

import { cacheLife } from "next/cache";
import {
  scrapeArtistSongs,
  scrapeSong,
  scrapeTopArtists,
  scrapeTopSongs,
} from "./scrape";

export async function getSong(id: string) {
  "use cache";
  cacheLife("max");

  return await scrapeSong(id);
}

export async function getArtistSongs({
  name,
  limit = 1000,
}: {
  name: string;
  limit?: number;
}) {
  "use cache";
  cacheLife("weeks");

  const artistSongs = await scrapeArtistSongs(name);
  return artistSongs.slice(0, limit);
}

export async function getTopSongs({ limit = 100 }: { limit?: number } = {}) {
  "use cache";
  cacheLife("days");

  const topSongs = await scrapeTopSongs();
  return topSongs.slice(0, limit);
}

export async function getTopArtists({ limit = 100 }: { limit?: number } = {}) {
  "use cache";
  cacheLife("days");

  const topArtists = await scrapeTopArtists();
  return topArtists.slice(0, limit);
}

export async function getRelatedSongs({
  artistName,
  songId,
  limit = 10,
}: {
  artistName: string;
  songId: string;
  limit?: number;
}) {
  "use cache";
  cacheLife("weeks");

  const artistSongs = await scrapeArtistSongs(artistName);

  const selfIndex = artistSongs.findIndex((song) => song.id === songId);

  if (selfIndex === -1) return artistSongs.slice(0, limit);

  const startIndex = Math.max(0, selfIndex - limit / 2);
  const endIndex = Math.min(artistSongs.length, startIndex + limit);

  return artistSongs
    .filter((song) => song.id !== songId)
    .slice(startIndex, endIndex);
}
