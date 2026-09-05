/**
 * Accessibility helpers — shared a11y prop builders.
 * Every interactive NexaUI component should spread these.
 */

export type A11yProps = {
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: string;
  accessibilityState?: {
    disabled?: boolean;
    selected?: boolean;
    checked?: boolean | 'mixed';
    busy?: boolean;
    expanded?: boolean;
  };
};

/**
 * Build accessibilityState from common booleans.
 * Keeps component code DRY and ensures VoiceOver/TalkBack parity.
 */
export function a11yState(opts: {
  disabled?: boolean;
  selected?: boolean;
  checked?: boolean | 'mixed';
  busy?: boolean;
  expanded?: boolean;
}): A11yProps['accessibilityState'] | undefined {
  const { disabled, selected, checked, busy, expanded } = opts;
  if (
    disabled === undefined &&
    selected === undefined &&
    checked === undefined &&
    busy === undefined &&
    expanded === undefined
  )
    return undefined;
  return { disabled, selected, checked, busy, expanded };
}
