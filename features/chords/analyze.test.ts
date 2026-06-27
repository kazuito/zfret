import { describe, expect, it } from "vitest";
import { analyzeChord } from "./analyze";

const pitches = (chord: string) =>
  analyzeChord(chord).notes.map((note) => note.pitch);

const roleOf = (chord: string, pitch: number) =>
  analyzeChord(chord).notes.find((note) => note.pitch === pitch)?.role;

describe("analyzeChord", () => {
  it("builds a major triad with the root flagged", () => {
    const { name, notes } = analyzeChord("C");
    expect(name).toBe("C Major");
    expect(notes.map((n) => n.name)).toEqual(["C", "E", "G"]);
    expect(notes[0].role).toBe("root");
    expect(notes.slice(1).every((n) => n.role === "chord")).toBe(true);
  });

  it("builds a minor triad", () => {
    expect(pitches("Am")).toEqual([9, 0, 4]);
    expect(analyzeChord("Am").name).toBe("A Minor");
  });

  it("applies the quality intervals to the parsed root", () => {
    expect(pitches("G7")).toEqual([7, 11, 2, 5]);
    expect(analyzeChord("G7").name).toBe("G Dominant 7th");
  });

  it("spells flat roots with flat note names", () => {
    expect(analyzeChord("Bb").notes.map((n) => n.name)).toEqual([
      "B♭",
      "D",
      "F",
    ]);
  });

  it("spells sharp roots with sharp note names", () => {
    expect(analyzeChord("F#m").notes.map((n) => n.name)).toEqual([
      "F#",
      "A",
      "C#",
    ]);
  });

  describe("slash chords", () => {
    it("prepends a bass note that is not already in the chord", () => {
      const { name, notes } = analyzeChord("C/D");
      expect(notes[0]).toMatchObject({ pitch: 2, role: "bass" });
      expect(name).toMatch(/slash chord/);
    });

    it("relabels an existing chord tone as the bass", () => {
      const { notes } = analyzeChord("C/G");
      expect(notes.filter((n) => n.pitch === 7)).toHaveLength(1);
      expect(roleOf("C/G", 7)).toBe("bass");
    });

    it("does not duplicate a bass note already present", () => {
      const { notes } = analyzeChord("C/E");
      expect(notes.filter((n) => n.pitch === 4)).toHaveLength(1);
      expect(roleOf("C/E", 4)).toBe("bass");
    });

    it("keeps the root role when the bass equals the root", () => {
      expect(roleOf("C/C", 0)).toBe("root");
    });
  });

  describe("non-chord input", () => {
    it("treats N.C. and NC as no chord", () => {
      expect(analyzeChord("N.C.").notes).toEqual([]);
      expect(analyzeChord("nc").notes).toEqual([]);
      expect(analyzeChord("N.C.").name).toBe("No Chord");
    });

    it("returns an uninterpretable result for non-notes", () => {
      const { name, notes } = analyzeChord("???");
      expect(name).toBe("???");
      expect(notes).toEqual([]);
    });

    it("trims surrounding whitespace", () => {
      expect(analyzeChord("  C  ").name).toBe("C Major");
    });
  });
});
