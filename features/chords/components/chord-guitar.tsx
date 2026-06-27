import { cn } from "@/lib/utils";
import type { ChordTone } from "../types";
import { toneFillClass } from "./tone-style";

const STRINGS = [
  { label: "e", pitch: 4 },
  { label: "B", pitch: 11 },
  { label: "G", pitch: 7 },
  { label: "D", pitch: 2 },
  { label: "A", pitch: 9 },
  { label: "E", pitch: 4 },
];

const FRETS = [0, 1, 2, 3, 4];

const GRID_COLUMNS = "1rem repeat(5, 1fr)";

export const ChordGuitar = ({ notes }: { notes: ChordTone[] }) => {
  const toneByPitch = new Map(notes.map((note) => [note.pitch, note]));

  return (
    <div className="w-full select-none">
      {STRINGS.map((string) => (
        <div
          key={string.label}
          className="grid items-stretch"
          style={{ gridTemplateColumns: GRID_COLUMNS }}
        >
          <span className="flex items-center justify-center text-[10px] text-muted-foreground">
            {string.label}
          </span>
          {FRETS.map((fret) => {
            const tone = toneByPitch.get((string.pitch + fret) % 12);

            return (
              <div
                key={fret}
                className={cn(
                  "relative h-7",
                  fret > 0 && "border-border border-l",
                  fret === 1 && "border-foreground border-l-2",
                )}
              >
                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border" />
                {tone && (
                  <span
                    className={cn(
                      "absolute top-1/2 left-1/2 z-10 flex size-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[8px] leading-none",
                      toneFillClass(tone.role),
                    )}
                  >
                    {tone.name}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ))}
      <div className="grid" style={{ gridTemplateColumns: GRID_COLUMNS }}>
        <span />
        {FRETS.map((fret) => (
          <span
            key={fret}
            className="text-center text-[9px] text-muted-foreground"
          >
            {fret === 0 ? "" : fret}
          </span>
        ))}
      </div>
    </div>
  );
};
