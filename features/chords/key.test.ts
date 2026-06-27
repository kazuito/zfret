import { describe, expect, it } from "vitest";
import { describeKey, estimateKey, prefersFlat } from "./key";

describe("prefersFlat", () => {
  it("flags flat-side major keys", () => {
    expect(prefersFlat(5, "major")).toBe(true); // F
    expect(prefersFlat(10, "major")).toBe(true); // B♭
    expect(prefersFlat(0, "major")).toBe(false); // C
    expect(prefersFlat(7, "major")).toBe(false); // G
  });

  it("flags flat-side minor keys", () => {
    expect(prefersFlat(2, "minor")).toBe(true); // D minor
    expect(prefersFlat(9, "minor")).toBe(false); // A minor
  });
});

describe("describeKey", () => {
  it("describes C major with the natural scale and relative minor", () => {
    expect(describeKey(0, "major")).toEqual({
      name: "C Major",
      scale: ["C", "D", "E", "F", "G", "A", "B"],
      alternative: "A Minor",
    });
  });

  it("describes A minor with its relative major", () => {
    expect(describeKey(9, "minor")).toEqual({
      name: "A Minor",
      scale: ["A", "B", "C", "D", "E", "F", "G"],
      alternative: "C Major",
    });
  });

  it("uses flat spelling for flat-side keys", () => {
    expect(describeKey(5, "major").scale).toEqual([
      "F",
      "G",
      "A",
      "B♭",
      "C",
      "D",
      "E",
    ]);
  });
});

describe("estimateKey", () => {
  it("returns null when there are no analyzable chords", () => {
    expect(estimateKey([])).toBeNull();
    expect(estimateKey(["N.C.", "???"])).toBeNull();
  });

  it("estimates a major key from a I–IV–V–I progression", () => {
    const estimate = estimateKey(["C", "F", "G", "C"]);
    expect(estimate).not.toBeNull();
    expect(estimate?.tonic).toBe(0);
    expect(estimate?.mode).toBe("major");
    expect(estimate?.name).toBe("C Major");
    expect(estimate?.scale).toHaveLength(7);
  });

  it("estimates a minor key from a minor progression", () => {
    const estimate = estimateKey(["Am", "Dm", "E7", "Am"]);
    expect(estimate?.tonic).toBe(9);
    expect(estimate?.mode).toBe("minor");
    expect(estimate?.name).toBe("A Minor");
  });

  it("reports high confidence when the tonic both opens and closes", () => {
    const estimate = estimateKey(["C", "F", "G", "C"]);
    expect(estimate?.confidence).toBe("high");
  });

  it("always offers the relative key as an alternative", () => {
    const estimate = estimateKey(["C", "F", "G", "C"]);
    expect(estimate?.alternative).toBe("A Minor");
  });
});
