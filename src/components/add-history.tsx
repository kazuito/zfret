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
    setHistory((prevHistory) => [
      ...(prevHistory?.filter((h) => h.link !== item.link) ?? []),
      item,
    ]);
  }, [item]);

  return null;
};

export default AddHistory;
