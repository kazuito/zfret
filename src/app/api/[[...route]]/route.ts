import { fetchArtistSongs, fetchSong, fetchSearchResults } from "@/lib/song";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { googleSearch } from "@/lib/search";

export const runtime = "edge";

const app = new Hono().basePath("/api");

const songParamsSchema = z.object({
  id: z.string().min(1, "Song ID is required"),
});

const artistParamsSchema = z.object({
  name: z.string().min(1, "Artist name is required"),
});

const searchQuerySchema = z.object({
  q: z.string().min(1, "Search query is required"),
});

app.get("/song/:id", zValidator("param", songParamsSchema), async (c) => {
  const { id } = c.req.valid("param");
  const song = await fetchSong(id);
  return c.json(song);
});

app.get("/artist/:name", zValidator("param", artistParamsSchema), async (c) => {
  const { name } = c.req.valid("param");
  const decodedName = decodeURIComponent(name);
  const songs = await fetchArtistSongs(decodedName);
  return c.json(songs);
});

app.get("/search", zValidator("query", searchQuerySchema), async (c) => {
  const { q } = c.req.valid("query");
  // const results = await fetchSearchResults(q);
  const results = await googleSearch(q);
  return c.json(results);
});

export const GET = handle(app);
export const POST = handle(app);
