"use client";

import List from "@/components/list";
import ListItem from "@/components/list-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderIcon, SearchIcon } from "lucide-react";
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
    useState<Awaited<ReturnType<typeof searchAction>>>();
  const [query, setQuery] = useState(urlQuery);
  const [searchedQuery, setSearchedQuery] = useState(urlQuery);

  useEffect(() => {
    if (urlQuery) {
      const performInitialSearch = async () => {
        const formData = new FormData();
        formData.append("query", urlQuery);
        const results = await searchAction(formData);
        setResult(results);
        setSearchedQuery(query);
      };

      performInitialSearch();
    }
  }, [urlQuery]);

  const handleSubmit = async (formData: FormData) => {
    const results = await searchAction(formData);
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
            placeholder="曲名・アーティスト名で検索"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="backdrop-blur-md"
          />
          <SearchButton />
        </div>
      </form>

      {result?.artists && (
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
      {result?.songs && (
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
