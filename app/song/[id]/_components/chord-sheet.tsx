"use client";

import { useState } from "react";
import { useAutoScroll } from "@/hooks/use-auto-scroll";
import { transposeLines } from "@/lib/transpose";
import { ChordControls } from "./chord-controls";
import { ChordLines } from "./chord-lines";

type Props = {
  lines: NonNullable<import("@/features/song/actions").Song["lines"]>;
};

export const ChordSheet = ({ lines }: Props) => {
  const [transpose, setTranspose] = useState(0);
  const [fontSize, setFontSize] = useState(1);
  const { isScrolling, toggle, speed, setSpeed } = useAutoScroll();

  const transposedLines = transposeLines(lines, transpose);

  return (
    <div>
      <ChordControls
        transpose={transpose}
        onTransposeChange={setTranspose}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        isScrolling={isScrolling}
        onScrollToggle={toggle}
        scrollSpeed={speed}
        onScrollSpeedChange={setSpeed}
      />
      <div style={{ fontSize: `${fontSize}rem` }}>
        <ChordLines lines={transposedLines} />
      </div>
    </div>
  );
};
