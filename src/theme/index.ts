export { NexaProvider, NexaThemeContext } from './provider';
export type { NexaThemeContextValue } from './provider';

export { useTheme, useColors, useTokens, useColorSchemeValue } from './useTheme';

export { lightTheme } from './presets/light';
export { darkTheme } from './presets/dark';
export { presets, getPreset } from './presets';

export { createTheme, resolveTheme, withOpacity, getContrastColor } from './utilities';

export type {
  NexaTheme,
  NexaThemeInput,
  PartialThemeOverride,
  NexaProviderProps,
  ColorScheme,
  SemanticColors,
} from './types';

export { themeTokens } from './tokens';
export type { FontFamily, TextVariants, DurationScale, SpringScale } from './tokens';
