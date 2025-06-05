import { fetchArtistSongs, fetchSong, fetchSearchResults } from "@/lib/song";
import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.get("/song/:id", async (c) => {
  const { id } = c.req.param();
  const song = await fetchSong(id);
  return c.json(song);
});

app.get("/artist/:name", async (c) => {
  const { name } = c.req.param();
  const decodedName = decodeURIComponent(name);
  const songs = await fetchArtistSongs(decodedName);
  return c.json(songs);
});

app.get("/search", async (c) => {
  const query = c.req.query("q");
  if (!query) {
    throw new Error("Query parameter 'q' is required");
  }
  const results = await fetchSearchResults(query);
  return c.json(results);
});

export const GET = handle(app);
export const POST = handle(app);
