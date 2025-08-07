import { load } from "cheerio";
import { parseHTML } from "linkedom";
import z from "zod";

const chordsDataSchema = z.array(z.string());

export async function fetchSong(id: string) {
  const url = `https://www.ufret.jp/song.php?data=${id}`;
  const res = await fetch(url, {
    next: { revalidate: 86400 }, // Cache for 24 hours
  });
  const html = await res.text();
  const $ = load(html);

  const title = $(".show_name").text().trim();
  const artistName = $(".show_artist").first().text().trim();
  const encodedArtistName = encodeURIComponent(artistName);
  const lyricistComposerMatch = $(".show_lyrics")
    .text()
    .match(/作詞 : (.+)\/作曲 : (.+)/);
  const lyricistNames = lyricistComposerMatch?.[1]?.split(", ") ?? [];
  const composerNames = lyricistComposerMatch?.[2]?.split(", ") ?? [];

  const chordsRawData = html.match(/var ufret_chord_datas = (\[.*?\]);/)?.[1];
  if (!chordsRawData) {
    throw new Error("Chords data not found in the HTML");
  }

  const youtubeVideoId = html.match(/var ytID = '(.+?)';/)?.[1] ?? null;

  const parsedChordsData = chordsDataSchema.safeParse(
    JSON.parse(chordsRawData)
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
    lyricistNames,
    composerNames,
    lines: chords,
    youtubeVideoId,
  };
}

export async function fetchSearchResults(query: string) {
  const url = `https://www.ufret.jp/search.php?key=${query}`;
  const res = await fetch(url, {
    next: { revalidate: 86400 }, // Cache for 24 hours
  });
  const html = await res.text();
  const { document } = parseHTML(html);

  const artistElements = document.querySelectorAll(".artist_list.btn");
  const artists = Array.from(artistElements).map((item) => {
    const name = item.textContent?.trim();
    const encodedName = encodeURIComponent(name || "");
    return {
      name,
      url: `/artist/${encodedName}`,
    };
  });

  const songElements = document.querySelectorAll(
    ".list-group > .list-group-item.list-group-item-action:not(:has(.badge))"
  );
  const songs = Array.from(songElements)
    .map((item) => {
      const title = item.querySelector("strong")?.textContent?.trim();
      const artistName = item.querySelector("span")?.textContent?.trim();
      const encodedArtistName = encodeURIComponent(artistName || "");
      const url = item.getAttribute("href");
      const id = url?.match(/data=(\d+)/)?.[1];
      return {
        id,
        title,
        url: `/song/${id}`,
        artist: {
          name: artistName,
          url: `https://www.ufret.jp/artist.php?data=${encodedArtistName}`,
        },
      };
    })
    .filter((song) => song.id && song.title && song.artist);

  return {
    artists,
    songs,
  };
}

export async function fetchArtistSongs(
  artistName: string,
  { limit } = {
    limit: -1,
  }
) {
  const encodedArtistName = encodeURIComponent(artistName);
  const url = `https://www.ufret.jp/artist.php?data=${encodedArtistName}`;
  const res = await fetch(url, {
    next: { revalidate: 86400 }, // Cache for 24 hours
  });
  const html = await res.text();
  const { document } = parseHTML(html);
  const resultElements = document.querySelectorAll(
    ".list-group > .list-group-item.list-group-item-action:not([style='display:none;'])"
  );
  return Array.from(resultElements)
    .map((item) => {
      const title = item.querySelector("strong")?.textContent?.trim();
      const url = item.getAttribute("href");
      const id = url?.match(/data=(\d+)/)?.[1];
      return {
        id,
        title,
        url: `/song/${id}`,
      };
    })
    .filter((song) => song.id && song.title)
    .slice(0, limit);
}

type FetchTopSongsArgs = {
  limit?: number;
};

export async function fetchTopSongs(
  { limit }: FetchTopSongsArgs = {
    limit: 10,
  }
) {
  const url = "https://www.ufret.jp/rank.php";
  const res = await fetch(url, {
    next: { revalidate: 86400 }, // Cache for 24 hours
  });
  const html = await res.text();
  const { document } = parseHTML(html);

  const songElements = document.querySelectorAll("a[href^='/song.php']");

  const topSongs = Array.from(songElements).map((item) => {
    const title = item.querySelector("strong")?.textContent?.trim();
    const id = item.getAttribute("href")?.match(/data=(\d+)/)?.[1];
    const artistName = item
      .querySelector("span:last-child")
      ?.textContent?.trim();
    return {
      title,
      id,
      url: `/song/${id}`,
      artistName,
    };
  });

  return topSongs.slice(0, limit);
}

type FetchTopArtistsArgs = {
  limit?: number;
};

export async function fetchTopArtists(
  { limit }: FetchTopArtistsArgs = { limit: 10 }
) {
  const url = "https://www.ufret.jp/rank_artist.php";
  const res = await fetch(url, {
    next: { revalidate: 86400 }, // Cache for 24 hours
  });
  const html = await res.text();
  const { document } = parseHTML(html);

  const artistElements = document.querySelectorAll(
    "a[href^='/artist.php'].list-group-item.list-group-item-action"
  );

  const topArtists = Array.from(artistElements).map((item) => {
    const name = item.querySelector("strong")?.textContent?.trim();
    const encodedName = encodeURIComponent(name || "");
    return {
      name,
      url: `/artist/${encodedName}`,
    };
  });

  return topArtists.slice(0, limit);
}
