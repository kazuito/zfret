import AddHistory from "@/components/add-history";
import { List, ListItem } from "@/components/list";
import PageHeading from "@/components/page-heading";
import { fetchArtistSongs } from "@/lib/song";
import Link from "next/link";

type Props = {
  params: Promise<{
    name: string;
  }>;
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
      <PageHeading>
        <Link
          href={`/artist/${name}`}
          className="w-fit flex items-center gap-2"
        >
          <div className="text-xl font-bold">{decodedName}</div>
        </Link>
      </PageHeading>
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
