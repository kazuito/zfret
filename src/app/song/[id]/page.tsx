import { fetchSong } from "@/lib/song";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: Props) => {
  const { id } = params;

  const song = await fetchSong(id);

  return (
    <div className="p-6">
      <div>
        <div className="text-xl font-bold">{song.title}</div>
        <Link href={song.artist.url}>{song.artist.name}</Link>
      </div>
      <div className="mt-6">
        <div className="flex flex-col gap-2">
          {song.lines.map((line, i) => (
            <div key={i} className="flex items-end">
              {line.map((part, j) => {
                const hasChord = !!part.chord;
                return (
                  <div
                    key={j}
                    className={cn("flex flex-col", hasChord && "ml-1.5")}
                  >
                    {hasChord && <div className="-ml-1">{part.chord}</div>}
                    <div className="opacity-60">{part.lyric}</div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
