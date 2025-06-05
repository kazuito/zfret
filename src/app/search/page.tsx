import { fetchSearchResults } from "@/lib/song";
import { MicVocalIcon, Music2Icon, SearchIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  searchParams: Promise<{
    q: string;
  }>;
};

const Page = async ({ searchParams }: Props) => {
  const { q } = await searchParams;
  const { songs, artists } = await fetchSearchResults(q);

  return (
    <div className="p-6">
      <div className="flex items-center gap-2">
        <SearchIcon size={22} />
        <div className="text-xl font-bold">"{q}"</div>
      </div>
      {songs.length === 0 && (
        <div className="flex justify-center pt-24">
          <div className="text-muted-foreground">
            No results found for <span className="font-bold">{q}</span>
          </div>
        </div>
      )}
      <div className="mt-6">
        <div className="flex flex-wrap gap-2">
          {artists.map((artist) => {
            return (
              <Link
                href={artist.url}
                className="rounded-full flex gap-1.5 items-center py-1.5 px-3 text-sm bg-secondary border"
                key={artist.name}
              >
                <MicVocalIcon size={14} />
                {artist.name}
              </Link>
            );
          })}
        </div>
        <div className="mt-6">
          {songs.map((song) => {
            return (
              <Link
                key={song.id}
                href={song.url}
                className="flex items-center p-2 hover:bg-dimmed rounded-sm"
              >
                <Music2Icon size={16} className="shrink-0" />
                <div className="ml-2 truncate">{song.title}</div>
                <div className="text-muted-foreground shrink-0 ml-4 text-sm">
                  {song.artist.name}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
