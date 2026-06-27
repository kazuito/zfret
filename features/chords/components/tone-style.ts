import type { ChordToneRole } from "../types";

export const toneFillClass = (role: ChordToneRole) => {
  if (role === "root") return "bg-chart-1 text-black";
  if (role === "bass") return "bg-rose-500 text-white!";
  return "bg-chart-3 text-white";
};
