"use server";

import { customsearch } from "@googleapis/customsearch";

const customSearch = customsearch({
  version: "v1",
  auth: process.env.GOOGLE_API_KEY,
});

export async function googleSearch(query: string) {
  const res = await customSearch.cse.list({
    q: query,
    cx: process.env.GOOGLE_CX_ID,
    num: 10,
  });

  const artistItems =
    res.data.items?.filter((item) => item.link?.includes("/artist.php")) || [];
  const songItems =
    res.data.items?.filter((item) => item.link?.includes("/song.php")) || [];

  const artists = artistItems.map((item) => {
    let name = item.title?.split(/(.*?) - ギターコード/)[1] || "";

    if (!name) {
      name = item.title || "";
    }

    return {
      name,
      link: `/artist/${encodeURIComponent(name)}`,
    };
  });

  const songs = songItems.map((item) => {
    let title = item.title?.match(/(.*?)\s\//)?.[1] ?? "";
    const artistName = item.title?.match(/\/\s(.*?)\sギターコード/)?.[1] ?? "";

    if (!title) {
      title = item.title ?? "";
    }

    const id = new URL(item.link ?? "").searchParams.get("data") || "";
    return {
      title: title.replace(/^初心者向け簡単コード /, ""),
      artistName,
      link: `/song/${id}`,
    };
  });

  return {
    artists,
    songs,
  };
}
