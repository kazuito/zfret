import { fetchTopSongs } from "@/lib/song";
import Link from "next/link";

export default async function Home() {
  const topSongs = await fetchTopSongs();

  return (
    <div className="p-6">
      <div className="flex flex-col">
        {topSongs.map((song, i) => {
          return (
            <Link
              className="flex rounded-sm hover:bg-dimmed items-center gap-3 p-2"
              href={song.url}
              key={i}
            >
              <div className="font-semibold w-6 text-end">{i + 1}</div>
              <div>{song.title}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
