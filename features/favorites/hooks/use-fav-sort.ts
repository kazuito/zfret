"use client";

import { parseAsStringLiteral, useQueryState } from "nuqs";
import { favSortKeys, favSortOrders } from "../constants";

const sortKeyParser =
  parseAsStringLiteral(favSortKeys).withDefault("timestamp");
const sortOrderParser = parseAsStringLiteral(favSortOrders).withDefault("desc");

export const useFavSort = () => {
  const [sortKey, setSortKey] = useQueryState("sortKey", sortKeyParser);
  const [sortOrder, setSortOrder] = useQueryState("sortOrder", sortOrderParser);

  return { sortKey, setSortKey, sortOrder, setSortOrder };
};
