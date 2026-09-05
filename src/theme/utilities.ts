import { lightTheme } from './presets/light';
import { darkTheme } from './presets/dark';
import type { NexaTheme, PartialThemeOverride, ColorScheme, NexaThemeInput } from './types';

/**
 * Deep merge utility — merges overrides into a base theme.
 * Only one level of nesting is needed for NexaTheme, so we keep it explicit.
 */
export function createTheme(
  override: PartialThemeOverride & { scheme?: ColorScheme } = {},
  baseScheme: ColorScheme = 'dark'
): NexaTheme {
  const base = baseScheme === 'dark' ? darkTheme : lightTheme;

  const scheme = override.scheme ?? base.scheme;
  const isDark = scheme === 'dark';

  // If scheme switched, start from that preset instead of baseScheme preset
  const schemeBase = scheme === 'dark' ? darkTheme : lightTheme;

  return {
    scheme,
    isDark,
    colors: { ...schemeBase.colors, ...override.colors },
    spacing: { ...schemeBase.spacing, ...override.spacing } as NexaTheme['spacing'],
    radius: { ...schemeBase.radius, ...override.radius } as NexaTheme['radius'],
    typography: {
      fontFamily: {
        ...schemeBase.typography.fontFamily,
        ...override.typography?.fontFamily,
      },
      textVariants: {
        ...schemeBase.typography.textVariants,
        ...override.typography?.textVariants,
      } as NexaTheme['typography']['textVariants'],
    },
    elevation: {
      ...schemeBase.elevation,
      ...override.elevation,
    } as NexaTheme['elevation'],
    opacity: { ...schemeBase.opacity, ...override.opacity } as NexaTheme['opacity'],
    animation: {
      duration: {
        ...schemeBase.animation.duration,
        ...override.animation?.duration,
      },
      spring: {
        ...schemeBase.animation.spring,
        ...override.animation?.spring,
      } as NexaTheme['animation']['spring'],
    },
  };
}

/**
 * Resolve any `NexaThemeInput` into a concrete `NexaTheme`.
 * Handles 'light'|'dark'|'system' strings, full themes, and partial overrides.
 */
export function resolveTheme(
  input: NexaThemeInput | undefined,
  systemScheme: ColorScheme | null | undefined
): NexaTheme {
  const system: ColorScheme = systemScheme === 'dark' || systemScheme === 'light' ? systemScheme : 'dark';

  if (!input || input === 'system') {
    return system === 'dark' ? darkTheme : lightTheme;
  }

  if (typeof input === 'string') {
    // 'light' | 'dark'
    return input === 'dark' ? darkTheme : lightTheme;
  }

  // Heuristic: if object has `colors` + `scheme` + `isDark` + `typography`, treat as full NexaTheme
  if (isFullTheme(input as NexaTheme)) {
    return input as NexaTheme;
  }

  // Otherwise it's a PartialThemeOverride — merge over system base
  return createTheme(input as PartialThemeOverride, system);
}

function isFullTheme(v: NexaTheme): boolean {
  return (
    typeof v === 'object' &&
    v !== null &&
    'colors' in v &&
    'scheme' in v &&
    'isDark' in v &&
    'typography' in v &&
    'spacing' in v
  );
}

/**
 * Small color helpers — no external dependency.
 * Useful for deriving alpha variants without pulling in a color lib.
 */
export function withOpacity(hexOrRgba: string, opacity: number): string {
  const clamped = Math.max(0, Math.min(1, opacity));
  // already rgba
  if (hexOrRgba.startsWith('rgba') || hexOrRgba.startsWith('rgb')) return hexOrRgba;
  // hex
  const hex = hexOrRgba.replace('#', '');
  const full = hex.length === 3 ? hex.split('').map((c) => c + c).join('') : hex;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${clamped})`;
}

/** Returns '#000' or '#FFF' for best contrast on a hex background. */
export function getContrastColor(hex: string): '#000000' | '#FFFFFF' {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16) / 255;
  const g = parseInt(full.slice(2, 4), 16) / 255;
  const b = parseInt(full.slice(4, 6), 16) / 255;
  // relative luminance
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.55 ? '#000000' : '#FFFFFF';
}
