const SHARPS = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const FLATS = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

function transposeNote(note: string, semitones: number, preferFlats: boolean): string {
  let index = SHARPS.indexOf(note);
  if (index === -1) {
    index = FLATS.indexOf(note);
    if (index === -1) return note;
  }

  const newIndex = ((index + semitones) % 12 + 12) % 12;
  return preferFlats ? FLATS[newIndex] : SHARPS[newIndex];
}

function transposeChordToken(chord: string, semitones: number): string {
  if (semitones === 0) return chord;

  const preferFlats = semitones < 0;

  // Handle slash chords like Am/G or C/E
  const slashIndex = chord.indexOf("/");
  if (slashIndex !== -1) {
    const mainChord = chord.slice(0, slashIndex);
    const bassNote = chord.slice(slashIndex + 1);
    const transposedMain = transposeChordToken(mainChord, semitones);
    const bassMatch = bassNote.match(/^([A-G][#b]?)(.*)$/);
    if (bassMatch) {
      const transposedBass = transposeNote(bassMatch[1], semitones, preferFlats) + bassMatch[2];
      return `${transposedMain}/${transposedBass}`;
    }
    return `${transposedMain}/${bassNote}`;
  }

  // Parse root note (e.g. "C#", "Bb", "A") + quality (e.g. "m", "maj7", "sus4")
  const match = chord.match(/^([A-G][#b]?)(.*)$/);
  if (!match) return chord;

  const [, root, quality] = match;
  return transposeNote(root, semitones, preferFlats) + quality;
}

type ChordPart = { chord: string | null; lyric: string };

export function transposeLines(
  lines: ChordPart[][],
  semitones: number,
): ChordPart[][] {
  if (semitones === 0) return lines;

  return lines.map((line) =>
    line.map((part) => ({
      ...part,
      chord: part.chord ? transposeChordToken(part.chord, semitones) : null,
    })),
  );
}
