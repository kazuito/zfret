"use client";

import List from "@/components/list";
import ListItem from "@/components/list-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { searchAction } from "./actions";

const Page = () => {
  const [result, setResult] =
    useState<Awaited<ReturnType<typeof searchAction>>>();
  const [urlQuery, setUrlQuery] = useQueryState("q");
  const [query, setQuery] = useState(urlQuery ?? "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setUrlQuery(query);
  };

  const performSearch = async () => {
    setLoading(true);
    const results = await searchAction(query);
    setResult(results);
    setLoading(false);
  };

  useEffect(() => {
    if (urlQuery) {
      performSearch();
    }
  }, [urlQuery]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <form action={handleSubmit} className="mb-6 sticky top-6">
        <div className="flex items-center gap-2">
          <Input
            name="query"
            placeholder="曲名・アーティスト名で検索"
            disabled={loading}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="backdrop-blur-md"
          />
          <Button type="submit" size="icon" disabled={loading}>
            {loading ? (
              <LoaderIcon size={16} className="animate-spin" />
            ) : (
              <SearchIcon size={16} />
            )}
          </Button>
        </div>
      </form>

      {result?.artists && result?.artists.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {result.artists.map((artist, i) => {
            return (
              <Link
                key={i}
                className="rounded-full border px-4 py-1.5 bg-secondary/50"
                href={artist.link}
              >
                {artist.name}
              </Link>
            );
          })}
        </div>
      )}
      {result?.songs && result?.songs.length > 0 && (
        <List>
          {result.songs.map((song, i) => {
            return (
              <ListItem
                key={i}
                title={song.title}
                description={song.artistName}
                href={song.link}
              ></ListItem>
            );
          })}
        </List>
      )}
    </div>
  );
};

export default Page;
