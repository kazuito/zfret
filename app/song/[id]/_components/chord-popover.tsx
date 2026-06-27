"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { analyzeChord } from "@/features/chords/analyze";
import { ChordDiagram } from "@/features/chords/components/chord-diagram";
import { transposeChord } from "@/features/chords/transpose";
import { useTranspose } from "./transpose-provider";

export const ChordPopover = ({ chord }: { chord: string }) => {
  const [open, setOpen] = useState(false);
  const { semitones, preferFlat } = useTranspose();
  const display = transposeChord(chord, semitones, preferFlat);
  const info = open ? analyzeChord(display) : null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="-mx-1 w-fit cursor-pointer rounded-md px-1 text-sm outline-hidden transition-colors hover:bg-muted focus-visible:bg-muted data-[state=open]:bg-muted">
        {display}
      </PopoverTrigger>
      {info && (
        <PopoverContent align="start" className="w-72">
          <div className="flex flex-col gap-3">
            <div className="space-y-1">
              <div className="font-semibold text-lg leading-none">
                {display}
              </div>
              <div className="text-muted-foreground text-sm">{info.name}</div>
            </div>
            <p className="text-foreground/80 text-sm leading-relaxed">
              {info.description}
            </p>
            {info.notes.length > 0 && (
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-1">
                  {info.notes.map((note) => (
                    <Badge key={note.pitch} variant="secondary">
                      {note.name}
                    </Badge>
                  ))}
                </div>
                <ChordDiagram notes={info.notes} />
              </div>
            )}
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
};
