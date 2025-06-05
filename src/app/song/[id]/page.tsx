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
        <Link className="text-muted-foreground" href={song.artist.url}>
          {song.artist.name}
        </Link>
      </div>
      <div className="mt-6">
        <div className="flex flex-col gap-2">
          {song.lines.map((line, i) => {
            const lineHasLyric = line.some((part) => part.lyric);
            return (
              <div key={i} className="flex items-end gap-2">
                {line.map((part, j) => {
                  return (
                    <div key={j} className={cn("flex flex-col")}>
                      {!!part.chord && (
                        <div className="text-sm">{part.chord}</div>
                      )}
                      {lineHasLyric && (
                        <div className="opacity-40 h-6">{part.lyric}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
