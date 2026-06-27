import type { Quality } from "./types";

const QUALITIES: Record<string, Quality> = {
  "": {
    name: "Major",
    description:
      "A major third stacked under a perfect fifth. The most consonant triad and the tonic of a major key, so it sounds bright and fully at rest.",
    intervals: [0, 4, 7],
  },
  m: {
    name: "Minor",
    description:
      "A minor third under a perfect fifth. Just as stable as the major triad but darker, and the tonic of a minor key.",
    intervals: [0, 3, 7],
  },
  dim: {
    name: "Diminished",
    description:
      "Two minor thirds stacked, spanning a tritone from root to flat fifth. That tritone makes it tense and eager to resolve; it sits naturally on the leading tone.",
    intervals: [0, 3, 6],
  },
  aug: {
    name: "Augmented",
    description:
      "Two major thirds stacked, dividing the octave evenly. With no perfect fifth it has no clear gravity and can slide into several keys.",
    intervals: [0, 4, 8],
  },
  "5": {
    name: "Power Chord",
    description:
      "Root and perfect fifth only. Having no third leaves it neither major nor minor, which keeps it clean under heavy distortion.",
    intervals: [0, 7],
  },
  sus4: {
    name: "Suspended 4th",
    description:
      "The third is pushed up to a perfect fourth, removing the major/minor color and creating tension that wants to fall back to the third.",
    intervals: [0, 5, 7],
  },
  sus2: {
    name: "Suspended 2nd",
    description:
      "The third drops to a major second for an open, neutral sound. It is the same shape as a sus4 built a fifth away.",
    intervals: [0, 2, 7],
  },
  "6": {
    name: "Sixth",
    description:
      "A major triad with an added major sixth. Softer and less final than a major seventh; it shares all its notes with the relative minor seventh.",
    intervals: [0, 4, 7, 9],
  },
  m6: {
    name: "Minor Sixth",
    description:
      "A minor triad with an added major sixth. The bright sixth over the minor third gives a bittersweet, Dorian color.",
    intervals: [0, 3, 7, 9],
  },
  "7": {
    name: "Dominant 7th",
    description:
      "A major triad plus a minor seventh. The tritone between its third and seventh drives the pull to resolve a fourth up — the engine of most cadences.",
    intervals: [0, 4, 7, 10],
  },
  M7: {
    name: "Major 7th",
    description:
      "A major triad plus a major seventh, a half step below the root. That gentle rub gives a lush, calm color typical of a tonic chord.",
    intervals: [0, 4, 7, 11],
  },
  m7: {
    name: "Minor 7th",
    description:
      "A minor triad plus a minor seventh. Mellow and stable, it is the workhorse ii and vi chord in jazz, soul, and funk.",
    intervals: [0, 3, 7, 10],
  },
  mM7: {
    name: "Minor Major 7th",
    description:
      "A minor triad with a major seventh. The half-step clash between the seventh and root makes it tense and noirish.",
    intervals: [0, 3, 7, 11],
  },
  dim7: {
    name: "Diminished 7th",
    description:
      "Three minor thirds stacked, splitting the octave evenly. Fully symmetrical and tense, it can resolve in any direction and often links two chords.",
    intervals: [0, 3, 6, 9],
  },
  "m7-5": {
    name: "Minor 7 Flat 5",
    description:
      "Also called half-diminished: a diminished triad with a minor seventh. Softer than a diminished seventh, it is the standard ii chord in a minor key.",
    intervals: [0, 3, 6, 10],
  },
  "7-5": {
    name: "7 Flat 5",
    description:
      "A dominant seventh with a lowered fifth. It contains two tritones, giving a blurry whole-tone tension used as an altered dominant.",
    intervals: [0, 4, 6, 10],
  },
  "7+5": {
    name: "Augmented 7th",
    description:
      "A dominant seventh with a raised fifth (a sharp fifth, or flat thirteenth). The wider top sharpens the chord's pull to resolve.",
    intervals: [0, 4, 8, 10],
  },
  "7sus4": {
    name: "7 Suspended 4th",
    description:
      "A dominant seventh with the third suspended to a perfect fourth. It keeps the dominant drive but softens it, often resolving to a plain dominant seventh.",
    intervals: [0, 5, 7, 10],
  },
  add9: {
    name: "Add 9",
    description:
      "A major triad with a ninth added on top but no seventh. The ninth widens the sound while keeping it bright and open.",
    intervals: [0, 4, 7, 2],
  },
  madd9: {
    name: "Minor Add 9",
    description:
      "A minor triad with an added ninth and no seventh. The ninth a whole step above the root adds shimmer and a hint of tension.",
    intervals: [0, 3, 7, 2],
  },
  "9": {
    name: "Ninth",
    description:
      "A dominant seventh extended with a ninth. Fuller and funkier than a plain seventh while keeping the same dominant function.",
    intervals: [0, 4, 7, 10, 2],
  },
  M9: {
    name: "Major 9th",
    description:
      "A major seventh extended with a ninth. Lush and open, a favorite tonic color in jazz and R&B.",
    intervals: [0, 4, 7, 11, 2],
  },
  m9: {
    name: "Minor 9th",
    description:
      "A minor seventh extended with a ninth. Smooth and warm — a richer take on the m7 for ii and vi chords.",
    intervals: [0, 3, 7, 10, 2],
  },
  "7-9": {
    name: "7 Flat 9",
    description:
      "A dominant seventh with a flat ninth. The flat ninth adds biting tension and resolves especially well to a minor chord.",
    intervals: [0, 4, 7, 10, 1],
  },
  "7+9": {
    name: "7 Sharp 9",
    description:
      "A dominant seventh with a sharp ninth, the 'Hendrix chord.' The sharp ninth doubles as a minor third over the major chord for a bluesy, gritty clash.",
    intervals: [0, 4, 7, 10, 3],
  },
  "69": {
    name: "Six Nine",
    description:
      "A major triad with both a sixth and a ninth and no seventh. Bright and stable yet open-ended, a popular final chord.",
    intervals: [0, 4, 7, 9, 2],
  },
  "11": {
    name: "Eleventh",
    description:
      "A dominant chord stacked up through the eleventh. The third is usually dropped because it clashes with the eleventh, leaving a suspended, airy sound.",
    intervals: [0, 4, 7, 10, 2, 5],
  },
  m11: {
    name: "Minor 11th",
    description:
      "A minor seventh extended through the ninth and eleventh. The eleventh sits naturally over the minor third for a full, modern, modal sound.",
    intervals: [0, 3, 7, 10, 2, 5],
  },
  "13": {
    name: "Thirteenth",
    description:
      "A dominant chord reaching up to the thirteenth. The thirteenth adds richness on top while the eleventh is usually omitted to avoid clashing with the third.",
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
