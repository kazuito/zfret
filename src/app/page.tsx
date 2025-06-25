import { fetchTopArtists, fetchTopSongs } from "@/lib/song";
import { TrophyIcon } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const topSongs = await fetchTopSongs();
  const topArtists = await fetchTopArtists();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div>
        <div className="flex items-center gap-2 justify-center">
          <TrophyIcon size={22} />
          <div className="text-xl font-bold">Top Songs</div>
        </div>
        <div className="flex flex-col mt-4">
          {topSongs.map((song, i) => {
            return (
              <Link
                className="flex rounded-sm hover:bg-dimmed items-center gap-3 p-2"
                href={song.url}
                key={i}
              >
                <div className="w-6 text-end">{i + 1}</div>
                <div className="font-semibold">{song.title}</div>
                <div className="text-sm text-muted-foreground">
                  {song.artistName}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-center gap-2 justify-center">
          <TrophyIcon size={22} />
          <div className="text-xl font-bold">Top Artists</div>
        </div>
        <div className="flex flex-col mt-4">
          {topArtists.map((artist, i) => {
            return (
              <Link
                className="flex rounded-sm hover:bg-dimmed items-center gap-3 p-2"
                href={artist.url}
                key={i}
              >
                <div className="w-6 text-end">{i + 1}</div>
                <div className="font-semibold">{artist.name}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
