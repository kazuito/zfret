"use client";

import { LoaderIcon, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Input } from "./ui/input";

type Props = {};

const Search = ({}: Props) => {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() === "") return;
    const encodedQuery = encodeURIComponent(query.trim());

    startTransition(() => {
      router.push(`/search?q=${encodedQuery}`);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Input
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={isPending}
        className={`pr-8 ${isPending ? "opacity-50" : ""}`}
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        {isPending ? (
          <LoaderIcon
            size={16}
            className="animate-spin text-muted-foreground"
          />
        ) : (
          <SearchIcon size={16} className="text-muted-foreground" />
        )}
      </div>
    </form>
  );
};

export default Search;
