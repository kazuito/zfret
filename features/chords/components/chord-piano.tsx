import { cn } from "@/lib/utils";
import type { ChordTone } from "../types";
import { toneFillClass } from "./tone-style";

const WHITE_PITCHES = [0, 2, 4, 5, 7, 9, 11];

const BLACK_KEYS = [
  { pitch: 1, boundary: 1 },
  { pitch: 3, boundary: 2 },
  { pitch: 6, boundary: 4 },
  { pitch: 8, boundary: 5 },
  { pitch: 10, boundary: 6 },
];

const BLACK_WIDTH = 9;

export const ChordPiano = ({ notes }: { notes: ChordTone[] }) => {
  const toneByPitch = new Map(notes.map((note) => [note.pitch, note]));

  return (
    <div className="relative h-20 w-full select-none font-bold">
      <div className="flex h-full w-full">
        {WHITE_PITCHES.map((pitch) => {
          const tone = toneByPitch.get(pitch);

          return (
            <div
              key={pitch}
              className={cn(
                "relative flex flex-1 items-end justify-center rounded-b-md border border-border bg-card pb-1 text-[10px] text-card-foreground",
                tone && toneFillClass(tone.role),
              )}
            >
              {tone?.name}
            </div>
          );
        })}
      </div>
      {BLACK_KEYS.map(({ pitch, boundary }) => {
        const tone = toneByPitch.get(pitch);

        return (
          <div
            key={pitch}
            className={cn(
              "absolute top-0 z-10 flex h-[62%] items-end justify-center rounded-b-md bg-neutral-800 pb-0.5 text-[8px] text-white",
              tone && toneFillClass(tone.role),
            )}
            style={{
              width: `${BLACK_WIDTH}%`,
              left: `calc(${(boundary / 7) * 100}% - ${BLACK_WIDTH / 2}%)`,
            }}
          >
            {tone?.name}
          </div>
        );
      })}
    </div>
  );
};
