import { SHA256 } from "crypto-es";

function seg(hash: string, offset: number): number {
  return parseInt(hash.slice(offset, offset + 2), 16);
}

export function hashLinearGradient(input: string): string {
  const hash = SHA256(input).toString();

  // Derive hues spread across the color wheel for harmonious combos
  const baseHue = (seg(hash, 0) * 360) / 255;
  const hue1 = baseHue;
  const hue2 = (baseHue + 60 + (seg(hash, 2) % 60)) % 360;
  const hue3 = (baseHue + 150 + (seg(hash, 4) % 60)) % 360;

  // Keep saturation high and lightness in a pleasing mid-range
  const sat1 = 70 + (seg(hash, 6) % 25);
  const sat2 = 65 + (seg(hash, 8) % 25);
  const sat3 = 70 + (seg(hash, 10) % 25);

  const lit1 = 52 + (seg(hash, 12) % 18);
  const lit2 = 48 + (seg(hash, 14) % 18);
  const lit3 = 50 + (seg(hash, 16) % 18);

  const color1 = `hsl(${hue1.toFixed(0)}, ${sat1}%, ${lit1}%)`;
  const color2 = `hsl(${hue2.toFixed(0)}, ${sat2}%, ${lit2}%)`;
  const color3 = `hsl(${hue3.toFixed(0)}, ${sat3}%, ${lit3}%)`;

  const angle = seg(hash, 18) % 360;

  return `linear-gradient(${angle}deg, ${color1}, ${color2}, ${color3})`;
}
