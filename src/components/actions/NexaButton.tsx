import React from 'react';
import { ActivityIndicator, type ViewStyle, type TextStyle } from 'react-native';
import { NexaPressable } from '../primitives/NexaPressable';
import { NexaText } from '../primitives/NexaText';
import { NexaBox } from '../layout/NexaBox';
import { useTheme } from '../../theme/useTheme';
import { NexaIcon } from '../../icons';

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'soft' | 'link' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type NexaButtonProps = {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  onPress?: () => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  style?: ViewStyle;
};

const sizeConfig: Record<ButtonSize, { px: number; py: number; radius: number; fontVariant: any; minH: number }> = {
  sm: { px: 12, py: 6, radius: 8, fontVariant: 'labelMedium', minH: 32 },
  md: { px: 16, py: 10, radius: 12, fontVariant: 'labelLarge', minH: 40 },
  lg: { px: 20, py: 14, radius: 14, fontVariant: 'labelLarge', minH: 48 },
};

/**
 * NexaButton — accessible, theme-aware button.
 * Variants map to semantic colors; sizes to spacing + typography tokens.
 */
export function NexaButton({
  children,
  variant = 'solid',
  size = 'md',
  disabled,
  loading,
  fullWidth,
  icon,
  iconPosition = 'left',
  onPress,
  accessibilityLabel,
  accessibilityHint,
  style,
}: NexaButtonProps) {
  const { theme } = useTheme();
  const cfg = sizeConfig[size];
  const isDisabled = disabled || loading;

  const variantStyles: Record<ButtonVariant, { bg: string; border?: string; text: string }> = {
    solid: { bg: theme.colors.primary, text: theme.colors.onPrimary },
    outline: { bg: 'transparent', border: theme.colors.border, text: theme.colors.foreground },
    ghost: { bg: 'transparent', text: theme.colors.foreground },
    soft: { bg: theme.colors.primaryContainer, text: theme.colors.onPrimaryContainer ?? theme.colors.primary },
    link: { bg: 'transparent', text: theme.colors.primary },
    destructive: { bg: theme.colors.destructive, text: theme.colors.destructiveForeground },
  };

  const v = variantStyles[variant];
  const textColor = v.text;

  return React.createElement(
    NexaPressable,
    {
      disabled: isDisabled,
      accessibilityLabel,
      accessibilityHint,
      accessibilityRole: 'button',
      accessibilityState: { disabled: isDisabled, busy: loading },
      onPress: isDisabled ? undefined : onPress,
      style: [
        {
          backgroundColor: v.bg,
          borderColor: v.border,
          borderWidth: v.border ? 1 : 0,
          borderRadius: cfg.radius,
          paddingHorizontal: cfg.px,
          paddingVertical: cfg.py,
          minHeight: cfg.minH,
          opacity: isDisabled ? theme.opacity.disabled : 1,
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: 8,
        } as ViewStyle,
        style as any,
      ],
    },
    loading
      ? React.createElement(ActivityIndicator, { size: 'small', color: textColor })
      : React.createElement(
          React.Fragment,
          null,
          icon && iconPosition === 'left'
            ? React.createElement(NexaIcon, { name: icon, size: size === 'sm' ? 'sm' : 'md', color: textColor })
            : null,
          typeof children === 'string'
            ? React.createElement(NexaText, { variant: cfg.fontVariant as any, color: textColor as any }, children)
            : children,
          icon && iconPosition === 'right'
            ? React.createElement(NexaIcon, { name: icon, size: size === 'sm' ? 'sm' : 'md', color: textColor })
            : null
        )
  );
}

export default NexaButton;
