/**
 * NexaUI Utilities
 */

/** Clamp a number between min and max. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** No-op — useful as default callback. */
export const noop = () => {};

/**
 * Merge style arrays / objects — RN `StyleSheet.flatten` without the import.
 * Filters falsy values and shallow-merges.
 */
export function mergeStyles<T extends object>(...styles: Array<T | false | null | undefined>): T {
  return Object.assign({}, ...styles.filter(Boolean)) as T;
}

/** Check if value is plain object. */
export function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && Object.getPrototypeOf(v) === Object.prototype;
}

export { withOpacity, getContrastColor } from '../theme/utilities';
