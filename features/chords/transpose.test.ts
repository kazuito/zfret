import { describe, expect, it } from "vitest";
import { transposeChord } from "./transpose";

describe("transposeChord", () => {
  it("returns the input unchanged for a zero shift", () => {
    expect(transposeChord("C", 0)).toBe("C");
    expect(transposeChord("F#m7", 0)).toBe("F#m7");
  });

  it("shifts the root up while keeping the quality suffix", () => {
    expect(transposeChord("C", 2)).toBe("D");
    expect(transposeChord("Cm7", 2)).toBe("Dm7");
    expect(transposeChord("Gsus4", 2)).toBe("Asus4");
  });

  it("shifts the root down", () => {
    expect(transposeChord("C", -1)).toBe("B");
    expect(transposeChord("Dm", -2)).toBe("Cm");
  });

  it("wraps around the octave in both directions", () => {
    expect(transposeChord("B", 1)).toBe("C");
    expect(transposeChord("C", -1)).toBe("B");
    expect(transposeChord("C", 12)).toBe("C");
  });

  it("uses sharp spelling by default and flat spelling on request", () => {
    expect(transposeChord("C", 1)).toBe("C#");
    expect(transposeChord("C", 1, true)).toBe("D♭");
  });

  it("transposes both the chord and the bass of a slash chord", () => {
    expect(transposeChord("C/G", 2)).toBe("D/A");
    expect(transposeChord("C/E", 2, true)).toBe("D/G♭");
  });

  it("keeps a slash suffix that is not a note untouched", () => {
    expect(transposeChord("C/foo", 2)).toBe("D/foo");
  });

  it("leaves no-chord markers alone", () => {
    expect(transposeChord("N.C.", 3)).toBe("N.C.");
    expect(transposeChord("NC", 3)).toBe("NC");
  });

  it("returns the input unchanged when the root is not a note", () => {
    expect(transposeChord("???", 2)).toBe("???");
  });

  it("normalizes a transposed flat root onto the pitch grid", () => {
    expect(transposeChord("Bb", 1)).toBe("B");
  });
});
