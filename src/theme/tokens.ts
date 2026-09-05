/**
 * Theme-bound token aggregates.
 * Thin wrappers so `NexaTheme` stays serializable without importing the whole `src/tokens` barrel.
 */
import { spacing, spacingSemantic } from '../tokens/spacing';
import { radius } from '../tokens/radius';
import {
  fontFamily as rawFontFamily,
  textVariants as rawTextVariants,
  fontSize,
  lineHeight,
  fontWeight,
  letterSpacing,
} from '../tokens/typography';
import { elevation } from '../tokens/elevation';
import { opacity } from '../tokens/opacity';
import { duration, spring } from '../tokens/animation';

export const themeTokens = {
  spacing,
  spacingSemantic,
  radius,
  fontFamily: rawFontFamily,
  textVariants: rawTextVariants,
  fontSize,
  lineHeight,
  fontWeight,
  letterSpacing,
  elevation,
  opacity,
  duration,
  spring,
} as const;

export type FontFamily = typeof rawFontFamily;
export type TextVariants = typeof rawTextVariants;
export type DurationScale = typeof duration;
export type SpringScale = typeof spring;
