"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchSearchResults } from "@/lib/song";
import { LoaderIcon, MicVocalIcon, Music2Icon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { searchAction } from "./actions";

function SearchButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending}>
      {pending ? (
        <LoaderIcon size={16} className="animate-spin" />
      ) : (
        <SearchIcon size={16} />
      )}
    </Button>
  );
}

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") || "";

  const [result, setResult] =
    useState<Awaited<ReturnType<typeof fetchSearchResults>>>();
  const [query, setQuery] = useState(urlQuery);
  const [searchedQuery, setSearchedQuery] = useState(urlQuery);

  useEffect(() => {
    if (urlQuery) {
      const performInitialSearch = async () => {
        const formData = new FormData();
        formData.append("query", urlQuery);
        const { results, query } = await searchAction(formData);
        setResult(results);
        setSearchedQuery(query);
      };

      performInitialSearch();
    }
  }, [urlQuery]);

  const handleSubmit = async (formData: FormData) => {
    const { results, query } = await searchAction(formData);
    setResult(results);
    setSearchedQuery(query);

    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <form action={handleSubmit} className="mb-6 sticky top-6">
        <div className="flex items-center gap-2">
          <Input
            name="query"
            placeholder="Search for songs or artists"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="backdrop-blur-md"
          />
          <SearchButton />
        </div>
      </form>

      {result?.songs?.length === 0 && searchedQuery && (
        <div className="flex justify-center pt-24">
          <div className="text-muted-foreground">
            No results found for{" "}
            <span className="font-bold">{searchedQuery}</span>
          </div>
        </div>
      )}

      {result && (
        <div className="mt-6">
          <div className="flex flex-wrap gap-2">
            {result?.artists?.map((artist) => {
              return (
                <Link
                  href={artist.url}
                  className="rounded-full flex gap-1.5 py-1.5 px-3 text-sm bg-secondary border"
                  key={artist.name}
                >
                  <MicVocalIcon className="h-[1lh] shrink-0" size={14} />
                  {artist.name}
                </Link>
              );
            })}
          </div>
          <div className="mt-6">
            {result?.songs?.map((song) => {
              return (
                <Link
                  key={song.id}
                  href={song.url}
                  className="flex items-center p-2 hover:bg-dimmed rounded-sm"
                >
                  <Music2Icon size={16} className="shrink-0" />
                  <div className="ml-2 shrink-0">{song.title}</div>
                  <div className="text-muted-foreground truncate ml-4 text-sm">
                    {song.artist.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
