"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

type Props = {};

const Search = ({}: Props) => {
  const [query, setQuery] = useState("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() === "") return;
    const encodedQuery = encodeURIComponent(query.trim());
    router.push(`/search?q=${encodedQuery}`);
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <Input
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};

export default Search;
