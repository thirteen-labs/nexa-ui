import React, { createContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import type { NexaProviderProps, NexaTheme, ColorScheme } from './types';
import { resolveTheme } from './utilities';

export type NexaThemeContextValue = {
  theme: NexaTheme;
  /** Raw scheme string the theme was resolved from */
  scheme: ColorScheme;
  isDark: boolean;
  /** Semantic colors shortcut — theme.colors */
  colors: NexaTheme['colors'];
  /** Raw tokens shortcut — theme.spacing / radius / typography ... */
  tokens: Omit<NexaTheme, 'colors' | 'scheme' | 'isDark'> & { colors: NexaTheme['colors'] };
};

export const NexaThemeContext = createContext<NexaThemeContextValue | null>(null);

/**
 * NexaProvider — theme engine root.
 *
 * @example
 * <NexaProvider theme="dark"><App /></NexaProvider>
 * <NexaProvider theme="system"><App /></NexaProvider>
 * <NexaProvider theme={customTheme}><App /></NexaProvider>
 * <NexaProvider theme={{ colors: { primary: '#7C3AED' } }}><App /></NexaProvider>
 */
export function NexaProvider({ children, theme: themeInput, followSystem = true }: NexaProviderProps) {
  const systemScheme = useColorScheme() as ColorScheme | null;

  const value = useMemo<NexaThemeContextValue>(() => {
    const resolved = resolveTheme(
      themeInput,
      followSystem ? systemScheme : null
    );

    return {
      theme: resolved,
      scheme: resolved.scheme,
      isDark: resolved.isDark,
      colors: resolved.colors,
      tokens: {
        colors: resolved.colors,
        spacing: resolved.spacing,
        radius: resolved.radius,
        typography: resolved.typography,
        elevation: resolved.elevation,
        opacity: resolved.opacity,
        animation: resolved.animation,
      } as unknown as NexaThemeContextValue['tokens'],
    };
  }, [themeInput, systemScheme, followSystem]);

  return <NexaThemeContext.Provider value={value}>{children}</NexaThemeContext.Provider>;
}

export default NexaProvider;
