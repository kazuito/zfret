"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { type KeyMode, prefersFlat } from "@/features/chords/key";

const MIN_SEMITONES = -11;
const MAX_SEMITONES = 11;

type TransposeContextValue = {
  semitones: number;
  preferFlat: boolean;
  setSemitones: (value: number) => void;
};

const transposeContext = createContext<TransposeContextValue>({
  semitones: 0,
  preferFlat: false,
  setSemitones: () => {},
});

export const TransposeProvider = ({
  baseKey,
  children,
}: {
  baseKey: { tonic: number; mode: KeyMode } | null;
  children: React.ReactNode;
}) => {
  const [semitones, setSemitonesState] = useState(0);

  const setSemitones = (value: number) =>
    setSemitonesState(Math.max(MIN_SEMITONES, Math.min(MAX_SEMITONES, value)));

  const preferFlat = useMemo(() => {
    if (!baseKey) return false;
    return prefersFlat(
      (((baseKey.tonic + semitones) % 12) + 12) % 12,
      baseKey.mode,
    );
  }, [baseKey, semitones]);

  return (
    <transposeContext.Provider value={{ semitones, preferFlat, setSemitones }}>
      {children}
    </transposeContext.Provider>
  );
};

export const useTranspose = () => useContext(transposeContext);
