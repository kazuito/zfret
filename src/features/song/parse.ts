import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";
import { z } from "zod";

const chordsDataSchema = z.array(z.string());

export function parseChords(html: string) {
  const chordsRawData = html.match(/var ufret_chord_datas = (\[.*?\]);/)?.[1];
  if (!chordsRawData) {
    return null;
  }

  const chordsData = chordsDataSchema.parse(JSON.parse(chordsRawData));

  const chords = chordsData.map((line) => {
    return line
      .split("[")
      .filter(Boolean)
      .map((part) => {
        const tokens = part.split("]");
        return tokens.length > 1
          ? { chord: tokens[0], lyric: tokens[1].trim() }
          : { chord: null, lyric: part };
      });
  });

  return chords;
}

export function parseSongItem($: CheerioAPI, song: Element) {
  const $song = $(song);
  const title = $song.find(".c-list__title").text().trim();
  const id = String($song.find("button.c-list__favorite").data("song-id"));
  const artistName = $song.find(".c-list__artist").text().trim();
  const tags = $song
    .find(".c-list__title > [class^='c-icon__']")
    .map((_, tag) => $(tag).text())
    .get();
  const url = `/song/${id}`;

  return {
    title,
    id,
    url,
    artistName,
    tags,
  };
}

export function parseArtistItem($: CheerioAPI, artist: Element) {
  const $artist = $(artist);
  const name = $artist.find(".c-list__title").text().trim();
  const description = $artist.find(".c-list__artist").text().trim();
  const url = `/artist/${encodeURIComponent(name)}`;

  return {
    name,
    description,
    url,
  };
}
