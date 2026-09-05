import React from 'react';
import { ActivityIndicator, type ViewStyle } from 'react-native';
import { NexaPressable } from '../primitives/NexaPressable';
import { NexaIcon } from '../../icons';
import { useTheme } from '../../theme/useTheme';

export type NexaIconButtonProps = {
  icon: string;
  onPress?: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'soft' | 'solid' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  accessibilityLabel: string;
  accessibilityHint?: string;
  style?: ViewStyle;
};

/**
 * NexaIconButton — square icon-only button with accessible label required.
 */
export function NexaIconButton({
  icon,
  onPress,
  size = 'md',
  variant = 'ghost',
  disabled,
  loading,
  accessibilityLabel,
  accessibilityHint,
  style,
}: NexaIconButtonProps) {
  const { theme } = useTheme();
  const isDisabled = disabled || loading;

  const dims: Record<string, number> = { sm: 32, md: 40, lg: 48 };
  const iconSize: Record<string, any> = { sm: 'sm', md: 'md', lg: 'lg' };
  const dim = dims[size]!;

  const bgMap: Record<string, string> = {
    ghost: 'transparent',
    soft: theme.colors.muted,
    solid: theme.colors.primary,
    outline: 'transparent',
  };
  const borderMap: Record<string, string | undefined> = {
    outline: theme.colors.border,
    ghost: undefined,
    soft: undefined,
    solid: undefined,
  };
  const fgMap: Record<string, string> = {
    ghost: theme.colors.foreground,
    soft: theme.colors.foreground,
    solid: theme.colors.onPrimary,
    outline: theme.colors.foreground,
  };

  return React.createElement(
    NexaPressable,
    {
      disabled: isDisabled,
      onPress: isDisabled ? undefined : onPress,
      accessibilityLabel,
      accessibilityHint,
      accessibilityRole: 'button',
      accessibilityState: { disabled: isDisabled, busy: loading },
      style: [
        {
          width: dim,
          height: dim,
          borderRadius: theme.radius.full,
          backgroundColor: bgMap[variant],
          borderColor: borderMap[variant],
          borderWidth: borderMap[variant] ? 1 : 0,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isDisabled ? theme.opacity.disabled : 1,
        } as ViewStyle,
        style as any,
      ],
    },
    loading
      ? React.createElement(ActivityIndicator, { size: 'small', color: fgMap[variant] })
      : React.createElement(NexaIcon, { name: icon, size: iconSize[size], color: fgMap[variant] })
  );
}

export default NexaIconButton;
