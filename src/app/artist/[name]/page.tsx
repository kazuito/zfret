import { List, ListItem } from "@/components/list";
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

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link href={`/artist/${name}`} className="w-fit flex items-center gap-2">
        <div className="text-xl font-bold">{decodedName}</div>
      </Link>
      <div className="mt-6">
        <List>
          {songs.map((song) => {
            return (
              <ListItem
                href={song.url}
                key={song.id}
                title={song.title}
              ></ListItem>
            );
          })}
        </List>
      </div>
    </div>
  );
};

export default Page;
