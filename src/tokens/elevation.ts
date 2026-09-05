import { Platform } from 'react-native';

/**
 * Elevation — cross-platform shadow + android elevation.
 * Level 0 is flat, 5 is highest (modals, sheets).
 * iOS uses shadow*, Android uses elevation.
 */

export type ElevationLevel = 0 | 1 | 2 | 3 | 4 | 5;

export type ElevationToken = {
  elevation: number;
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
};

function createElevation(
  elevation: number,
  y: number,
  blur: number,
  opacity: number
): ElevationToken {
  return {
    elevation,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: y },
    shadowOpacity: opacity,
    shadowRadius: blur,
  };
}

export const elevation: Record<ElevationLevel, ElevationToken> = {
  0: createElevation(0, 0, 0, 0),
  1: createElevation(1, 1, 3, 0.08),
  2: createElevation(3, 2, 8, 0.12),
  3: createElevation(6, 4, 16, 0.14),
  4: createElevation(10, 8, 24, 0.16),
  5: createElevation(16, 12, 32, 0.2),
} as const;

/** Helper to strip elevation for bordered/flat variants. */
export const flatElevation = elevation[0];

/** Platform-aware: returns only relevant keys (RN ignores unknown). */
export function getElevation(level: ElevationLevel): ElevationToken {
  return elevation[level];
}

// Re-export for doc generation
export const elevationLevels: ElevationLevel[] = [0, 1, 2, 3, 4, 5];
