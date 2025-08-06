"use client";

import { useEffect } from "react";
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

type Props = {
  item: BrowsingHistoryItem;
};

const AddHistory = ({ item }: Props) => {
  const [history, setHistory] = useLocalStorage<BrowsingHistoryItem[]>(
    "browsing-history",
    []
  );

  useEffect(() => {
    if (history === undefined) return;
    const lastHistory = history.at(-1);
    if (lastHistory && lastHistory.link === item.link) {
      return;
    } else {
      setHistory((prevHistory) => [...(prevHistory ?? []), item]);
    }
  }, [item]);

  return null;
};

export default AddHistory;
