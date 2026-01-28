"use client";

import { List } from "@/components/ui/list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { search, SearchResult } from "@/lib/search";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { SearchHistory } from "@/components/search-history";
import { useSearchHistory } from "@/hooks/use-search-history";
import { AnimatePresence } from "motion/react";

const Page = () => {
  const [urlQuery, setUrlQuery] = useQueryState("q", {
    history: "replace",
  });
  const [query, setQuery] = useState(urlQuery ?? "");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const searchHistory = useSearchHistory();

  const trimmedUrlQuery = urlQuery?.trim() ?? "";
  const isQueryEnabled = trimmedUrlQuery.length > 0;

  const {
    data: queryData,
    isFetching,
    isLoading,
  } = useQuery<SearchResult>({
    queryKey: ["search", trimmedUrlQuery],
    queryFn: () => search(trimmedUrlQuery),
    enabled: isQueryEnabled,
  });

  const results = isQueryEnabled ? queryData : undefined;

  const showEmptyMessage = !!(
    isQueryEnabled &&
    !isFetching &&
    !isLoading &&
    results &&
    results.artists.length === 0 &&
    results.songs.length === 0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    setQuery(trimmed);

    if (trimmed.length === 0) {
      await setUrlQuery(null);
      return;
    }

    searchHistory.add(trimmed);
    await setUrlQuery(trimmed);
  };

  const handleHistorySelect = async (historyQuery: string) => {
    setQuery(historyQuery);
    searchHistory.add(historyQuery);
    await setUrlQuery(historyQuery);
  };

  const isPending = isFetching || isLoading;

  const showSearchHistory =
    !isPending &&
    searchHistory.queries.length > 0 &&
    (!results || (results && isInputFocused));

  return (
    <div className="mx-auto max-w-3xl p-6">
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <Input
          type="search"
          name="q"
          aria-label="Search"
          placeholder="Search for songs or artists"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          disabled={isPending}
          autoFocus
        />
        <Button type="submit" size="icon" disabled={isPending}>
          <HugeiconsIcon icon={Search01Icon} size={20} />
        </Button>
      </form>
      <AnimatePresence>
        {showSearchHistory && searchHistory.queries.length > 0 && (
          <SearchHistory
            queries={searchHistory.queries}
            onSelect={handleHistorySelect}
            onRemove={searchHistory.remove}
            onClear={searchHistory.clear}
          />
        )}
      </AnimatePresence>
      <div>
        {isPending && (
          <div
            role="status"
            aria-live="polite"
            className="text-foreground/60 my-20 flex justify-center"
          >
            <div className="flex animate-bounce items-center gap-1">
              Searching...
            </div>
          </div>
        )}
        {showEmptyMessage && (
          <div className="text-foreground/60 my-20 text-center">
            No results found for &quot;<b>{urlQuery}</b>&quot;.
          </div>
        )}
        {!isPending && results && (
          <div className="mt-6 flex flex-col gap-6">
            {results.artists.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {results.artists.map(
                  (artist: SearchResult["artists"][number]) => (
                    <Link
                      key={artist.id}
                      href={artist.link}
                      className="bg-secondary/40 truncate rounded-full border px-4 py-2"
                    >
                      {artist.name}
                    </Link>
                  ),
                )}
              </div>
            )}
            {results.songs.length > 0 && (
              <List.Wrapper>
                <List.Content>
                  {results.songs.map((song: SearchResult["songs"][number]) => (
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
