import type { Song } from "@/features/songs/queries";
import { ChordPopover } from "./chord-popover";

type ChordPart = NonNullable<Song["lines"]>[number][number];

const formatPartKey = (part: ChordPart) =>
  `${part.chord ?? ""}\u001f${part.lyric}`;

const getUniqueKey = (key: string, seen: Map<string, number>) => {
  const count = seen.get(key) ?? 0;
  seen.set(key, count + 1);

  return count === 0 ? key : `${key}\u001f${count}`;
};

export const ChordLines = ({
  lines,
}: {
  lines: NonNullable<Song["lines"]>;
}) => {
  const lineKeys = new Map<string, number>();

  return (
    <div className="flex flex-col gap-2">
      {lines.map((line) => {
        const lineHasLyric = line.some((part) => part.lyric);
        const lineKey = getUniqueKey(
          line.map(formatPartKey).join("\u001e"),
          lineKeys,
        );
        const partKeys = new Map<string, number>();

        return (
          <div key={lineKey} className="flex flex-wrap items-end gap-2">
            {line.map((part) => {
              const partKey = getUniqueKey(formatPartKey(part), partKeys);

              return (
                <div key={partKey} className="flex flex-col">
                  {!!part.chord && <ChordPopover chord={part.chord} />}
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
