export type ChordToneRole = "root" | "bass" | "chord";

export type ChordTone = {
  pitch: number;
  name: string;
  role: ChordToneRole;
};

export type ChordInfo = {
  name: string;
  description: string;
  notes: ChordTone[];
};

export type Quality = {
  name: string;
  description: string;
  intervals: number[];
};

export type ParsedNote = {
  pitch: number;
  display: string;
  flat: boolean;
};
