import { ArrowRight01Icon, Vynil02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Metadata } from "next";
import Link from "next/link";
import AddHistory from "@/components/add-history";
import { ClientOnly } from "@/components/client-only";
import FavButton from "@/components/fav-button";
import PageHeading from "@/components/page-heading";
import Player from "@/components/player";
import { List } from "@/components/ui/list";
import { getRelatedSongs, getSong } from "@/lib/song/actions";
import { cn } from "@/lib/utils";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateStaticParams() {
  return [{ id: "44369" }];
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;
  const song = await getSong(id);
  return {
    title: `${decodeURIComponent(song.title)} - ${decodeURIComponent(
      song.artist.name,
    )} | Z-FRET`,
  };
};

const Page = async ({ params }: Props) => {
  const { id } = await params;

  const song = await getSong(id);
  const artistSongs = await getRelatedSongs({
    artistName: song.artist.name,
    songId: id,
    limit: 10,
  });

  const historyItem = {
    type: "song" as const,
    title: song.title,
    artistName: song.artist.name,
    link: `/song/${id}`,
  };

  const favItem = {
    type: "song" as const,
    title: song.title,
    artistName: song.artist.name,
    link: `/song/${id}`,
  };

  return (
    <div className="mx-auto max-w-3xl p-6 pt-0">
      <ClientOnly>
        <AddHistory item={historyItem} />
      </ClientOnly>
      <PageHeading
        subtitle={<Link href={song.artist.url}>{song.artist.name}</Link>}
        startContent={
          <div className="mr-4 grid size-13 place-content-center rounded-lg bg-secondary sm:size-15 dark:bg-secondary/50">
            <HugeiconsIcon
              icon={Vynil02Icon}
              className="size-7 text-muted-foreground sm:size-8"
              strokeWidth={2}
            />
          </div>
        }
        endContent={
          <ClientOnly>
            <FavButton item={favItem} />
          </ClientOnly>
        }
      >
        {song.title}
      </PageHeading>
      <div className="mx-auto max-w-3xl">
        {song.youtubeVideoId && <Player youtubeVideoId={song.youtubeVideoId} />}
        <div className="mt-10">
          <div className="flex flex-col gap-2">
            {song.lines.map((line, i) => {
              const lineHasLyric = line.some((part) => part.lyric);
              return (
                <div key={i} className="flex flex-wrap items-end gap-2">
                  {line.map((part, j) => {
                    return (
                      <div key={j} className={cn("flex flex-col")}>
                        {!!part.chord && (
                          <div className="text-sm">{part.chord}</div>
                        )}
                        {lineHasLyric && (
                          <div className="h-6 text-nowrap bg-linear-to-b from-foreground/60 to-foreground/20 bg-clip-text text-transparent">
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
          <div className="mt-10 flex flex-col items-end gap-2 text-end text-sm">
            <div className="flex shrink-0 flex-wrap items-center gap-2">
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
          <List.Root>
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
                {song.artist.name}
                <HugeiconsIcon icon={ArrowRight01Icon} size={20} />
              </List.FooterLink>
            </List.Footer>
          </List.Root>
        </div>
      </div>
    </div>
  );
};

export default Page;
