"use client";

import { useEffect } from "react";
import {
  type BrowsingHistoryItemInput,
  useBrowsingHistory,
} from "../hooks/use-browsing-history";

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
