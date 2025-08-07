"use client";

import { LS_KEYS } from "@/lib/constants";
import { useEffect, useState } from "react";

export type FavoriteItem = {
  type: "song";
  title: string;
  artistName: string;
  link: string;
  timestamp: number;
};

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[] | null>(null);
  const loading = favorites === null;

  // Initialize from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LS_KEYS.FAVORITES);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load favorites:", error);
      setFavorites([]);
    }
  }, []);

  // Save to localStorage when favorites change
  useEffect(() => {
    if (loading) return;
    try {
      localStorage.setItem(LS_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (error) {
      console.error("Failed to save favorites:", error);
    }
  }, [favorites]);

  const toggleFavorite = (item: FavoriteItem) => {
    if (loading) return;
    setFavorites((prev) => {
      if (prev === null) return null;
      const isFavorite = prev.some(
        (fav) => fav.type === item.type && fav.link === item.link
      );

      if (isFavorite) {
        return prev.filter((fav) => fav.link !== item.link);
      } else {
        return [...prev, { ...item, timestamp: Date.now() }];
      }
    });
  };

  const getIsFavorite = (item: FavoriteItem) => {
    return favorites?.some(
      (fav) => fav.type === item.type && fav.link === item.link
    );
  };

  return {
    loading,
    favorites,
    setFavorites,
    getIsFavorite,
    toggleFavorite,
  };
}
