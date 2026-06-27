"use client";

import { Badge } from "@/components/ui/badge";
import { describeKey, type KeyEstimate } from "@/features/chords/key";
import { cn } from "@/lib/utils";
import { useTranspose } from "./transpose-provider";

const CONFIDENCE_LABEL: Record<KeyEstimate["confidence"], string> = {
  high: "High confidence",
  medium: "Medium confidence",
  low: "Low confidence",
};

const CONFIDENCE_DOTS: Record<KeyEstimate["confidence"], number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export const SongKey = ({ estimate }: { estimate: KeyEstimate | null }) => {
  const { semitones } = useTranspose();
  if (!estimate) return null;

  const tonic = (((estimate.tonic + semitones) % 12) + 12) % 12;
  const { name, scale, alternative } = describeKey(tonic, estimate.mode);

  return (
    <div className="my-8 flex flex-col items-center gap-2 border-border/60 border-t border-b py-10">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-baseline gap-2">
          <span className="font-medium text-2xl">{name}</span>
          {semitones !== 0 && (
            <span className="text-muted-foreground text-xl tabular-nums">
              {semitones > 0 ? `+${semitones}` : semitones}
            </span>
          )}
        </div>
      </div>
      <div className="text-lg">{scale.join(" ")}</div>
      {alternative && (
        <Badge className="mt-2" variant="outline">
          Also likely {alternative}
        </Badge>
      )}
    </div>
  );
};
