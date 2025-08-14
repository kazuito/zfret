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

export function useBrowsingHistory() {
  const [historyItems, saveHistoryItems] = useLocalStorage<
    BrowsingHistoryItem[]
  >(LS_KEYS.BROWSING_HISTORY, []);

  const addHistoryItem = (item: BrowsingHistoryItem) => {
    saveHistoryItems((prev) => {
      return [...prev.filter((h) => h.link !== item.link), item];
    });
  };

  const removeAllHistory = () => {
    saveHistoryItems([]);
  };

  return {
    historyItems,
    addHistoryItem,
    removeAllHistory,
  };
}
