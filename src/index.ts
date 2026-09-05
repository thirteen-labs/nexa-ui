/**
 * NexaUI — Native-first, token-driven UI foundation for the Obsidian ecosystem.
 *
 * @package @obsidian_north/nexaui
 * @phase 1 — architecture, tokens, theme engine
 *
 * @example
 * import { NexaProvider, useTheme, tokens, createTheme } from '@obsidian_north/nexaui';
 */

// ─── Tokens ────────────────────────────────────────────────────────
export * from './tokens';
export { tokens as nexaTokens, default as defaultTokens } from './tokens';

// ─── Theme ─────────────────────────────────────────────────────────
export {
  NexaProvider,
  NexaThemeContext,
  useTheme,
  useColors,
  useTokens,
  useColorSchemeValue,
  lightTheme,
  darkTheme,
  presets,
  getPreset,
  createTheme,
  resolveTheme,
  withOpacity,
  getContrastColor,
  themeTokens,
} from './theme';
export type {
  NexaTheme,
  NexaThemeInput,
  PartialThemeOverride,
  NexaProviderProps,
  ColorScheme,
  SemanticColors,
} from './theme';

// ─── Utils / Hooks / Animations ────────────────────────────────────
export * from './utils';
export * from './hooks';
export * from './animations';
export * from './accessibility';
export * from './icons';

// ─── Components ──────────────────────────────────────────────────────
export * from './components';
