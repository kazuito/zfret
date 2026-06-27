"use client";

import { useQueryState } from "nuqs";
import { useMemo } from "react";
import {
  ListContent,
  ListItemLink,
  ListItemTitle,
  ListRoot,
} from "@/components/ui/list";
import type { getArtistSongs } from "@/features/songs/queries";
import { createSearchIndex, normalizeForSearch } from "@/lib/search";

export const ArtistSongList = ({
  songs,
}: {
  songs: Awaited<ReturnType<typeof getArtistSongs>>;
}) => {
  const [query] = useQueryState("q");

  const index = useMemo(
    () => createSearchIndex(songs, (song) => song.title),
    [songs],
  );

  const computedSongs = useMemo(() => {
    const normalized = normalizeForSearch(query?.trim() ?? "");
    if (!normalized) return songs;
    return index.search(normalized).map((result) => result.item);
  }, [index, songs, query]);

  if (computedSongs.length === 0)
    return (
      <div className="py-12 text-center text-muted-foreground">
        No songs found for "{query}"
      </div>
    );

  return (
    <ListRoot>
      <ListContent>
        {computedSongs.map((song) => {
          return (
            <ListItemLink href={song.url} key={song.id}>
              <ListItemTitle>{song.title}</ListItemTitle>
            </ListItemLink>
          );
        })}
      </ListContent>
    </ListRoot>
  );
};
