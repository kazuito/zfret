"use cache";

import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import AddHistory from "@/components/add-history";
import { ClientOnly } from "@/components/client-only";
import { getSong } from "@/features/song/actions";
import { ChordSheet } from "./_components/chord-sheet";
import { RelatedSongList } from "./_components/related-song-list";
import { SongCredits } from "./_components/song-credits";
import { SongHeading } from "./_components/song-heading";
import { VideoPlayer } from "./_components/video-player";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  cacheLife("max");

  const { id: songId } = await params;
  const song = await getSong(songId);
  return {
    title: `${decodeURIComponent(song.title)} - ${decodeURIComponent(
      song.artist.name,
    )} | Z-FRET`,
  };
};

const Page = async ({ params }: Props) => {
  cacheLife("max");

  const { id: songId } = await params;

  const song = await getSong(songId);

  if (!song.lines) {
    return notFound();
  }

  const historyItem = {
    type: "song" as const,
    title: song.title,
    artistName: song.artist.name,
    link: `/song/${songId}`,
  };

  return (
    <div className="mx-auto max-w-3xl p-6 pt-0">
      <ClientOnly>
        <AddHistory item={historyItem} />
      </ClientOnly>

      <SongHeading song={song} />
      <div className="mx-auto max-w-3xl">
        {song.youtubeVideoId && (
          <VideoPlayer youtubeVideoId={song.youtubeVideoId} />
        )}
        <div className="mt-10 space-y-10">
          <ChordSheet lines={song.lines} />
          <SongCredits song={song} />
        </div>
        <Suspense>
          <RelatedSongList
            className="my-10"
            artistName={song.artist.name}
            songId={songId}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
