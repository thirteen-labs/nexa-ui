import { palette } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamily, textVariants } from '../../tokens/typography';
import { elevation } from '../../tokens/elevation';
import { opacity } from '../../tokens/opacity';
import { duration, spring } from '../../tokens/animation';
import type { NexaTheme } from '../types';

/**
 * Dark preset — Obsidian foundation.
 * Warm neutrals, violet primary, elevated surfaces use subtle lighten.
 */
export const darkTheme: NexaTheme = {
  scheme: 'dark',
  isDark: true,
  colors: {
    background: palette.obsidian[950],
    foreground: palette.obsidian[50],
    surface: palette.obsidian[900],
    surfaceVariant: palette.obsidian[800],
    surfaceElevated: palette.obsidian[800],

    textPrimary: palette.obsidian[50],
    textSecondary: palette.obsidian[300],
    textTertiary: palette.obsidian[500],
    textInverse: palette.obsidian[900],

    primary: palette.violet[500],
    primaryContainer: palette.violet[900],
    onPrimary: '#FFFFFF',
    onPrimaryContainer: palette.violet[100],

    secondary: palette.obsidian[100],
    secondaryContainer: palette.obsidian[800],
    onSecondary: palette.obsidian[900],

    muted: palette.obsidian[800],
    mutedForeground: palette.obsidian[400],
    border: palette.obsidian[800],
    borderStrong: palette.obsidian[700],
    input: palette.obsidian[800],
    ring: palette.violet[500],

    destructive: palette.red[500],
    destructiveForeground: '#FFFFFF',
    success: palette.emerald[500],
    warning: palette.amber[500],

    scrim: 'rgba(0,0,0,0.56)',
    overlay: 'rgba(0,0,0,0.64)',
  },
  spacing,
  radius,
  typography: {
    fontFamily,
    textVariants,
  },
  elevation,
  opacity,
  animation: {
    duration,
    spring,
  },
};
