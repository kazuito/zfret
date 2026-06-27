import type { ParsedNote } from "./types";

export const SHARP_NAMES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

export const FLAT_NAMES = [
  "C",
  "D♭",
  "D",
  "E♭",
  "E",
  "F",
  "G♭",
  "G",
  "A♭",
  "A",
  "B♭",
  "B",
];

const ROOT_PITCH: Record<string, number> = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
};

export const parseNote = (raw: string): ParsedNote | null => {
  const match = raw.match(/^([A-G])(#|♯|b|♭)?/);
  if (!match) return null;

  const base = ROOT_PITCH[match[1]];
  const accidental = match[2];
  const flat = accidental === "b" || accidental === "♭";
  const sharp = accidental === "#" || accidental === "♯";
  const pitch = (base + (sharp ? 1 : 0) + (flat ? 11 : 0)) % 12;
  const display = flat ? FLAT_NAMES[pitch] : SHARP_NAMES[pitch];

  return { pitch, display, flat };
};
