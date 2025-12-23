"use server";

import { load } from "cheerio";
import { z } from "zod";
import { cacheLife } from "next/cache";

const chordsDataSchema = z.array(z.string());

export async function fetchSong(id: string) {
  "use cache";
  cacheLife("max");

  const url = `https://www.ufret.jp/song.php?data=${id}`;
  const res = await fetch(url);
  const html = await res.text();
  const $ = load(html);

  const title = $(".show_name").text().trim();
  const artistName = $(".show_artist").first().text().trim();
  const encodedArtistName = encodeURIComponent(artistName);

  const tags = $("p[style='margin-bottom:5px;'] > span.badge")
    .map((_, el) => $(el).text().trim())
    .get()
    .filter(Boolean);

  const writerComposerMatch = $(".show_lyrics")
    .text()
    .match(/作詞 : (.+)\/作曲 : (.+)/);
  const writerNames = writerComposerMatch?.[1]?.split(", ") ?? [];
  const composerNames = writerComposerMatch?.[2]?.split(", ") ?? [];

  const youtubeVideoId = html.match(/var ytID = '(.+?)';/)?.[1] ?? null;

  const chordsRawData = html.match(/var ufret_chord_datas = (\[.*?\]);/)?.[1];
  if (!chordsRawData) {
    throw new Error("Chords data not found in the HTML");
  }

  const parsedChordsData = chordsDataSchema.safeParse(
    JSON.parse(chordsRawData),
  );
  if (!parsedChordsData.success) {
    throw new Error("Invalid chords data format");
  }

  const chordsData = parsedChordsData.data;

  const chords = chordsData.map((line) => {
    return line
      .split("[")
      .filter(Boolean)
      .map((part) => {
        const tokens = part.split("]");
        return tokens.length > 1
          ? {
              chord: tokens[0],
              lyric: tokens[1].trim(),
            }
          : {
              chord: null,
              lyric: part,
            };
      });
  });

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
    tags,
  };
}

type FetchArtistSongsOptions = {
  limit?: number;
};

export async function fetchArtistSongs(
  artistName: string,
  options: FetchArtistSongsOptions = {
    limit: -1,
  },
) {
  "use cache";
  cacheLife("weeks");

  const encodedArtistName = encodeURIComponent(artistName);
  const url = `https://www.ufret.jp/artist.php?data=${encodedArtistName}`;
  const res = await fetch(url);
  const html = await res.text();
  const $ = load(html);

  const resultElements = $(
    ".list-group > .list-group-item.list-group-item-action",
  ).filter((_, el) => $(el).attr("style") !== "display:none;");

  return resultElements
    .map((_, el) => {
      const $el = $(el);
      const title = $el.find("strong").text()?.trim();
      const href = $el.attr("href");
      const id = href?.match(/data=(\d+)/)?.[1];
      const tags = $el
        .find("span.badge")
        .map((_, el) => $(el).text().trim())
        .get();

      if ($el.find(".fab.fa-smile").length) tags.push("beginner");

      return {
        id,
        title,
        url: `/song/${id}`,
        tags,
      };
    })
    .get()
    .filter((song) => song.id && song.title)
    .filter(
      (song) =>
        !song.tags.includes("ピアノソロ初級") &&
        !song.tags.includes("弾き語りTAB譜") &&
        !song.tags.includes("beginner"),
    )
    .slice(0, options.limit);
}

type FetchRelatedSongsOptions = {
  limit: number;
};

export async function fetchRelatedSongs(
  songId: string,
  artistName: string,
  options: FetchRelatedSongsOptions = {
    limit: 20,
  },
) {
  "use cache";
  cacheLife("weeks");

  const artistSongs = await fetchArtistSongs(artistName);
  const selfIndex = artistSongs.findIndex((song) => song.id === songId);

  if (selfIndex === -1) return artistSongs.slice(0, options.limit);

  const startIndex = Math.max(0, selfIndex - options.limit / 2);
  const endIndex = Math.min(artistSongs.length, startIndex + options.limit);

  return artistSongs
    .filter((song) => song.id !== songId)
    .slice(startIndex, endIndex);
}

type FetchTopSongsOptions = {
  limit: number;
};

export async function fetchTopSongs(
  options: FetchTopSongsOptions = {
    limit: 10,
  },
) {
  "use cache";
  cacheLife("days");

  const url = "https://www.ufret.jp/rank.php";
  const res = await fetch(url);
  const html = await res.text();
  const $ = load(html);

  const songElements = $("a[href^='/song.php']");

  const topSongs = songElements
    .map((_, el) => {
      const $el = $(el);
      const title = $el.find("strong").text().trim();
      const id = $el.attr("href")?.match(/data=(\d+)/)?.[1];
      const artistName = $el.find("span").last().text().trim();
      const tags = $el
        .find("span.badge")
        .map((_, el) => $(el).text().trim())
        .get();
      return {
        title,
        id,
        url: `/song/${id}`,
        artistName,
        tags,
      };
    })
    .get()
    .filter((song) => !song.tags.includes("初心者"));

  return topSongs.slice(0, options.limit);
}

type FetchTopArtistsOptions = {
  limit: number;
};

export async function fetchTopArtists(
  options: FetchTopArtistsOptions = { limit: 10 },
) {
  "use cache";
  cacheLife("days");

  const url = "https://www.ufret.jp/rank_artist.php";
  const res = await fetch(url);
  const html = await res.text();
  const $ = load(html);

  const artistElements = $(
    "a[href^='/artist.php'].list-group-item.list-group-item-action",
  );

  const topArtists = artistElements
    .map((_, el) => {
      const name = $(el).find("strong").text().trim();
      const encodedName = encodeURIComponent(name || "");
      return {
        name,
        url: `/artist/${encodedName}`,
      };
    })
    .get();

  return topArtists.slice(0, options.limit);
}
