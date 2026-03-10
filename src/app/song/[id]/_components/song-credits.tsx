import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Song } from "../../../../features/song/actions";

export const SongCredits = ({
  song,
  className,
  ...props
}: { song: Song } & React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "flex flex-col items-end gap-2 text-end text-sm",
        className,
      )}
      {...props}
    >
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <Link href={`/song/${song.id}`}>{song.title}</Link>
        <div className="flex items-center gap-2">
          <hr className="h-px w-4 bg-foreground/60" />
          <Link href={song.artist.url}>{song.artist.name}</Link>
        </div>
      </div>
      <div className="text-foreground/60">
        Written by{" "}
        <span className="text-foreground">{song.writerNames.join(", ")}</span>
      </div>
      <div className="text-foreground/60">
        Composed by{" "}
        <span className="text-foreground">{song.composerNames.join(", ")}</span>
      </div>
    </div>
  );
};
