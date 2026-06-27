"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { analyzeChord } from "@/features/chords/analyze";

export const ChordPopover = ({ chord }: { chord: string }) => {
  const [open, setOpen] = useState(false);
  const info = open ? analyzeChord(chord) : null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="-mx-1 w-fit cursor-pointer rounded-md px-1 text-sm outline-hidden transition-colors hover:bg-muted focus-visible:bg-muted data-[state=open]:bg-muted">
        {chord}
      </PopoverTrigger>
      {info && (
        <PopoverContent align="start">
          <div className="flex flex-col gap-3">
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-lg leading-none">
                {chord}
              </span>
              <span className="text-muted-foreground text-sm">{info.name}</span>
            </div>
            <p className="text-foreground/80 text-sm leading-relaxed">
              {info.description}
            </p>
            {info.notes.length > 0 && (
              <div className="flex flex-col gap-1.5">
                <span className="text-muted-foreground text-xs">Notes</span>
                <div className="flex flex-wrap gap-1">
                  {info.notes.map((note) => (
                    <Badge key={note} variant="secondary">
                      {note}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
};
