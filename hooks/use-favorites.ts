"use client";

import { useLocalStorage } from "@uidotdev/usehooks";
import { LS_KEYS } from "@/lib/constants";

export type FavoriteItem = {
  type: "song";
  title: string;
  artistName: string;
  link: string;
  timestamp: number;
};

export type FavoriteItemInput = Omit<FavoriteItem, "timestamp"> & {
  timestamp?: number;
};

export function useFavorites() {
  const [favorites, saveFavorites] = useLocalStorage<FavoriteItem[]>(
    LS_KEYS.FAVORITES,
    [],
  );

  const normalizeFavorite = (item: FavoriteItemInput): FavoriteItem => ({
    ...item,
    timestamp: item.timestamp ?? Date.now(),
  });

  const addFavorite = (item: FavoriteItemInput) => {
    const normalized = normalizeFavorite(item);
    saveFavorites([
      ...favorites.filter((fav) => fav.link !== normalized.link),
      normalized,
    ]);
  };

  const removeFavorite = (item: FavoriteItemInput) => {
    saveFavorites(favorites.filter((fav) => fav.link !== item.link));
  };

  const toggleFavorite = (item: FavoriteItemInput) => {
    if (favorites.some((fav) => fav.link === item.link)) {
      removeFavorite(item);
    } else {
      addFavorite(item);
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };
}
