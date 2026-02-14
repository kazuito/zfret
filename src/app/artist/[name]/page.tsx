"use cache";

import { User03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import AddHistory from "@/components/add-history";
import { ClientOnly } from "@/components/client-only";
import PageHeading from "@/components/page-heading";
import { List } from "@/components/ui/list";
import { fetchArtistSongs } from "@/lib/song";

type Props = {
  params: Promise<{
    name: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { name } = await params;
  return {
    title: `${decodeURIComponent(name)} | Z-FRET`,
  };
};

const Page = async ({ params }: Props) => {
  cacheLife("weeks");

  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  const songs = await fetchArtistSongs(decodedName);

  const historyItem = {
    type: "artist" as const,
    name: decodedName,
    link: `/artist/${name}`,
  };

  return (
    <div className="mx-auto max-w-3xl p-6 pt-0">
      <ClientOnly>
        <AddHistory item={historyItem} />
      </ClientOnly>
      <PageHeading
        startContent={
          <div className="mr-3 grid size-8 place-content-center rounded-full bg-secondary text-muted-foreground sm:mr-4 sm:size-10 dark:bg-secondary/50">
            <HugeiconsIcon
              className="size-5 sm:size-6"
              icon={User03Icon}
              fill="currentColor"
            />
          </div>
        }
      >
        {decodedName}
      </PageHeading>
      <div>
        <List.Root>
          <List.Content>
            {songs.map((song) => {
              return (
                <List.Item href={song.url} key={song.id}>
                  {song.title}
                </List.Item>
              );
            })}
          </List.Content>
        </List.Root>
      </div>
    </div>
  );
};

export default Page;
