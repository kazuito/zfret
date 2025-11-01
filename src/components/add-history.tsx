"use client";

import {
  BrowsingHistoryItemInput,
  useBrowsingHistory,
} from "@/hooks/use-browsing-history";
import { useEffect } from "react";

type Props = {
  item: BrowsingHistoryItemInput;
};

const AddHistory = ({ item }: Props) => {
  const { addHistoryItem } = useBrowsingHistory();

  useEffect(() => {
    addHistoryItem(item);
  }, [addHistoryItem, item]);

  return null;
};

export default AddHistory;
