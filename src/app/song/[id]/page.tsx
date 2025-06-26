import { Button } from "@/components/ui/button";
import { fetchArtistSongs, fetchSong } from "@/lib/song";
import { cn } from "@/lib/utils";
import { PlayIcon } from "lucide-react";
import Link from "next/link";

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
    <div className="p-6 pt-4 mx-auto max-w-3xl">
      <div className="sticky items-center gap-4 top-4 justify-between flex-row backdrop-blur-lg flex py-3 px-4 w-full h-fit rounded-md overflow-clip bg-primary/5 border">
        <div className="flex flex-col">
          <Link href={`/song/${song.id}`} className="font-bold text-shadow">
            {song.title}
          </Link>
          <Link className="text-muted-foreground" href={song.artist.url}>
            {song.artist.name}
          </Link>
        </div>
        {song.youtubeVideoId && (
          <div>
            <Button size="icon" variant="secondary">
              <PlayIcon />
            </Button>
          </div>
          // <div>
          //   <iframe
          //     className="rounded-md"
          //     src={`https://www.youtube.com/embed/${song.youtubeVideoId}`}
          //   />
          // </div>
        )}
      </div>
      <div className="mt-8">
        <div className="flex flex-col gap-2">
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
                        <div className="text-muted-foreground h-6 text-nowrap">
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
  );
};

export default Page;
