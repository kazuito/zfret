"use client";

import {
  BrowsingHistoryItem,
  useBrowsingHistory,
} from "@/hooks/use-browsing-history";
import { useEffect } from "react";

type Props = {
  item: BrowsingHistoryItem;
};

const AddHistory = ({ item }: Props) => {
  const [history, setHistory] = useBrowsingHistory();

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
