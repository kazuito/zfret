import AddHistory from "@/components/add-history";
import { List, ListItem } from "@/components/list";
import PageHeading from "@/components/page-heading";
import { fetchArtistSongs } from "@/lib/song";
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
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  const songs = await fetchArtistSongs(decodedName);

  const historyItem = {
    type: "artist" as const,
    name: decodedName,
    link: `/artist/${name}`,
    timestamp: Date.now(),
  };

  return (
    <div className="max-w-3xl mx-auto p-6 pt-0">
      <AddHistory item={historyItem} />
      <PageHeading>{decodedName}</PageHeading>
      <div>
        <List>
          {songs.map((song) => {
            return (
              <ListItem href={song.url} key={song.id}>
                {song.title}
              </ListItem>
            );
          })}
        </List>
      </div>
    </div>
  );
};

export default Page;
