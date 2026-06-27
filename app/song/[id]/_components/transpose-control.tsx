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
    <div className="flex w-fit items-center">
      <Button
        variant="ghost"
        size="icon"
        className="active:scale-90"
        onClick={() => setSemitones(semitones - 1)}
        disabled={semitones <= -11}
        aria-label="Transpose down a semitone"
      >
        <Icon icon={MinusSignIcon} />
      </Button>
      <Button
        variant="ghost"
        type="button"
        onClick={() => setSemitones(0)}
        className="min-w-12 text-center text-base tabular-nums tracking-tight"
        title="Reset to original key"
      >
        {formatOffset(semitones)}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="active:scale-90"
        onClick={() => setSemitones(semitones + 1)}
        disabled={semitones >= 11}
        aria-label="Transpose up a semitone"
      >
        <Icon icon={PlusSignIcon} />
      </Button>
    </div>
  );
};
