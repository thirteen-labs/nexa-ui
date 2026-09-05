/**
 * Colors — raw palette + semantic light/dark foundations.
 * Raw palette is intentionally small; themes derive semantics from it.
 * Override per-theme via `createTheme({ colors: { ... } })`.
 */

export const palette = {
  // Neutrals — warm obsidian
  obsidian: {
    50: '#FAFAF9',
    100: '#F5F5F4',
    200: '#E7E5E4',
    300: '#D6D3D1',
    400: '#A8A29E',
    500: '#78716C',
    600: '#57534E',
    700: '#44403C',
    800: '#292524',
    900: '#1C1917',
    950: '#0C0A09',
  },
  // Violet — primary brand (Lumora/Moon)
  violet: {
    50: '#F5F3FF',
    100: '#EDE9FE',
    200: '#DDD6FE',
    300: '#C4B5FD',
    400: '#A78BFA',
    500: '#8B5CF6',
    600: '#7C3AED',
    700: '#6D28D9',
    800: '#5B21B6',
    900: '#4C1D95',
  },
  // Accent — cyan for media / waveform
  cyan: {
    50: '#ECFEFF',
    100: '#CFFAFE',
    200: '#A5F3FC',
    300: '#67E8F9',
    400: '#22D3EE',
    500: '#06B6D4',
    600: '#0891B2',
    700: '#0E7490',
  },
  // Semantic
  red: {
    50: '#FEF2F2',
    500: '#EF4444',
    600: '#DC2626',
  },
  amber: {
    50: '#FFFBEB',
    500: '#F59E0B',
    600: '#D97706',
  },
  emerald: {
    50: '#ECFDF5',
    500: '#10B981',
    600: '#059669',
  },
} as const;

/**
 * Semantic color contract — every theme must satisfy this shape.
 * Components ONLY consume semantic tokens, never raw palette values.
 */
export type SemanticColors = {
  // canvas
  background: string;
  foreground: string;
  surface: string;
  surfaceVariant: string;
  surfaceElevated: string;

  // text
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;

  // brand
  primary: string;
  primaryContainer: string;
  onPrimary: string;
  onPrimaryContainer: string;

  secondary: string;
  secondaryContainer: string;
  onSecondary: string;

  // chrome
  muted: string;
  mutedForeground: string;
  border: string;
  borderStrong: string;
  input: string;
  ring: string;

  // feedback
  destructive: string;
  destructiveForeground: string;
  success: string;
  warning: string;

  // overlay
  scrim: string;
  overlay: string;
};

export type Palette = typeof palette;
