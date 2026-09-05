/**
 * Typography — font families, sizes, weights, line-heights, and semantic variants.
 * All sizes in density-independent pixels (React Native).
 */

export const fontFamily = {
  /** System sans — SF Pro (iOS) / Roboto (Android) fallback */
  sans: 'System',
  /** Monospace — SF Mono / Roboto Mono fallback */
  mono: 'System',
  /** Brand / display — override via theme if needed */
  display: 'System',
} as const;

export const fontSize = {
  xs: 11,
  sm: 12,
  base: 14,
  md: 14,
  lg: 16,
  xl: 18,
  '2xl': 20,
  '3xl': 24,
  '4xl': 30,
  '5xl': 36,
  '6xl': 48,
} as const;

export const lineHeight = {
  none: 1,
  tight: 1.15,
  snug: 1.25,
  normal: 1.45,
  relaxed: 1.6,
  loose: 1.8,
} as const;

export const fontWeight = {
  thin: '100',
  extralight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
} as const;

export const letterSpacing = {
  tighter: -0.8,
  tight: -0.4,
  normal: 0,
  wide: 0.4,
  wider: 0.8,
  widest: 1.2,
} as const;

/**
 * Semantic text variants — components consume these instead of raw sizes.
 * Mirrors Material 3 type scale but compact enough for media-dense UIs.
 */
export const textVariants = {
  displayLarge: {
    fontSize: fontSize['6xl'],
    lineHeight: fontSize['6xl'] * lineHeight.tight,
    fontWeight: fontWeight.bold,
    letterSpacing: letterSpacing.tighter,
  },
  displayMedium: {
    fontSize: fontSize['5xl'],
    lineHeight: fontSize['5xl'] * lineHeight.tight,
    fontWeight: fontWeight.bold,
    letterSpacing: letterSpacing.tight,
  },
  headlineLarge: {
    fontSize: fontSize['4xl'],
    lineHeight: fontSize['4xl'] * lineHeight.snug,
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.tight,
  },
  headlineMedium: {
    fontSize: fontSize['3xl'],
    lineHeight: fontSize['3xl'] * lineHeight.snug,
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.normal,
  },
  headlineSmall: {
    fontSize: fontSize['2xl'],
    lineHeight: fontSize['2xl'] * lineHeight.snug,
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.normal,
  },
  titleLarge: {
    fontSize: fontSize.xl,
    lineHeight: fontSize.xl * lineHeight.normal,
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.normal,
  },
  titleMedium: {
    fontSize: fontSize.lg,
    lineHeight: fontSize.lg * lineHeight.normal,
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.normal,
  },
  titleSmall: {
    fontSize: fontSize.base,
    lineHeight: fontSize.base * lineHeight.normal,
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.wide,
  },
  bodyLarge: {
    fontSize: fontSize.lg,
    lineHeight: fontSize.lg * lineHeight.relaxed,
    fontWeight: fontWeight.regular,
    letterSpacing: letterSpacing.normal,
  },
  bodyMedium: {
    fontSize: fontSize.base,
    lineHeight: fontSize.base * lineHeight.relaxed,
    fontWeight: fontWeight.regular,
    letterSpacing: letterSpacing.normal,
  },
  bodySmall: {
    fontSize: fontSize.sm,
    lineHeight: fontSize.sm * lineHeight.normal,
    fontWeight: fontWeight.regular,
    letterSpacing: letterSpacing.normal,
  },
  labelLarge: {
    fontSize: fontSize.base,
    lineHeight: fontSize.base * lineHeight.normal,
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.wide,
  },
  labelMedium: {
    fontSize: fontSize.sm,
    lineHeight: fontSize.sm * lineHeight.normal,
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.wide,
  },
  labelSmall: {
    fontSize: fontSize.xs,
    lineHeight: fontSize.xs * lineHeight.normal,
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.wider,
  },
  caption: {
    fontSize: fontSize.xs,
    lineHeight: fontSize.xs * lineHeight.normal,
    fontWeight: fontWeight.regular,
    letterSpacing: letterSpacing.wide,
  },
} as const;

export type FontFamilyKey = keyof typeof fontFamily;
export type FontSizeKey = keyof typeof fontSize;
export type TextVariantKey = keyof typeof textVariants;
