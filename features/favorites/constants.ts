import type { FavoriteItem } from "./types";

export const favSortDefinitions = {
  timestamp: {
    label: "Date Added",
    fn: (a: FavoriteItem, b: FavoriteItem) => b.timestamp - a.timestamp,
  },
  title: {
    label: "Title",
    fn: (a: FavoriteItem, b: FavoriteItem) => {
      const titleComparison = a.title.localeCompare(b.title);
      if (titleComparison === 0) {
        return a.artistName.localeCompare(b.artistName);
      }
      return titleComparison;
    },
  },
  artist: {
    label: "Artist",
    fn: (a: FavoriteItem, b: FavoriteItem) => {
      const artistComparison = a.artistName.localeCompare(b.artistName);
      if (artistComparison === 0) {
        return a.title.localeCompare(b.title);
      }
      return artistComparison;
    },
  },
};

export const favSortOptions = Object.entries(favSortDefinitions).map(
  ([key, value]) => ({
    label: value.label,
    value: key,
  }),
);

export type FavSortKey = keyof typeof favSortDefinitions;
export type FavSortOrder = "asc" | "desc";
