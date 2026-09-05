/**
 * NexaUI Animations — Phase 3
 * Token re-exports + motion helpers (reduce-motion aware).
 */
export { duration, easing, easingFn, spring } from '../tokens/animation';
export type { DurationKey, EasingKey, SpringKey } from '../tokens/animation';

import { AccessibilityInfo } from 'react-native';
import { duration } from '../tokens/animation';

/**
 * Respect OS Reduce Motion setting.
 * Returns true if user prefers reduced motion.
 */
export async function prefersReducedMotion(): Promise<boolean> {
  try {
    const reduce = await (AccessibilityInfo as any).isReduceMotionEnabled?.();
    return !!reduce;
  } catch {
    return false;
  }
}

/**
 * motion — convenience factory for Animated/Reanimated configs.
 * Maps token durations to timing configs.
 */
export const motion = {
  instant: { duration: duration.instant },
  fast: { duration: duration.fast },
  normal: { duration: duration.normal },
  medium: { duration: duration.medium },
  slow: { duration: duration.slow },
  spring: { damping: 18, stiffness: 220, mass: 1 },
} as const;

/** Preset transitions for overlay enter/exit */
export const transitions = {
  fade: { from: { opacity: 0 }, to: { opacity: 1 } },
  slide: { from: { translateY: 16, opacity: 0 }, to: { translateY: 0, opacity: 1 } },
  scale: { from: { scale: 0.96, opacity: 0 }, to: { scale: 1, opacity: 1 } },
} as const;
