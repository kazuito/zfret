import type { FavoriteItem } from "./types";

export const favSortDefinitions = {
  timestamp: {
    label: "Date Added",
    fn: (a: FavoriteItem, b: FavoriteItem) => a.timestamp - b.timestamp,
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

export type FavSortKey = keyof typeof favSortDefinitions;
export type FavSortOrder = "asc" | "desc";

export const favSortKeys = Object.keys(favSortDefinitions) as [
  FavSortKey,
  ...FavSortKey[],
];
export const favSortOrders = [
  "asc",
  "desc",
] as const satisfies readonly FavSortOrder[];

export const favSortOptions = favSortKeys.map((key) => ({
  label: favSortDefinitions[key].label,
  value: key,
}));
