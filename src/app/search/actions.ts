"use server";

import { googleSearch } from "@/lib/search";

export async function searchAction(formData: FormData) {
  const query = (formData.get("query") as string) || "";
  const results = await googleSearch(query);
  return results;
}
