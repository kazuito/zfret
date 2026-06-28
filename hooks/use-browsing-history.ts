"use client";

import { useCallback } from "react";
import useLocalStorageState from "use-local-storage-state";
import { LS_KEYS } from "@/lib/constants";

export type BrowsingHistoryItem =
  | {
      type: "song";
      title: string;
      artistName: string;
      link: string;
      timestamp: number;
    }
  | {
      type: "artist";
      name: string;
      link: string;
      timestamp: number;
    };

export type BrowsingHistoryItemInput = Omit<
  BrowsingHistoryItem,
  "timestamp"
> & { timestamp?: number };

export function useBrowsingHistory() {
  const [historyItems, saveHistoryItems] = useLocalStorageState<
    BrowsingHistoryItem[]
  >(LS_KEYS.BROWSING_HISTORY, { defaultValue: [] });

  const setHistoryItems = useCallback(
    (items: BrowsingHistoryItem[]) => {
      saveHistoryItems(items);
    },
    [saveHistoryItems],
  );

  const addHistoryItem = useCallback(
    (item: BrowsingHistoryItemInput) => {
      const normalizedItem = {
        ...item,
        timestamp: item.timestamp ?? Date.now(),
      } as BrowsingHistoryItem;

      saveHistoryItems((prev) => {
        return [
          ...prev.filter((h) => h.link !== normalizedItem.link),
          normalizedItem,
        ];
      });
    },
    [saveHistoryItems],
  );

  const clearAllHistory = useCallback(() => {
    saveHistoryItems([]);
  }, [saveHistoryItems]);

  return {
    historyItems,
    setHistoryItems,
    addHistoryItem,
    clearAllHistory,
  };
}
