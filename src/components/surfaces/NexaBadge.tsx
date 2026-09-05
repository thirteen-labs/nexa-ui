import React from 'react';
import { View, type ViewStyle, type TextStyle } from 'react-native';
import { NexaText } from '../primitives/NexaText';
import { useTheme } from '../../theme/useTheme';

export type NexaBadgeProps = {
  children?: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'destructive' | 'outline';
  size?: 'sm' | 'md';
  style?: ViewStyle;
};

/**
 * NexaBadge — small status/label pill.
 */
export function NexaBadge({ children, variant = 'default', size = 'md', style }: NexaBadgeProps) {
  const { theme } = useTheme();

  const variantMap: Record<string, { bg: string; fg: string; border?: string }> = {
    default: { bg: theme.colors.muted, fg: theme.colors.mutedForeground },
    primary: { bg: theme.colors.primary, fg: theme.colors.onPrimary },
    success: { bg: theme.colors.success, fg: '#FFFFFF' },
    warning: { bg: theme.colors.warning, fg: '#FFFFFF' },
    destructive: { bg: theme.colors.destructive, fg: theme.colors.destructiveForeground },
    outline: { bg: 'transparent', fg: theme.colors.foreground, border: theme.colors.border },
  };

  const v = variantMap[variant]!;
  const isSmall = size === 'sm';

  return React.createElement(
    View,
    {
      style: [
        {
          backgroundColor: v.bg,
          borderColor: v.border,
          borderWidth: v.border ? 1 : 0,
          borderRadius: theme.radius.full,
          paddingHorizontal: isSmall ? 8 : 10,
          paddingVertical: isSmall ? 2 : 4,
          alignSelf: 'flex-start',
          alignItems: 'center',
          justifyContent: 'center',
        } as ViewStyle,
        style as any,
      ],
    },
    typeof children === 'string'
      ? React.createElement(NexaText, { variant: isSmall ? 'labelSmall' : 'labelMedium', color: v.fg as any, style: { color: v.fg } as TextStyle }, children)
      : children
  );
}

export default NexaBadge;
