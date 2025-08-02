"use server";

import { googleSearch } from "@/lib/search";

export async function searchAction(query: string) {
  const results = await googleSearch(query);
  return results;
}
