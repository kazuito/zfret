import type { ChordToneRole } from "../types";

export const toneFillClass = (role: ChordToneRole) => {
  if (role === "root")
    return "text-white bg-[repeating-linear-gradient(45deg,var(--chart-3)_0_6px,var(--chart-2)_6px_12px)]";
  if (role === "bass")
    return "text-white bg-[repeating-linear-gradient(45deg,var(--color-rose-500)_0_6px,var(--color-rose-400)_6px_12px)]";
  return "bg-chart-3 text-white";
};
