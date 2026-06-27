import { analyzeChord } from "./analyze";
import { FLAT_NAMES, SHARP_NAMES } from "./notes";
import type { ChordToneRole } from "./types";

export type KeyMode = "major" | "minor";

export type KeyEstimate = {
  tonic: number;
  mode: KeyMode;
  name: string;
  scale: string[];
  confidence: "high" | "medium" | "low";
  alternative: string | null;
};

const ROLE_WEIGHT: Record<ChordToneRole, number> = {
  root: 3,
  bass: 2,
  chord: 1,
};

// Krumhansl–Schmuckler tonal hierarchy profiles.
const MAJOR_PROFILE = [
  6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88,
];
const MINOR_PROFILE = [
  6.33, 2.68, 3.52, 5.38, 2.6, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17,
];

const MAJOR_SCALE = [0, 2, 4, 5, 7, 9, 11];
const MINOR_SCALE = [0, 2, 3, 5, 7, 8, 10];

const FLAT_MAJOR_TONICS = new Set([5, 10, 3, 8, 1, 6]);
const FLAT_MINOR_TONICS = new Set([2, 7, 0, 5, 10, 3]);

const RELATIVE_EPS = 0.05;

type Candidate = { tonic: number; mode: KeyMode; score: number };

type ChordProfile = {
  histogram: number[];
  firstRoot: number | null;
  lastRoot: number | null;
};

const profileChords = (chords: string[]): ChordProfile | null => {
  const histogram = new Array(12).fill(0);
  let total = 0;
  let firstRoot: number | null = null;
  let lastRoot: number | null = null;

  for (const chord of chords) {
    const { notes } = analyzeChord(chord);
    if (notes.length === 0) continue;

    const root = notes.find((note) => note.role === "root");
    if (root) {
      if (firstRoot === null) firstRoot = root.pitch;
      lastRoot = root.pitch;
    }

    for (const tone of notes) {
      histogram[tone.pitch] += ROLE_WEIGHT[tone.role];
      total += ROLE_WEIGHT[tone.role];
    }
  }

  return total > 0 ? { histogram, firstRoot, lastRoot } : null;
};

const correlate = (histogram: number[], profile: number[]): number => {
  const mean = (values: number[]) =>
    values.reduce((sum, value) => sum + value, 0) / values.length;
  const meanH = mean(histogram);
  const meanP = mean(profile);

  let numerator = 0;
  let varH = 0;
  let varP = 0;
  for (let i = 0; i < 12; i++) {
    const dh = histogram[i] - meanH;
    const dp = profile[i] - meanP;
    numerator += dh * dp;
    varH += dh * dh;
    varP += dp * dp;
  }

  const denominator = Math.sqrt(varH * varP);
  return denominator === 0 ? 0 : numerator / denominator;
};

const rankKeys = (histogram: number[]): Candidate[] => {
  const candidates: Candidate[] = [];

  for (let tonic = 0; tonic < 12; tonic++) {
    for (const [mode, base] of [
      ["major", MAJOR_PROFILE],
      ["minor", MINOR_PROFILE],
    ] as const) {
      const rotated = base.map((_, pitch) => base[(pitch - tonic + 12) % 12]);
      candidates.push({ tonic, mode, score: correlate(histogram, rotated) });
    }
  }

  return candidates.sort((a, b) => b.score - a.score);
};

const relativeOf = ({ tonic, mode }: Candidate): Candidate => ({
  tonic: mode === "major" ? (tonic + 9) % 12 : (tonic + 3) % 12,
  mode: mode === "major" ? "minor" : "major",
  score: 0,
});

export const prefersFlat = (tonic: number, mode: KeyMode): boolean =>
  mode === "major"
    ? FLAT_MAJOR_TONICS.has(tonic)
    : FLAT_MINOR_TONICS.has(tonic);

const noteNames = (tonic: number, mode: KeyMode): string[] =>
  prefersFlat(tonic, mode) ? FLAT_NAMES : SHARP_NAMES;

const keyName = ({ tonic, mode }: Candidate): string => {
  const names = noteNames(tonic, mode);
  return `${names[tonic]} ${mode === "major" ? "Major" : "Minor"}`;
};

export type KeyDescription = {
  name: string;
  scale: string[];
  alternative: string;
};

export const describeKey = (tonic: number, mode: KeyMode): KeyDescription => {
  const names = noteNames(tonic, mode);
  const intervals = mode === "major" ? MAJOR_SCALE : MINOR_SCALE;
  return {
    name: keyName({ tonic, mode, score: 0 }),
    scale: intervals.map((interval) => names[(tonic + interval) % 12]),
    alternative: keyName(relativeOf({ tonic, mode, score: 0 })),
  };
};

const gradeConfidence = (
  chosen: Candidate,
  ranked: Candidate[],
  resolved: boolean,
  started: boolean,
): KeyEstimate["confidence"] => {
  const relativeTonic = relativeOf(chosen).tonic;
  const competitor = ranked.find(
    (candidate) =>
      candidate.tonic !== chosen.tonic && candidate.tonic !== relativeTonic,
  );
  const margin = chosen.score - (competitor?.score ?? 0);

  let level: KeyEstimate["confidence"] =
    margin >= 0.25 ? "high" : margin >= 0.1 ? "medium" : "low";

  if (resolved && started) return "high";
  if (resolved) level = level === "low" ? "medium" : "high";
  return level;
};

export const estimateKey = (chords: string[]): KeyEstimate | null => {
  const profile = profileChords(chords);
  if (!profile) return null;

  const { histogram, firstRoot, lastRoot } = profile;
  const ranked = rankKeys(histogram);

  let chosen = ranked[0];
  const relative = ranked.find(
    (candidate) =>
      candidate.tonic === relativeOf(chosen).tonic &&
      candidate.mode !== chosen.mode,
  );
  const support = (tonic: number) =>
    (lastRoot === tonic ? 2 : 0) + (firstRoot === tonic ? 1 : 0);

  if (
    relative &&
    chosen.score - relative.score < RELATIVE_EPS &&
    support(relative.tonic) > support(chosen.tonic)
  ) {
    chosen = relative;
  }

  const description = describeKey(chosen.tonic, chosen.mode);

  return {
    tonic: chosen.tonic,
    mode: chosen.mode,
    name: description.name,
    scale: description.scale,
    confidence: gradeConfidence(
      chosen,
      ranked,
      lastRoot === chosen.tonic,
      firstRoot === chosen.tonic,
    ),
    alternative: description.alternative,
  };
};
