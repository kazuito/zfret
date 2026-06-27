import { describe, expect, it } from "vitest";
import { FLAT_NAMES, parseNote, SHARP_NAMES } from "./notes";

describe("parseNote", () => {
  it("parses natural roots to their pitch class", () => {
    expect(parseNote("C")).toMatchObject({ pitch: 0, display: "C" });
    expect(parseNote("E")).toMatchObject({ pitch: 4, display: "E" });
    expect(parseNote("G")).toMatchObject({ pitch: 7, display: "G" });
    expect(parseNote("B")).toMatchObject({ pitch: 11, display: "B" });
  });

  it("raises a sharp and uses the sharp spelling", () => {
    expect(parseNote("F#")).toMatchObject({
      pitch: 6,
      display: "F#",
      flat: false,
    });
    expect(parseNote("C#")).toMatchObject({ pitch: 1, display: "C#" });
  });

  it("lowers a flat and uses the flat spelling", () => {
    expect(parseNote("Bb")).toMatchObject({
      pitch: 10,
      display: "B♭",
      flat: true,
    });
    expect(parseNote("Eb")).toMatchObject({ pitch: 3, display: "E♭" });
  });

  it("accepts unicode accidentals", () => {
    expect(parseNote("F♯")).toMatchObject({ pitch: 6, flat: false });
    expect(parseNote("B♭")).toMatchObject({ pitch: 10, flat: true });
  });

  it("wraps below C around the octave", () => {
    expect(parseNote("Cb")).toMatchObject({ pitch: 11, display: "B" });
  });

  it("reads only the leading note token and ignores the rest", () => {
    expect(parseNote("Gm7")).toMatchObject({ pitch: 7, display: "G" });
    expect(parseNote("Abadd9")).toMatchObject({ pitch: 8, display: "A♭" });
  });

  it("returns null when the input is not a note", () => {
    expect(parseNote("")).toBeNull();
    expect(parseNote("H")).toBeNull();
    expect(parseNote("7")).toBeNull();
  });

  it("keeps the name tables aligned to 12 pitch classes", () => {
    expect(SHARP_NAMES).toHaveLength(12);
    expect(FLAT_NAMES).toHaveLength(12);
    expect(SHARP_NAMES[0]).toBe("C");
    expect(FLAT_NAMES[1]).toBe("D♭");
  });
});
