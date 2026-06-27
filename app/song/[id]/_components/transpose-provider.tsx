"use client";

import { useQueryState } from "nuqs";
import { createContext, use, useMemo } from "react";
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
  const [semitones, setSemitonesState] = useQueryState("transpose", {
    defaultValue: 0,
    parse: (value) => parseInt(value, 10),
  });

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

export const useTranspose = () => {
  const context = use(transposeContext);
  if (!context) {
    throw Error("useTranspose must be used within a TransposeProvider");
  }
  return context;
};
