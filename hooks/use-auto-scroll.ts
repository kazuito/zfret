"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useAutoScroll() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [speed, setSpeed] = useState(2); // 1–5 scale
  const animationRef = useRef<number | null>(null);
  const accumulatorRef = useRef(0);

  const step = useCallback(() => {
    // Accumulate fractional pixels so slow speeds still move smoothly
    accumulatorRef.current += speed * 0.3;
    const pixels = Math.floor(accumulatorRef.current);
    if (pixels > 0) {
      window.scrollBy({ top: pixels, behavior: "instant" });
      accumulatorRef.current -= pixels;
    }
    animationRef.current = requestAnimationFrame(step);
  }, [speed]);

  useEffect(() => {
    if (isScrolling) {
      accumulatorRef.current = 0;
      animationRef.current = requestAnimationFrame(step);
    } else {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isScrolling, step]);

  const toggle = useCallback(() => setIsScrolling((prev) => !prev), []);

  return { isScrolling, toggle, speed, setSpeed };
}
