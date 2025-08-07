import { LS_KEYS } from "@/lib/constants";
import { useLocalStorage } from "react-use";

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
  return useLocalStorage<BrowsingHistoryItem[]>(LS_KEYS.BROWSING_HISTORY, []);
}
