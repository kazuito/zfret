export type ChordInfo = {
  name: string;
  description: string;
  notes: string[];
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
