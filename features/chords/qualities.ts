import type { Quality } from "./types";

const QUALITIES: Record<string, Quality> = {
  "": {
    name: "Major",
    description:
      "The most basic chord with a bright, stable sound. Built from a major third and a perfect fifth.",
    intervals: [0, 4, 7],
  },
  m: {
    name: "Minor",
    description:
      "A dark, settled-sounding chord built from a minor third and a perfect fifth.",
    intervals: [0, 3, 7],
  },
  dim: {
    name: "Diminished",
    description: "A tense, unstable chord built by stacking minor thirds.",
    intervals: [0, 3, 6],
  },
  aug: {
    name: "Augmented",
    description:
      "A floating, unsettled chord with an augmented fifth (the fifth raised a half step).",
    intervals: [0, 4, 8],
  },
  "5": {
    name: "Power Chord",
    description:
      "Just the root and perfect fifth, with no third. Common on distorted guitar.",
    intervals: [0, 7],
  },
  sus4: {
    name: "Suspended 4th",
    description:
      "Replaces the third with a perfect fourth for an unresolved, suspended sound.",
    intervals: [0, 5, 7],
  },
  sus2: {
    name: "Suspended 2nd",
    description:
      "Replaces the third with a major second for an open, airy sound.",
    intervals: [0, 2, 7],
  },
  "6": {
    name: "Sixth",
    description:
      "A major chord with an added major sixth for a soft, bright sound.",
    intervals: [0, 4, 7, 9],
  },
  m6: {
    name: "Minor Sixth",
    description: "A minor chord with an added major sixth.",
    intervals: [0, 3, 7, 9],
  },
  "7": {
    name: "Dominant 7th",
    description:
      "A major chord with an added minor seventh. Wants to resolve to the next chord.",
    intervals: [0, 4, 7, 10],
  },
  M7: {
    name: "Major 7th",
    description:
      "A major chord with an added major seventh for a smooth, sophisticated sound.",
    intervals: [0, 4, 7, 11],
  },
  m7: {
    name: "Minor 7th",
    description:
      "A minor chord with an added minor seventh for a mellow sound.",
    intervals: [0, 3, 7, 10],
  },
  mM7: {
    name: "Minor Major 7th",
    description:
      "A minor chord with an added major seventh for a tense, distinctive sound.",
    intervals: [0, 3, 7, 11],
  },
  dim7: {
    name: "Diminished 7th",
    description:
      "Minor thirds stacked evenly. Highly tense and often used as a passing chord.",
    intervals: [0, 3, 6, 9],
  },
  "m7-5": {
    name: "Minor 7 Flat 5",
    description:
      "Also called half-diminished. A minor seventh with the fifth lowered a half step.",
    intervals: [0, 3, 6, 10],
  },
  "7-5": {
    name: "7 Flat 5",
    description: "A dominant seventh with the fifth lowered a half step.",
    intervals: [0, 4, 6, 10],
  },
  "7+5": {
    name: "Augmented 7th",
    description: "A dominant seventh with the fifth raised a half step.",
    intervals: [0, 4, 8, 10],
  },
  "7sus4": {
    name: "7 Suspended 4th",
    description:
      "A dominant seventh with the third replaced by a perfect fourth.",
    intervals: [0, 5, 7, 10],
  },
  add9: {
    name: "Add 9",
    description:
      "A major chord with an added ninth for a wider sound. Does not include the seventh.",
    intervals: [0, 4, 7, 2],
  },
  madd9: {
    name: "Minor Add 9",
    description: "A minor chord with an added ninth.",
    intervals: [0, 3, 7, 2],
  },
  "9": {
    name: "Ninth",
    description: "A dominant seventh extended with a ninth.",
    intervals: [0, 4, 7, 10, 2],
  },
  M9: {
    name: "Major 9th",
    description: "A major seventh extended with a ninth for a lush sound.",
    intervals: [0, 4, 7, 11, 2],
  },
  m9: {
    name: "Minor 9th",
    description: "A minor seventh extended with a ninth.",
    intervals: [0, 3, 7, 10, 2],
  },
  "7-9": {
    name: "7 Flat 9",
    description:
      "A dominant seventh with an added flat ninth for strong tension.",
    intervals: [0, 4, 7, 10, 1],
  },
  "7+9": {
    name: "7 Sharp 9",
    description:
      "A dominant seventh with an added sharp ninth, common in rock.",
    intervals: [0, 4, 7, 10, 3],
  },
  "69": {
    name: "Six Nine",
    description:
      "A major chord with an added sixth and ninth for a bright, open sound.",
    intervals: [0, 4, 7, 9, 2],
  },
  "11": {
    name: "Eleventh",
    description: "A dominant chord extended up through the eleventh.",
    intervals: [0, 4, 7, 10, 2, 5],
  },
  m11: {
    name: "Minor 11th",
    description: "A minor seventh extended up through the eleventh.",
    intervals: [0, 3, 7, 10, 2, 5],
  },
  "13": {
    name: "Thirteenth",
    description:
      "A dominant chord extended up through the thirteenth for a rich sound.",
    intervals: [0, 4, 7, 10, 2, 9],
  },
};

const normalizeQuality = (quality: string) =>
  quality
    .replace(/♭/g, "b")
    .replace(/♯/g, "#")
    .replace(/maj|Maj|MAJ/g, "M")
    .replace(/b5/g, "-5")
    .replace(/#5/g, "+5")
    .replace(/b9/g, "-9")
    .replace(/#9/g, "+9");

export const resolveQuality = (quality: string): Quality => {
  const normalized = normalizeQuality(quality);
  const known = QUALITIES[normalized];
  if (known) return known;

  const isMinor = normalized.startsWith("m") && !normalized.startsWith("M");

  return {
    name: quality,
    description:
      "This chord is not fully recognized, so only an approximate set of notes is shown.",
    intervals: isMinor ? [0, 3, 7] : [0, 4, 7],
  };
};
