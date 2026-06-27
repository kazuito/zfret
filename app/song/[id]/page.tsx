"use cache";

import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import AddHistory from "@/components/add-history";
import { Skeleton } from "@/components/ui/skeleton";
import { estimateKey } from "@/features/chords/key";
import { getSong } from "@/features/songs/queries";
import { ChordLines } from "./_components/chord-lines";
import { RelatedSongList } from "./_components/related-song-list";
import { SongControls } from "./_components/song-controls";
import { SongCredits } from "./_components/song-credits";
import { SongHeading } from "./_components/song-heading";
import { SongKey } from "./_components/song-key";
import { TransposeControl } from "./_components/transpose-control";
import { TransposeProvider } from "./_components/transpose-provider";
import { VideoPlayer, VideoPlayerProvider } from "./_components/video-player";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  cacheLife("weeks");

  const { id: songId } = await params;
  const song = await getSong(songId);
  return {
    title: `${decodeURIComponent(song.title)} - ${decodeURIComponent(
      song.artist.name,
    )} | Z-FRET`,
  };
};

const Page = async ({ params }: Props) => {
  cacheLife("weeks");

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

  const chords = song.lines
    .flat()
    .map((part) => part.chord)
    .filter((chord): chord is string => !!chord);
  const keyEstimate = estimateKey(chords);
  const baseKey = keyEstimate
    ? { tonic: keyEstimate.tonic, mode: keyEstimate.mode }
    : null;

  return (
    <VideoPlayerProvider enabled={!!song.youtubeVideoId}>
      <TransposeProvider baseKey={baseKey}>
        <div className="mx-auto max-w-3xl p-6 pt-0">
          <AddHistory item={historyItem} />

          <SongHeading song={song} />
          <div className="mx-auto max-w-3xl">
            {song.youtubeVideoId && (
              <VideoPlayer youtubeVideoId={song.youtubeVideoId} />
            )}
            <div className="mt-10 space-y-10">
              <ChordLines lines={song.lines} />
              <SongCredits song={song} />
              <SongKey estimate={keyEstimate} />
            </div>
            <div className="sticky right-0 bottom-4 flex justify-end">
              <SongControls />
            </div>
            <Suspense fallback={<Skeleton className="my-10 h-48 w-full" />}>
              <RelatedSongList
                className="my-10"
                artistName={song.artist.name}
                songId={songId}
              />
            </Suspense>
          </div>
        </div>
      </TransposeProvider>
    </VideoPlayerProvider>
  );
};

export default Page;
