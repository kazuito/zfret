import Link from "next/link";
import { ClientOnly } from "@/components/client-only";
import FavButton from "@/components/fav-button";
import {
  HeadingContent,
  HeadingRoot,
  HeadingSubtitle,
  HeadingSuffix,
  HeadingTitle,
} from "@/components/heading";
import type { Song } from "@/features/song/actions";

export const SongHeading = ({ song }: { song: Song }) => {
  const favItem = {
    type: "song" as const,
    title: song.title,
    artistName: song.artist.name,
    link: `/song/${song.id}`,
  };

  return (
    <HeadingRoot>
      <div className="mr-4 h-14 w-1.5 shrink-0 rounded-full bg-accent/50" />
      <HeadingContent>
        <HeadingTitle>{song.title}</HeadingTitle>
        <HeadingSubtitle asChild>
          <Link href={song.artist.url}>{song.artist.name}</Link>
        </HeadingSubtitle>
      </HeadingContent>
      <HeadingSuffix>
        <ClientOnly>
          <FavButton item={favItem} />
        </ClientOnly>
      </HeadingSuffix>
    </HeadingRoot>
  );
};
