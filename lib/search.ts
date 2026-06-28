import Fuse from "fuse.js";

const HIRAGANA_TO_KATAKANA_OFFSET = 0x60;

export const normalizeForSearch = (value: string) =>
  value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[ぁ-ゖ]/g, (c) =>
      String.fromCharCode(c.charCodeAt(0) + HIRAGANA_TO_KATAKANA_OFFSET),
    );

export function createSearchIndex<T>(items: T[], getText: (item: T) => string) {
  return new Fuse(items, {
    keys: [
      { name: "value", getFn: (item) => normalizeForSearch(getText(item)) },
    ],
    threshold: 0.3,
    ignoreLocation: true,
  });
}

export function getGoogleSearchUrl(query: string) {
  const encodedQuery = encodeURIComponent(query);
  return `https://www.google.com/search?q=${encodedQuery}`;
}
