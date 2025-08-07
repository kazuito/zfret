import AddHistory from "@/components/add-history";
import { List, ListItem } from "@/components/list";
import PageHeading from "@/components/page-heading";
import Player from "@/components/player";
import { fetchArtistSongs, fetchSong } from "@/lib/song";
import { cn } from "@/lib/utils";
import { MicVocalIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;
  const song = await fetchSong(id);
  return {
    title: `${decodeURIComponent(song.title)} - ${decodeURIComponent(
      song.artist.name
    )} | Z-FRET`,
  };
};

const Page = async ({ params }: Props) => {
  const { id } = await params;

  const song = await fetchSong(id);
  const artistSongs = await fetchArtistSongs(song.artist.name);

  const historyItem = {
    type: "song" as const,
    title: song.title,
    artistName: song.artist.name,
    link: `/song/${id}`,
    timestamp: Date.now(),
  };

  return (
    <div className="p-6 pt-0 max-w-3xl mx-auto">
      <AddHistory item={historyItem} />
      <PageHeading
        subtitle={<Link href={song.artist.url}>{song.artist.name}</Link>}
      >
        {song.title}
      </PageHeading>
      <div className="max-w-3xl mx-auto">
        {song.youtubeVideoId && <Player youtubeVideoId={song.youtubeVideoId} />}
        <div className="mt-10">
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
        <div className="my-10">
          <List
            prefix={<MicVocalIcon />}
            title={<Link href={song.artist.url}>{song.artist.name}</Link>}
          >
            {artistSongs.map((artistSong) => {
              return (
                <ListItem key={artistSong.id} href={artistSong.url}>
                  {artistSong.title}
                </ListItem>
              );
            })}
          </List>
        </div>
      </div>
    </div>
  );
};

export default Page;
