/**
 * Opacity scale — semantic + numeric.
 */
export const opacity = {
  0: 0,
  4: 0.04,
  8: 0.08,
  12: 0.12,
  16: 0.16,
  24: 0.24,
  32: 0.32,
  48: 0.48,
  64: 0.64,
  80: 0.8,
  100: 1,

  // semantic aliases
  transparent: 0,
  subtle: 0.04,
  faint: 0.08,
  soft: 0.12,
  medium: 0.32,
  strong: 0.64,
  opaque: 1,
  disabled: 0.38,
  scrim: 0.32,
  overlay: 0.48,
} as const;

export type OpacityScale = typeof opacity;
export type OpacityKey = keyof OpacityScale;
