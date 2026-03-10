"use server";

import { load } from "cheerio";
import { parseArtistItem, parseChords, parseSongItem } from "./parse";

export async function scrapeSong(id: string) {
  const url = `https://www.ufret.jp/song.php?data=${id}`;
  const res = await fetch(url);
  const html = await res.text();
  const $ = load(html);

  const title = $("h1.p-detail-head__ttl").text().trim();
  const artistName = $("a.p-detail-head__artist").first().text().trim();
  const encodedArtistName = encodeURIComponent(artistName);

  const [writer, composer] = $(".p-detail-head__lyrics > span");
  const writerNames = $(writer).text().split(", ");
  const composerNames = $(composer).text().split(", ");

  const youtubeVideoId = html.match(/var ytID = '(.+?)';/)?.[1] ?? null;

  const chords = parseChords(html);

  return {
    id,
    title,
    artist: {
      name: artistName,
      url: `/artist/${encodedArtistName}`,
    },
    writerNames,
    composerNames,
    lines: chords,
    youtubeVideoId,
  };
}

export async function scrapeArtistSongs(name: string) {
  const encodedArtistName = encodeURIComponent(name);
  const url = `https://www.ufret.jp/artist.php?data=${encodedArtistName}`;
  const res = await fetch(url);
  const $ = load(await res.text());

  const songItems = $(".js-artistSong li.normal-chord");
  const artistSongs = songItems.map((_, el) => parseSongItem($, el)).get();

  return artistSongs;
}

export async function scrapeTopSongs() {
  const res = await fetch("https://www.ufret.jp/rank.php");
  const $ = load(await res.text());

  const $items = $("ul.c-list--rank").first().find("li.normal-chord");
  const topSongs = $items
    .map((_, item) => parseSongItem($, item))
    .get()
    .filter((song) => !song.tags.includes("初心者ver"));

  return topSongs;
}

export async function scrapeTopArtists() {
  const res = await fetch("https://www.ufret.jp/rank_artist.php");
  const $ = load(await res.text());

  const artistItems = $("ul.c-list--rank").first().find("li");
  const topArtists = artistItems.map((_, el) => parseArtistItem($, el)).get();

  return topArtists;
}

export async function scrapeSearchResults(query: string) {
  const url = `https://www.ufret.jp/search.php?key=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  const $ = load(await res.text());

  const artists = $("ul.c-card-artist .c-card-artist__artist")
    .map((_, el) => {
      const $el = $(el);
      const name = $el.text().trim();
      const url = `/artist/${encodeURIComponent(name)}`;
      return { name, url, id: name };
    })
    .get();

  const songs = $("ul.c-list > li.normal-chord")
    .map((_, el) => parseSongItem($, el))
    .get();

  return {
    artists,
    songs,
  };
}
