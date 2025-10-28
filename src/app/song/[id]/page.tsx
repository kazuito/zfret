import AddHistory from "@/components/add-history";
import { ClientOnly } from "@/components/client-only";
import FavButton from "@/components/fav-button";
import { List } from "@/components/list";
import PageHeading from "@/components/page-heading";
import Player from "@/components/player";
import { fetchRelatedSongs, fetchSong } from "@/lib/song";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-static";
export const revalidate = 2592000; // 30 days

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
  const artistSongs = await fetchRelatedSongs(song.id, song.artist.name, {
    limit: 10,
  });

  const historyItem = {
    type: "song" as const,
    title: song.title,
    artistName: song.artist.name,
    link: `/song/${id}`,
    timestamp: Date.now(),
  };

  const favItem = {
    type: "song" as const,
    title: song.title,
    artistName: song.artist.name,
    link: `/song/${id}`,
    timestamp: Date.now(),
  };

  return (
    <div className="p-6 pt-0 max-w-3xl mx-auto">
      <ClientOnly>
        <AddHistory item={historyItem} />
      </ClientOnly>
      <PageHeading
        subtitle={<Link href={song.artist.url}>{song.artist.name}</Link>}
        endContent={
          <ClientOnly>
            <FavButton item={favItem} />
          </ClientOnly>
        }
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
          <div className="flex flex-col gap-2 items-end mt-10 text-sm text-end">
            <div className="flex items-center gap-2 shrink-0 flex-wrap">
              <Link href={`/song/${id}`}>{song.title}</Link>
              <div className="flex items-center gap-2">
                <hr className="h-px w-4 bg-foreground/60" />
                <Link href={song.artist.url}>{song.artist.name}</Link>
              </div>
            </div>
            <div className="text-foreground/60">
              Written by{" "}
              <span className="text-foreground">
                {song.writerNames.join(", ")}
              </span>
            </div>
            <div className="text-foreground/60">
              Composed by{" "}
              <span className="text-foreground">
                {song.composerNames.join(", ")}
              </span>
            </div>
          </div>
        </div>
        <div className="my-10">
          <List.Wrapper>
            <List.Header asChild>
              <Link href={`/artist/${song.artist.name}`} className="w-fit">
                {song.artist.name}
              </Link>
            </List.Header>
            <List.Content>
              {artistSongs.map((artistSong) => {
                return (
                  <List.Item key={artistSong.id} href={artistSong.url}>
                    {artistSong.title}
                  </List.Item>
                );
              })}
            </List.Content>
            <List.Footer>
              <List.FooterLink href={`/artist/${song.artist.name}`}>
                View more songs by {song.artist.name}
                <ArrowRightIcon />
              </List.FooterLink>
            </List.Footer>
          </List.Wrapper>
        </div>
      </div>
    </div>
  );
};

export default Page;
