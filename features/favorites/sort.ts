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
  const sortFn = favSortDefinitions[key]?.fn;
  if (!sortFn) return items;
  const dir = order === "asc" ? 1 : -1;
  return [...items].sort((a, b) => dir * sortFn(a, b));
}
