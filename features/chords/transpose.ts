import { FLAT_NAMES, parseNote, SHARP_NAMES } from "./notes";

const wrap = (pitch: number) => ((pitch % 12) + 12) % 12;

export const transposeChord = (
  raw: string,
  semitones: number,
  preferFlat = false,
): string => {
  const symbol = raw.trim();
  if (semitones === 0) return raw;
  if (symbol === "N.C." || symbol.toUpperCase() === "NC") return raw;

  const rootMatch = symbol.match(/^[A-G](#|♯|b|♭)?/);
  const root = parseNote(symbol);
  if (!rootMatch || !root) return raw;

  const names = preferFlat ? FLAT_NAMES : SHARP_NAMES;
  const shift = (pitch: number) => names[wrap(pitch + semitones)];

  let rest = symbol.slice(rootMatch[0].length);
  let slash = "";
  const slashIndex = rest.indexOf("/");
  if (slashIndex >= 0) {
    const bassRaw = rest.slice(slashIndex + 1);
    rest = rest.slice(0, slashIndex);
    const bass = parseNote(bassRaw);
    const bassMatch = bassRaw.match(/^[A-G](#|♯|b|♭)?/);
    slash =
      bass && bassMatch
        ? `/${shift(bass.pitch)}${bassRaw.slice(bassMatch[0].length)}`
        : `/${bassRaw}`;
  }

  return `${shift(root.pitch)}${rest}${slash}`;
};
