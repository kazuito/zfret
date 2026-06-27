import { estimateKey, type KeyEstimate } from "@/features/chords/key";
import type { Song } from "@/features/song/queries";
import { cn } from "@/lib/utils";

const CONFIDENCE_LABEL: Record<KeyEstimate["confidence"], string> = {
  high: "High confidence",
  medium: "Medium confidence",
  low: "Low confidence",
};

const CONFIDENCE_DOTS: Record<KeyEstimate["confidence"], number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export const SongKey = ({
  lines,
}: {
  lines: NonNullable<Song["lines"]>;
}) => {
  const chords = lines
    .flat()
    .map((part) => part.chord)
    .filter((chord): chord is string => !!chord);

  const estimate = estimateKey(chords);
  if (!estimate) return null;

  return (
    <div className="mt-4 flex flex-col gap-2 rounded-xl border border-border/60 bg-card/40 px-4 py-3 text-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-baseline gap-2">
          <span className="text-foreground/60">Estimated Key</span>
          <span className="font-medium text-base">{estimate.name}</span>
        </div>
        <div
          className="flex items-center gap-1.5 text-foreground/60"
          title={CONFIDENCE_LABEL[estimate.confidence]}
        >
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className={cn(
                "size-1.5 rounded-full bg-foreground/20",
                index < CONFIDENCE_DOTS[estimate.confidence] && "bg-accent",
              )}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-foreground/60">
        <span>Scale</span>
        <span className="font-medium text-foreground">
          {estimate.scale.join(" ")}
        </span>
      </div>
      {estimate.alternative && (
        <div className="text-foreground/50 text-xs">
          also likely: {estimate.alternative}
        </div>
      )}
    </div>
  );
};
