import { FLAT_NAMES, parseNote, SHARP_NAMES } from "./notes";
import { resolveQuality } from "./qualities";
import type { ChordInfo, ParsedNote } from "./types";

const NO_CHORD: ChordInfo = {
  name: "No Chord",
  description:
    "A passage where no chord is played, marking a rest or break (silence).",
  notes: [],
};

export const analyzeChord = (raw: string): ChordInfo => {
  const symbol = raw.trim();

  if (symbol === "N.C." || symbol.toUpperCase() === "NC") return NO_CHORD;

  const root = parseNote(symbol);
  if (!root) {
    return {
      name: symbol,
      description: "This symbol cannot be interpreted as a chord.",
      notes: [],
    };
  }

  const rootMatch = symbol.match(/^[A-G](#|♯|b|♭)?/);
  let rest = symbol.slice(rootMatch?.[0].length ?? 0);

  let bass: ParsedNote | null = null;
  const slashIndex = rest.indexOf("/");
  if (slashIndex >= 0) {
    bass = parseNote(rest.slice(slashIndex + 1));
    rest = rest.slice(0, slashIndex);
  }

  const quality = resolveQuality(rest);
  const names = root.flat ? FLAT_NAMES : SHARP_NAMES;

  const notes = quality.intervals.map(
    (interval) => names[(root.pitch + interval) % 12],
  );

  if (
    bass &&
    !quality.intervals.some((i) => (root.pitch + i) % 12 === bass.pitch)
  ) {
    notes.unshift(bass.display);
  }

  let name = `${root.display} ${quality.name}`;
  let description = quality.description;

  if (bass) {
    name += ` / ${bass.display} (slash chord)`;
    description += ` A slash chord with ${bass.display} in the bass.`;
  }

  return { name, description, notes };
};
