"use cache";

import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import AddHistory from "../../../components/add-history";
import { ClientOnly } from "../../../components/client-only";
import { ArtistHeading } from "./_components/artist-heading";
import { ArtistSongList } from "./_components/artist-song-list";

type Props = {
  params: Promise<{
    name: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  cacheLife("weeks");

  const { name } = await params;
  return {
    title: `${decodeURIComponent(name)} | Z-FRET`,
  };
};

const Page = async ({ params }: Props) => {
  cacheLife("weeks");

  const { name } = await params;
  const decodedName = decodeURIComponent(name);

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
      <ArtistHeading artistName={decodedName} />
      <ArtistSongList artistName={decodedName} />
    </div>
  );
};

export default Page;
