"use client";

import { List } from "@/components/list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { search, SearchResult } from "@/lib/search";
import { LoaderIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { useEffect, useState, useTransition } from "react";

const Page = () => {
  const [urlQuery, setUrlQuery] = useQueryState("q", {
    history: "replace",
  });
  const [query, setQuery] = useState(urlQuery ?? "");
  const [results, setResults] = useState<SearchResult>();
  const [isPending, startTransition] = useTransition();

  const showEmptyMessage = !!(
    urlQuery &&
    !isPending &&
    results?.artists.length === 0 &&
    results?.songs.length === 0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUrlQuery(query.trim());
  };

  useEffect(() => {
    const q = urlQuery?.trim();
    if (!q) return;
    setQuery(q);
    startTransition(() => search(q).then(setResults));
  }, [urlQuery]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <Input
          type="search"
          name="q"
          aria-label="Search"
          placeholder="Search for songs or artists"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isPending}
          autoFocus
        />
        <Button type="submit" size="icon" disabled={isPending}>
          <SearchIcon />
        </Button>
      </form>
      <div>
        {isPending && (
          <div
            role="status"
            aria-live="polite"
            className="justify-center flex my-20 text-foreground/60"
          >
            <div className="flex gap-1 items-center animate-bounce">
              <LoaderIcon className="animate-spin size-4" />
              Searching...
            </div>
          </div>
        )}
        {showEmptyMessage && (
          <div className="text-center my-20 text-foreground/60">
            No results found for &quot;<b>{urlQuery}</b>&quot;.
          </div>
        )}
        {!isPending && results && (
          <div className="mt-6 flex flex-col gap-6">
            {results.artists.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {results.artists.map((artist) => (
                  <Link
                    key={artist.id}
                    href={artist.link}
                    className="px-4 py-2 border rounded-full bg-secondary/40 truncate"
                  >
                    {artist.name}
                  </Link>
                ))}
              </div>
            )}
            {results.songs.length > 0 && (
              <List.Wrapper>
                <List.Content>
                  {results.songs.map((song) => (
                    <List.Item
                      key={song.id}
                      href={song.link}
                      description={song.artistName}
                    >
                      {song.title}
                    </List.Item>
                  ))}
                </List.Content>
              </List.Wrapper>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
