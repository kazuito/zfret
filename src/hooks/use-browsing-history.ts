import { LS_KEYS } from "@/lib/constants";
import { useLocalStorage } from "@uidotdev/usehooks";

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

export type BrowsingHistoryItemInput =
  | Omit<BrowsingHistoryItem, "timestamp"> & { timestamp?: number };

export function useBrowsingHistory() {
  const [historyItems, saveHistoryItems] = useLocalStorage<
    BrowsingHistoryItem[]
  >(LS_KEYS.BROWSING_HISTORY, []);

  const setHistoryItems = (items: BrowsingHistoryItem[]) => {
    saveHistoryItems(items);
  };

  const addHistoryItem = (item: BrowsingHistoryItemInput) => {
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
  };

  const clearAllHistory = () => {
    saveHistoryItems([]);
  };

  return {
    historyItems,
    setHistoryItems,
    addHistoryItem,
    clearAllHistory,
  };
}
