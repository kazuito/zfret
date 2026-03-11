import type { CSSProperties } from "react";

/**
 * Deterministic gradient from a string (plain text or sha256 hex).
 *
 * Usage:
 *   <div style={bgHashGradient("hello")} />
 *   <div style={bgHashGradient("2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824")} />
 */
export function bgHashGradient(input: string): CSSProperties {
  const bytes = toSeedBytes(input);

  // angle: 0 - 359
  const angle = readUint16(bytes, 0) % 360;

  // pick 3 colors from seeded bytes
  const color1 = hslFromBytes(bytes, 2);
  const color2 = hslFromBytes(bytes, 8);
  const color3 = hslFromBytes(bytes, 14);

  // stop positions
  const stop1 = 0;
  const stop2 = 35 + (bytes[20] % 31); // 35 - 65
  const stop3 = 75 + (bytes[21] % 21); // 75 - 95

  return {
    backgroundImage: `linear-gradient(${angle}deg, ${color1} ${stop1}%, ${color2} ${stop2}%, ${color3} ${stop3}%)`,
  };
}

/**
 * If input is sha256 hex (64 chars), use it directly.
 * Otherwise derive deterministic pseudo-bytes from the string.
 */
function toSeedBytes(input: string): Uint8Array {
  if (/^[0-9a-f]{64}$/i.test(input)) {
    return hexToBytes(input);
  }

  // FNV-1a based expansion into 32 bytes
  const bytes = new Uint8Array(32);
  let h = 0x811c9dc5;

  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }

  for (let i = 0; i < 32; i++) {
    h ^= i + 1;
    h = Math.imul(h, 0x01000193);
    bytes[i] = (h >>> ((i % 4) * 8)) & 0xff;
  }

  return bytes;
}

function hexToBytes(hex: string): Uint8Array {
  const normalized = hex.toLowerCase();
  const bytes = new Uint8Array(normalized.length / 2);

  for (let i = 0; i < normalized.length; i += 2) {
    bytes[i / 2] = parseInt(normalized.slice(i, i + 2), 16);
  }

  return bytes;
}

function readUint16(bytes: Uint8Array, offset: number): number {
  const a = bytes[offset % bytes.length]!;
  const b = bytes[(offset + 1) % bytes.length]!;
  return (a << 8) | b;
}

function hslFromBytes(bytes: Uint8Array, offset: number): string {
  const hue = readUint16(bytes, offset) % 360;
  const saturation = 55 + (bytes[(offset + 2) % bytes.length]! % 31); // 55 - 85
  const lightness = 45 + (bytes[(offset + 3) % bytes.length]! % 21); // 45 - 65

  return `hsl(${hue} ${saturation}% ${lightness}%)`;
}
