"use server";

import { load } from "cheerio";

export async function search(query: string) {
  const res = await fetch(
    `https://www.ufret.jp/search.php?key=${encodeURIComponent(query)}`,
  );
  const $ = load(await res.text());

  const artists = $("a.artist_list")
    .map((_, el) => {
      const $el = $(el);
      const name = $el.text().trim();
      return {
        name,
        link: `/artist/${encodeURIComponent(name)}`,
        id: name,
      };
    })
    .get();

  const songs = $("a[href^='/song.php'].list-group-item")
    .map((_, el) => {
      const $el = $(el);
      const title = $el.find("strong").text().trim();
      const artistName = $el.find("span:last-child").text().trim();
      const url = new URL($el.attr("href") ?? "", "https://a.co");
      const id = url.searchParams.get("data");
      const badge = $el.find(".badge");

      if (badge.length > 0) {
        return null;
      }

      return {
        title,
        artistName,
        link: `/song/${id}`,
        id,
      };
    })
    .get()
    .filter(Boolean);

  return {
    artists,
    songs,
  };
}

export type SearchResult = Awaited<ReturnType<typeof search>>;
