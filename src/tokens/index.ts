/**
 * NexaUI Tokens — single import surface for raw design tokens.
 * Themes compose these into semantic Tailwind-like tokens; components
 * consume via `useTheme().tokens` or `useTokens()`.
 */

export { spacing, spacingSemantic } from './spacing';
export type { SpacingScale, SpacingKey, SpacingSemanticKey } from './spacing';

export { radius } from './radius';
export type { RadiusScale, RadiusKey } from './radius';

export {
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
  letterSpacing,
  textVariants,
} from './typography';
export type { FontFamilyKey, FontSizeKey, TextVariantKey } from './typography';

export { elevation, getElevation, flatElevation, elevationLevels } from './elevation';
export type { ElevationLevel, ElevationToken } from './elevation';

export { opacity } from './opacity';
export type { OpacityScale, OpacityKey } from './opacity';

export { duration, easing, easingFn, spring } from './animation';
export type { DurationKey, EasingKey, SpringKey } from './animation';

export { palette } from './colors';
export type { SemanticColors, Palette } from './colors';

import { spacing, spacingSemantic } from './spacing';
import { radius } from './radius';
import { fontFamily, fontSize, lineHeight, fontWeight, letterSpacing, textVariants } from './typography';
import { elevation } from './elevation';
import { opacity } from './opacity';
import { duration, easing, spring } from './animation';
import { palette } from './colors';

/**
 * Raw token bundle — useful for tooling, documentation, and `createTheme` defaults.
 */
export const tokens = {
  spacing,
  spacingSemantic,
  radius,
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
  letterSpacing,
  textVariants,
  elevation,
  opacity,
  duration,
  easing,
  spring,
  palette,
} as const;

export type Tokens = typeof tokens;
export default tokens;
