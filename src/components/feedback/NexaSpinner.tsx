import React from 'react';
import { ActivityIndicator, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';

export type NexaSpinnerProps = {
  size?: 'sm' | 'md' | 'lg' | number;
  color?: string;
  style?: ViewStyle;
};

/**
 * NexaSpinner — theme-aware activity indicator.
 */
export function NexaSpinner({ size = 'md', color, style }: NexaSpinnerProps) {
  const { theme } = useTheme();
  const sizeMap: Record<string, any> = { sm: 'small', md: 'small', lg: 'large' };
  const resolvedSize = typeof size === 'number' ? size : (sizeMap[size] ?? 'small');
  const resolvedColor = color ?? theme.colors.primary;

  // RN ActivityIndicator doesn't expose style for container; wrap if needed
  return React.createElement(ActivityIndicator, {
    size: resolvedSize as any,
    color: resolvedColor,
    style: style as any,
  });
}

export default NexaSpinner;
