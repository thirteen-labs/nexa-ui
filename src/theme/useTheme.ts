import { useContext } from 'react';
import { NexaThemeContext, type NexaThemeContextValue } from './provider';

/**
 * Access the current Nexa theme.
 * Must be used within a <NexaProvider>.
 */
export function useTheme(): NexaThemeContextValue {
  const ctx = useContext(NexaThemeContext);
  if (!ctx) {
    throw new Error(
      '[NexaUI] useTheme() must be called within <NexaProvider>. ' +
        'Wrap your app root with <NexaProvider theme="system"> or theme="light" | "dark".'
    );
  }
  return ctx;
}

/**
 * Shorthand — returns only semantic colors.
 */
export function useColors() {
  return useTheme().colors;
}

/**
 * Shorthand — returns design tokens bound to the current theme.
 */
export function useTokens() {
  return useTheme().tokens;
}

/**
 * Returns the active ColorScheme ('light' | 'dark').
 */
export function useColorSchemeValue() {
  return useTheme().scheme;
}
