import List from "@/components/list";
import ListItem from "@/components/list-item";
import Player from "@/components/player";
import { fetchArtistSongs, fetchSong } from "@/lib/song";
import { cn } from "@/lib/utils";
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
    <div className="">
      <div className="items-center gap-4 justify-between flex-row bg-gradient-to-b from-background to-transparent flex my-6 w-full h-fit overflow-clip z-10">
        <div className="mx-auto w-full px-6 max-w-3xl flex flex-col">
          <Link
            href={`/song/${song.id}`}
            className="font-bold text-shadow text-xl"
          >
            {song.title}
          </Link>
          <Link
            className="text-shadow-md text-muted-foreground"
            href={song.artist.url}
          >
            {song.artist.name}
          </Link>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4">
        {song.youtubeVideoId && (
          <div className="sm:px-2">
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
          <div className="text-muted-foreground"></div>
          <List
            heading={<Link href={song.artist.url}>{song.artist.name}</Link>}
          >
            {artistSongs.map((artistSong) => {
              return (
                <ListItem
                  key={artistSong.id}
                  href={artistSong.url}
                  title={artistSong.title}
                ></ListItem>
              );
            })}
          </List>
        </div>
      </div>
    </div>
  );
};

export default Page;
