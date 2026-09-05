export { lightTheme } from './light';
export { darkTheme } from './dark';

import { lightTheme } from './light';
import { darkTheme } from './dark';
import type { ColorScheme } from '../types';

export const presets: Record<ColorScheme, typeof lightTheme> = {
  light: lightTheme,
  dark: darkTheme,
};

export function getPreset(scheme: ColorScheme) {
  return presets[scheme];
}
