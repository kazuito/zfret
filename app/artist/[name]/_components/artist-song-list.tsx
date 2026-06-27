"use client";

import { useQueryState } from "nuqs";
import {
  ListContent,
  ListItemLink,
  ListItemTitle,
  ListRoot,
} from "@/components/ui/list";
import type { getArtistSongs } from "@/features/song/queries";

export const ArtistSongList = ({
  songs,
}: {
  songs: Awaited<ReturnType<typeof getArtistSongs>>;
}) => {
  const [query] = useQueryState("q");

  const computedSongs = query?.trim()
    ? songs.filter((song) => song.title.includes(query))
    : songs;

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
