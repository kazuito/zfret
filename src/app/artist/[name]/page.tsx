import AddHistory from "@/components/add-history";
import { ClientOnly } from "@/components/client-only";
import { List } from "@/components/list";
import PageHeading from "@/components/page-heading";
import { fetchArtistSongs } from "@/lib/song";
import { cacheLife } from "next/cache";
import { Metadata } from "next";

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
  "use cache";
  cacheLife("days");

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
      <PageHeading>{decodedName}</PageHeading>
      <div>
        <List.Wrapper>
          <List.Content>
            {songs.map((song) => {
              return (
                <List.Item href={song.url} key={song.id}>
                  {song.title}
                </List.Item>
              );
            })}
          </List.Content>
        </List.Wrapper>
      </div>
    </div>
  );
};

export default Page;
