"use client";

import { Search01Icon } from "@hugeicons/core-free-icons";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "motion/react";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { RecentSearches } from "@/app/search/_components/recent-searches";
import { HeadingRoot, HeadingTitle } from "@/components/heading";
import { Icon } from "@/components/icon";
import {
  ListContent,
  ListItemLink,
  ListItemSubtitle,
  ListItemTitle,
  ListRoot,
} from "@/components/ui/list";
import { useSearchHistory } from "@/hooks/use-search-history";
import {
  getSearchResults,
  type SearchResult,
} from "../../features/song/actions";
import {
  SearchForm,
  SearchInput,
  SearchSubmit,
} from "./_components/search-form";

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
    queryFn: () => getSearchResults(trimmedUrlQuery),
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
    setIsInputFocused(false);
    await setUrlQuery(trimmed);
  };

  const handleHistorySelect = async (historyQuery: string) => {
    setQuery(historyQuery);
    searchHistory.add(historyQuery);
    setIsInputFocused(false);
    await setUrlQuery(historyQuery);
  };

  const isPending = isFetching || isLoading;

  const showSearchHistory =
    !isPending &&
    searchHistory.queries.length > 0 &&
    (!results || isInputFocused);

  return (
    <div className="mx-auto max-w-3xl p-6 sm:pt-0">
      <HeadingRoot className="max-sm:hidden">
        <HeadingTitle>
          <Icon icon={Search01Icon} strokeWidth={2.6} />
          Search
        </HeadingTitle>
      </HeadingRoot>

      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          onClick={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          disabled={isPending}
        />
        <SearchSubmit disabled={isPending || query.trim().length === 0} />
      </SearchForm>

      <AnimatePresence initial={false}>
        {showSearchHistory && (
          <RecentSearches
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
            className="my-20 flex justify-center text-foreground/60"
          >
            <div className="flex animate-bounce items-center">Searching...</div>
          </div>
        )}
        {showEmptyMessage && (
          <div className="my-20 text-center text-foreground/60">
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
                    href={artist.url}
                    className="truncate rounded-full border bg-secondary/40 px-4 py-2"
                  >
                    {artist.name}
                  </Link>
                ))}
              </div>
            )}
            {results.songs.length > 0 && (
              <ListRoot>
                <ListContent>
                  {results.songs.map((song: SearchResult["songs"][number]) => (
                    <ListItemLink key={song.id} href={song.url}>
                      <ListItemTitle>{song.title}</ListItemTitle>
                      <ListItemSubtitle>{song.artistName}</ListItemSubtitle>
                    </ListItemLink>
                  ))}
                </ListContent>
              </ListRoot>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
