"use server";

import { fetchSearchResults } from "@/lib/song";

export async function searchAction(formData: FormData) {
  const query = (formData.get("query") as string) || "";
  const results = await fetchSearchResults(query);
  return { results, query };
}
