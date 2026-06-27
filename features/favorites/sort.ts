import {
  type FavSortKey,
  type FavSortOrder,
  favSortDefinitions,
} from "./constants";
import type { FavoriteItem } from "./types";

export function sortFavorites(
  items: FavoriteItem[],
  {
    key,
    order,
  }: {
    key: FavSortKey;
    order: FavSortOrder;
  },
) {
  if (!items || items.length === 0) return [];
  const sortFn = favSortDefinitions[key as keyof typeof favSortDefinitions]?.fn;
  if (!sortFn) return items;
  const sorted = [...items].sort(sortFn);
  return order === "asc" ? sorted : sorted.reverse();
}
