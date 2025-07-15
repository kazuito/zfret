import Player from "@/components/player";
import { fetchArtistSongs, fetchSong } from "@/lib/song";
import { cn } from "@/lib/utils";
import {
  MediaControlBar,
  MediaController,
  MediaMuteButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaTimeDisplay,
  MediaTimeRange,
  MediaVolumeRange,
} from "media-chrome/react";
import Link from "next/link";
import ReactPlayer from "react-player";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;

  const song = await fetchSong(id);
  const artistSongs = await fetchArtistSongs(song.artist.name);

  return (
    <div className="">
      <div className="sticky items-center gap-4 top-[49px] justify-between flex-row bg-gradient-to-b from-background to-transparent flex py-3 w-full h-fit overflow-clip z-10">
        <div className="mx-auto w-full px-6 max-w-3xl flex flex-col">
          <Link href={`/song/${song.id}`} className="font-bold text-shadow">
            {song.title}
          </Link>
          <Link className="text-shadow-md text-muted-foreground" href={song.artist.url}>
            {song.artist.name}
          </Link>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4">
        {song.youtubeVideoId && (
          <div className="flex justify-end sm:px-6">
            <Player youtubeVideoId={song.youtubeVideoId} />
          </div>
        )}
        <div className="mt-8">
          <div className="flex flex-col gap-2 px-2 sm:px-6">
            {song.lines.map((line, i) => {
              const lineHasLyric = line.some((part) => part.lyric);
              return (
                <div key={i} className="flex items-end gap-2 flex-wrap">
                  {line.map((part, j) => {
                    return (
                      <div key={j} className={cn("flex flex-col")}>
                        {!!part.chord && (
                          <div className="text-sm">{part.chord}</div>
                        )}
                        {lineHasLyric && (
                          <div className="bg-gradient-to-b from-foreground/60 to-foreground/20 text-transparent bg-clip-text h-6 text-nowrap">
                            {part.lyric}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-8">
          <div className="text-muted-foreground">
            Songs by{" "}
            <Link
              className="text-foreground font-semibold"
              href={song.artist.url}
            >
              {song.artist.name}
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {artistSongs.map((artistSong) => {
              return (
                <Link
                  href={artistSong.url}
                  key={artistSong.id}
                  className="py-1.5 px-3 rounded-full border text-sm"
                >
                  {artistSong.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
