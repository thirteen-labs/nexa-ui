import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { NexaPressable } from '../primitives/NexaPressable';
import { NexaText } from '../primitives/NexaText';
import { useTheme } from '../../theme/useTheme';
import { a11yState } from '../../accessibility';

export type NexaCheckboxProps = {
  checked?: boolean;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  style?: ViewStyle;
  accessibilityLabel?: string;
};

/**
 * NexaCheckbox — accessible checkbox with label support.
 * No SVG dependency: checkmark is rendered via text fallback.
 */
export function NexaCheckbox({
  checked,
  indeterminate,
  onCheckedChange,
  label,
  disabled,
  style,
  accessibilityLabel,
}: NexaCheckboxProps) {
  const { theme } = useTheme();
  const isChecked = indeterminate ? false : !!checked;

  return React.createElement(
    NexaPressable,
    {
      disabled,
      accessibilityLabel: accessibilityLabel ?? label ?? 'checkbox',
      accessibilityRole: 'checkbox',
      accessibilityState: a11yState({ disabled, checked: indeterminate ? 'mixed' : isChecked }) as any,
      onPress: disabled ? undefined : () => onCheckedChange?.(!isChecked),
      style: [{ flexDirection: 'row', alignItems: 'center', gap: 8, opacity: disabled ? theme.opacity.disabled : 1 } as ViewStyle, style as any],
    },
    React.createElement(
      View,
      {
        style: {
          width: 20,
          height: 20,
          borderRadius: theme.radius.xs,
          borderWidth: 1.5,
          borderColor: isChecked || indeterminate ? theme.colors.primary : theme.colors.borderStrong,
          backgroundColor: isChecked || indeterminate ? theme.colors.primary : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        } as ViewStyle,
      },
      isChecked
        ? React.createElement(NexaText, { style: { color: theme.colors.onPrimary, fontSize: 12, lineHeight: 12 } as any }, '✓')
        : indeterminate
          ? React.createElement(View, { style: { width: 10, height: 2, backgroundColor: theme.colors.onPrimary, borderRadius: 1 } })
          : null
    ),
    label ? React.createElement(NexaText, { variant: 'bodyMedium' }, label) : null
  );
}

export default NexaCheckbox;
