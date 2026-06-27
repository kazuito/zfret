"use client";

import { MinusSignIcon, PlusSignIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { useTranspose } from "./transpose-provider";

const formatOffset = (semitones: number) => {
  if (semitones === 0) return "±0";
  return semitones > 0 ? `+${semitones}` : `${semitones}`;
};

export const TransposeControl = () => {
  const { semitones, setSemitones } = useTranspose();

  return (
    <div className="flex items-center gap-1 rounded-full border border-border/60 bg-background/40 p-1.5 backdrop-blur-sm">
      <Button
        variant="ghost"
        size="icon-sm"
        className="active:scale-90"
        onClick={() => setSemitones(semitones - 1)}
        disabled={semitones <= -11}
        aria-label="Transpose down a semitone"
      >
        <Icon icon={MinusSignIcon} className="size-4" />
      </Button>
      <button
        type="button"
        onClick={() => setSemitones(0)}
        className="min-w-12 text-center text-sm tabular-nums tracking-tight"
        title="Reset to original key"
      >
        {formatOffset(semitones)}
      </button>
      <Button
        variant="ghost"
        size="icon-sm"
        className="active:scale-90"
        onClick={() => setSemitones(semitones + 1)}
        disabled={semitones >= 11}
        aria-label="Transpose up a semitone"
      >
        <Icon icon={PlusSignIcon} className="size-4" />
      </Button>
    </div>
  );
};
