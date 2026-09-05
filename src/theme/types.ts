import type { SemanticColors } from '../tokens/colors';
import type { SpacingScale } from '../tokens/spacing';
import type { RadiusScale } from '../tokens/radius';
import type { TextVariants, FontFamily } from './tokens';

import type { ElevationToken } from '../tokens/elevation';
import type { OpacityScale } from '../tokens/opacity';
import type { DurationScale, SpringScale } from './tokens';

/**
 * Canonical theme shape consumed by components via `useTheme()`.
 * Keep this serializable and JSON-clone-friendly.
 */
export type ColorScheme = 'light' | 'dark';

export type NexaTheme = {
  /** Active scheme — determines which semantic colors are resolved */
  scheme: ColorScheme;
  /** Convenience — scheme === 'dark' */
  isDark: boolean;

  /** Semantic colors — the ONLY colors components should read */
  colors: SemanticColors;

  /** Design tokens bound to this theme (overridable per-theme) */
  spacing: SpacingScale;
  radius: RadiusScale;
  typography: {
    fontFamily: FontFamily;
    textVariants: TextVariants;
  };
  elevation: Record<0 | 1 | 2 | 3 | 4 | 5, ElevationToken>;
  opacity: OpacityScale;
  animation: {
    duration: DurationScale;
    spring: SpringScale;
  };
};

/** Input accepted by <NexaProvider theme={...}> */
export type NexaThemeInput =
  | ColorScheme
  | 'system'
  | NexaTheme
  | PartialThemeOverride;

/** Deep partial override shape for `createTheme` / provider */
export type PartialThemeOverride = {
  scheme?: ColorScheme;
  colors?: Partial<SemanticColors>;
  spacing?: Partial<SpacingScale>;
  radius?: Partial<RadiusScale>;
  typography?: {
    fontFamily?: Partial<FontFamily>;
    textVariants?: Partial<TextVariants>;
  };
  elevation?: Partial<Record<0 | 1 | 2 | 3 | 4 | 5, ElevationToken>>;
  opacity?: Partial<OpacityScale>;
  animation?: {
    duration?: Partial<DurationScale>;
    spring?: Partial<SpringScale>;
  };
};

/** Props for NexaProvider */
export type NexaProviderProps = {
  children: React.ReactNode;
  /**
   * Theme selector.
   * - 'light' | 'dark'  — preset
   * - 'system'          — follows OS appearance (default 'system')
   * - NexaTheme object  — fully custom theme
   * - Partial override  — merged over system/light base
   */
  theme?: NexaThemeInput;
  /**
   * When `theme` is 'system' or a partial override without explicit scheme,
   * whether to subscribe to OS appearance changes. Default true.
   */
  followSystem?: boolean;
};

// token type helpers re-exported for convenience
export type { SemanticColors } from '../tokens/colors';
export type { FontFamily, TextVariants, DurationScale, SpringScale } from './tokens';
