import type { Song } from "@/features/song/actions";
import { cn } from "@/lib/utils";

export const ChordLines = ({
  lines,
}: {
  lines: NonNullable<Song["lines"]>;
}) => {
  return (
    <div className="flex flex-col gap-2">
      {lines.map((line, i) => {
        const lineHasLyric = line.some((part) => part.lyric);
        return (
          <div key={i} className="flex flex-wrap items-end gap-2">
            {line.map((part, j) => {
              return (
                <div key={j} className={cn("flex flex-col")}>
                  {!!part.chord && <div className="text-sm">{part.chord}</div>}
                  {lineHasLyric && (
                    <div className="h-6 text-nowrap bg-linear-to-b from-foreground/60 to-foreground/20 bg-clip-text text-transparent">
                      {part.lyric}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
