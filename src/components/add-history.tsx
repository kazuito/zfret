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
  const { addHistoryItem } = useBrowsingHistory();

  useEffect(() => {
    addHistoryItem(item);
  }, [item]);

  return null;
};

export default AddHistory;
