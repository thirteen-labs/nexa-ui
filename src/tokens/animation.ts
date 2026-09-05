/**
 * Animation tokens — durations, easing curves, and spring presets.
 * Compatible with Animated, Reanimated, and LayoutAnimation.
 */

export const duration = {
  instant: 0,
  fast: 120,
  normal: 200,
  medium: 280,
  slow: 360,
  slower: 480,
  slowest: 720,
} as const;

export const easing = {
  /** Standard — most UI motion */
  standard: 'cubic-bezier(0.2, 0, 0, 1)',
  /** Emphasized — hero / sheet / modal */
  emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
  /** Decelerated — entering */
  enter: 'cubic-bezier(0, 0, 0, 1)',
  /** Accelerated — exiting */
  exit: 'cubic-bezier(0.3, 0, 1, 1)',
  /** Linear */
  linear: 'linear',
  /** iOS spring-ish */
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
} as const;

/** React Native Easing-compatible bezier tuples for Animated/Reanimated. */
export const easingFn = {
  standard: [0.2, 0, 0, 1] as const,
  emphasized: [0.2, 0, 0, 1] as const,
  enter: [0, 0, 0, 1] as const,
  exit: [0.3, 0, 1, 1] as const,
} as const;

/** Reanimated / spring presets */
export const spring = {
  gentle: { damping: 20, stiffness: 120, mass: 1 },
  snappy: { damping: 18, stiffness: 220, mass: 1 },
  bouncy: { damping: 12, stiffness: 180, mass: 1 },
  stiff: { damping: 26, stiffness: 320, mass: 1 },
} as const;

export type DurationKey = keyof typeof duration;
export type EasingKey = keyof typeof easing;
export type SpringKey = keyof typeof spring;
