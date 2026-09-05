/**
 * Spacing — 4pt base grid.
 * Every value is a multiple of 4 (except 0) for visual rhythm.
 * Semantic aliases map to use-cases without hardcoding numbers in components.
 */
export const spacing = {
  /** 0 */
  0: 0,
  /** 2 — hairline, fine adjustments */
  px: 1,
  /** 2 */
  '0.5': 2,
  /** 4 — xs */
  1: 4,
  /** 6 */
  1.5: 6,
  /** 8 — sm */
  2: 8,
  /** 10 */
  2.5: 10,
  /** 12 — md */
  3: 12,
  /** 14 */
  3.5: 14,
  /** 16 — lg */
  4: 16,
  /** 20 — xl */
  5: 20,
  /** 24 — 2xl */
  6: 24,
  /** 28 */
  7: 28,
  /** 32 — 3xl */
  8: 32,
  /** 36 */
  9: 36,
  /** 40 — 4xl */
  10: 40,
  /** 48 — 5xl */
  12: 48,
  /** 64 — 6xl */
  16: 64,
  /** 80 */
  20: 80,
  /** 96 */
  24: 96,
} as const;

/** Semantic spacing aliases — prefer these in components for intent. */
export const spacingSemantic = {
  none: spacing[0],
  xs: spacing[1],
  sm: spacing[2],
  md: spacing[3],
  lg: spacing[4],
  xl: spacing[5],
  '2xl': spacing[6],
  '3xl': spacing[8],
  '4xl': spacing[10],
  '5xl': spacing[12],
  '6xl': spacing[16],
} as const;

export type SpacingScale = typeof spacing;
export type SpacingKey = keyof SpacingScale;
export type SpacingSemanticKey = keyof typeof spacingSemantic;
