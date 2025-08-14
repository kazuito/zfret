"use client";

import { LS_KEYS } from "@/lib/constants";
import { useLocalStorage } from "@uidotdev/usehooks";

export type FavoriteItem = {
  type: "song";
  title: string;
  artistName: string;
  link: string;
  timestamp: number;
};

export function useFavorites() {
  const [favorites, saveFavorites] = useLocalStorage<FavoriteItem[]>(
    LS_KEYS.FAVORITES,
    []
  );

  const addFavorite = (item: FavoriteItem) => {
    saveFavorites([...favorites, item]);
  };

  const removeFavorite = (item: FavoriteItem) => {
    saveFavorites(favorites.filter((fav) => fav.link !== item.link));
  };

  const toggleFavorite = (item: FavoriteItem) => {
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
