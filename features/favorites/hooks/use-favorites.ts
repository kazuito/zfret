"use client";

import { useCallback } from "react";
import useLocalStorageState from "use-local-storage-state";
import { LS_KEYS } from "@/lib/constants";
import type { FavoriteItem, FavoriteItemInput } from "../types";

export function useFavorites() {
  const [favorites, saveFavorites] = useLocalStorageState<FavoriteItem[]>(
    LS_KEYS.FAVORITES,
    { defaultValue: [] },
  );

  const addFavorite = useCallback(
    (item: FavoriteItemInput) => {
      const normalized = {
        ...item,
        timestamp: item.timestamp ?? Date.now(),
      };

      saveFavorites((currentFavorites) => [
        ...currentFavorites.filter((fav) => fav.link !== normalized.link),
        normalized,
      ]);
    },
    [saveFavorites],
  );

  const removeFavorite = useCallback(
    (item: FavoriteItemInput) => {
      saveFavorites((currentFavorites) =>
        currentFavorites.filter((fav) => fav.link !== item.link),
      );
    },
    [saveFavorites],
  );

  const toggleFavorite = useCallback(
    (item: FavoriteItemInput) => {
      if (favorites.some((fav) => fav.link === item.link)) {
        removeFavorite(item);
      } else {
        addFavorite(item);
      }
    },
    [addFavorite, favorites, removeFavorite],
  );

  return {
    favorites: favorites.sort((a, b) => b.timestamp - a.timestamp),
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };
}
