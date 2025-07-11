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
      <div className="flex flex-col mt-6">
        {songs.map((song) => {
          return (
            <Link
              href={song.url}
              key={song.id}
              className="p-2 flex gap-2 items-center hover:bg-dimmed rounded-sm"
            >
              {song.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
