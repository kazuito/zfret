import { describe, expect, it } from "vitest";
import { resolveQuality } from "./qualities";

describe("resolveQuality", () => {
  it("treats an empty suffix as a major triad", () => {
    expect(resolveQuality("")).toMatchObject({
      name: "Major",
      intervals: [0, 4, 7],
    });
  });

  it("resolves common triad qualities", () => {
    expect(resolveQuality("m").intervals).toEqual([0, 3, 7]);
    expect(resolveQuality("dim").intervals).toEqual([0, 3, 6]);
    expect(resolveQuality("aug").intervals).toEqual([0, 4, 8]);
    expect(resolveQuality("5").intervals).toEqual([0, 7]);
  });

  it("resolves seventh chords", () => {
    expect(resolveQuality("7").intervals).toEqual([0, 4, 7, 10]);
    expect(resolveQuality("M7").intervals).toEqual([0, 4, 7, 11]);
    expect(resolveQuality("m7").intervals).toEqual([0, 3, 7, 10]);
  });

  it("normalizes maj spellings to a major seventh", () => {
    expect(resolveQuality("maj7")).toBe(resolveQuality("M7"));
    expect(resolveQuality("Maj7")).toBe(resolveQuality("M7"));
  });

  it("normalizes unicode and altered-fifth spellings", () => {
    expect(resolveQuality("m7b5")).toBe(resolveQuality("m7-5"));
    expect(resolveQuality("7♭5")).toBe(resolveQuality("7-5"));
    expect(resolveQuality("7#5")).toBe(resolveQuality("7+5"));
  });

  it("normalizes altered-ninth spellings", () => {
    expect(resolveQuality("7b9")).toBe(resolveQuality("7-9"));
    expect(resolveQuality("7#9")).toBe(resolveQuality("7+9"));
  });

  it("falls back to a major triad for an unknown major-ish suffix", () => {
    const quality = resolveQuality("??");
    expect(quality.name).toBe("??");
    expect(quality.intervals).toEqual([0, 4, 7]);
    expect(quality.description).toMatch(/not fully recognized/);
  });

  it("falls back to a minor triad for an unknown minor-ish suffix", () => {
    expect(resolveQuality("mystery").intervals).toEqual([0, 3, 7]);
  });

  it("does not mistake a leading capital M for minor", () => {
    expect(resolveQuality("Munknown").intervals).toEqual([0, 4, 7]);
  });
});
