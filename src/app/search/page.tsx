"use client";

import { List, ListItem } from "@/components/list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { search, SearchResult } from "@/lib/search";
import { LoaderIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { Suspense, useEffect, useState } from "react";

const PageWrapper = () => {
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
};

const Page = () => {
  const [urlQuery, setUrlQuery] = useQueryState("q");
  const [query, setQuery] = useState(urlQuery ?? "");
  const [results, setResults] = useState<SearchResult>();
  const [loading, setLoading] = useState(false);

  const empty = !!(
    urlQuery &&
    !loading &&
    results?.artists.length === 0 &&
    results?.songs.length === 0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUrlQuery(query);
  };

  useEffect(() => {
    if (!urlQuery) return;
    setLoading(true);
    search(urlQuery)
      .then((data) => setResults(data))
      .finally(() => setLoading(false));
  }, [urlQuery]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <Input
          type="search"
          placeholder="曲名・アーティスト名で検索"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading}
          autoFocus
        />
        <Button size="icon" disabled={loading}>
          <SearchIcon />
        </Button>
      </form>
      <div>
        {loading && (
          <div className="justify-center flex my-20 text-foreground/60">
            <div className="flex gap-1 items-center animate-bounce">
              <LoaderIcon className="animate-spin size-4" />
              検索中...
            </div>
          </div>
        )}
        {empty && (
          <div className="text-center my-20 text-foreground/60">
            <b>{urlQuery}</b> の検索結果が見つかりませんでした。
          </div>
        )}
        {!loading && results && (
          <div className="mt-6 flex flex-col gap-4">
            {results.artists.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {results.artists.map((artist) => (
                  <Link
                    href={artist.link}
                    key={artist.id}
                    className="px-4 py-2 border rounded-full bg-secondary/40"
                  >
                    {artist.name}
                  </Link>
                ))}
              </div>
            )}
            {results.songs.length > 0 && (
              <List>
                {results.songs.map((song) => (
                  <ListItem
                    href={song.link}
                    key={song.id}
                    title={song.title}
                    description={song.artistName}
                  />
                ))}
              </List>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageWrapper;
