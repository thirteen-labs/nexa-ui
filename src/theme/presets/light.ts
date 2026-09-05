import { palette } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamily, textVariants } from '../../tokens/typography';
import { elevation } from '../../tokens/elevation';
import { opacity } from '../../tokens/opacity';
import { duration, spring } from '../../tokens/animation';
import type { NexaTheme } from '../types';

export const lightTheme: NexaTheme = {
  scheme: 'light',
  isDark: false,
  colors: {
    background: '#FFFFFF',
    foreground: palette.obsidian[900],
    surface: '#FFFFFF',
    surfaceVariant: palette.obsidian[100],
    surfaceElevated: '#FFFFFF',

    textPrimary: palette.obsidian[900],
    textSecondary: palette.obsidian[600],
    textTertiary: palette.obsidian[400],
    textInverse: '#FFFFFF',

    primary: palette.violet[600],
    primaryContainer: palette.violet[100],
    onPrimary: '#FFFFFF',
    onPrimaryContainer: palette.violet[900],

    secondary: palette.obsidian[800],
    secondaryContainer: palette.obsidian[100],
    onSecondary: '#FFFFFF',

    muted: palette.obsidian[100],
    mutedForeground: palette.obsidian[500],
    border: palette.obsidian[200],
    borderStrong: palette.obsidian[300],
    input: palette.obsidian[200],
    ring: palette.violet[600],

    destructive: palette.red[600],
    destructiveForeground: '#FFFFFF',
    success: palette.emerald[600],
    warning: palette.amber[600],

    scrim: 'rgba(0,0,0,0.32)',
    overlay: 'rgba(12,10,9,0.48)',
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
