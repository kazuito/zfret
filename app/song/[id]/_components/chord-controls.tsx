"use client";

import {
  MinusSignIcon,
  PauseIcon,
  PlayIcon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";

type Props = {
  transpose: number;
  onTransposeChange: (value: number) => void;
  fontSize: number;
  onFontSizeChange: (value: number) => void;
  isScrolling: boolean;
  onScrollToggle: () => void;
  scrollSpeed: number;
  onScrollSpeedChange: (value: number) => void;
};

const FONT_SIZES = [0.8, 0.9, 1, 1.15, 1.3];
const FONT_SIZE_LABELS = ["XS", "S", "M", "L", "XL"];

export const ChordControls = ({
  transpose,
  onTransposeChange,
  fontSize,
  onFontSizeChange,
  isScrolling,
  onScrollToggle,
  scrollSpeed,
  onScrollSpeedChange,
}: Props) => {
  const fontIndex = FONT_SIZES.indexOf(fontSize);

  const transposeLabel =
    transpose === 0 ? "Original" : transpose > 0 ? `+${transpose}` : `${transpose}`;

  return (
    <div className="mb-8 flex flex-wrap items-center gap-4 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm">
      {/* Transpose */}
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Key</span>
        <Button
          size="icon-sm"
          variant="outline"
          onClick={() => onTransposeChange(transpose - 1)}
          title="Transpose down"
        >
          <Icon icon={MinusSignIcon} size={14} />
          <span className="sr-only">Transpose down</span>
        </Button>
        <span className="w-16 text-center font-mono font-medium tabular-nums">
          {transposeLabel}
        </span>
        <Button
          size="icon-sm"
          variant="outline"
          onClick={() => onTransposeChange(transpose + 1)}
          title="Transpose up"
        >
          <Icon icon={PlusSignIcon} size={14} />
          <span className="sr-only">Transpose up</span>
        </Button>
      </div>

      <div className="h-4 w-px bg-border" />

      {/* Font size */}
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Size</span>
        <Button
          size="icon-sm"
          variant="outline"
          disabled={fontIndex <= 0}
          onClick={() => onFontSizeChange(FONT_SIZES[fontIndex - 1])}
          title="Decrease font size"
        >
          <Icon icon={MinusSignIcon} size={14} />
          <span className="sr-only">Decrease font size</span>
        </Button>
        <span className="w-6 text-center font-medium">
          {FONT_SIZE_LABELS[fontIndex]}
        </span>
        <Button
          size="icon-sm"
          variant="outline"
          disabled={fontIndex >= FONT_SIZES.length - 1}
          onClick={() => onFontSizeChange(FONT_SIZES[fontIndex + 1])}
          title="Increase font size"
        >
          <Icon icon={PlusSignIcon} size={14} />
          <span className="sr-only">Increase font size</span>
        </Button>
      </div>

      <div className="h-4 w-px bg-border" />

      {/* Auto-scroll */}
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Scroll</span>
        <Button
          size="icon-sm"
          variant={isScrolling ? "default" : "outline"}
          onClick={onScrollToggle}
          title={isScrolling ? "Stop auto-scroll" : "Start auto-scroll"}
        >
          <Icon icon={isScrolling ? PauseIcon : PlayIcon} size={14} />
          <span className="sr-only">{isScrolling ? "Pause" : "Play"}</span>
        </Button>
        {isScrolling && (
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={scrollSpeed}
            onChange={(e) => onScrollSpeedChange(Number(e.target.value))}
            className="w-20 accent-primary"
            title={`Scroll speed: ${scrollSpeed}`}
          />
        )}
      </div>
    </div>
  );
};
