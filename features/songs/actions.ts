"use server";

import { cacheLife } from "next/cache";
import { scrapeSearchResults } from "./scrape";

export async function getSearchResults(query: string) {
  "use cache";
  cacheLife("hours");

  const searchResults = await scrapeSearchResults(query);
  return searchResults;
}

export type SearchResult = Awaited<ReturnType<typeof getSearchResults>>;
