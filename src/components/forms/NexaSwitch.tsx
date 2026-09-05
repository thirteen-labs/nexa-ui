import React from 'react';
import { Switch as RNSwitch, type SwitchProps, Platform } from 'react-native';
import { useTheme } from '../../theme/useTheme';

export type NexaSwitchProps = SwitchProps & {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

/**
 * NexaSwitch — theme-aware switch.
 * Thin wrapper that maps to semantic colors.
 */
export function NexaSwitch({ checked, value, onCheckedChange, onValueChange, disabled, ...rest }: NexaSwitchProps) {
  const { theme } = useTheme();
  const isChecked = checked ?? value ?? false;

  return React.createElement(RNSwitch, {
    value: isChecked,
    onValueChange: (v: boolean) => {
      onValueChange?.(v);
      onCheckedChange?.(v);
    },
    disabled,
    trackColor: { false: theme.colors.muted, true: theme.colors.primary },
    thumbColor: Platform.OS === 'ios' ? undefined : isChecked ? theme.colors.onPrimary : theme.colors.foreground,
    ios_backgroundColor: theme.colors.muted,
    ...rest,
  });
}

export default NexaSwitch;
