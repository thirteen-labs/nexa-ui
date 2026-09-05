import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';

export type NexaDividerProps = {
  orientation?: 'horizontal' | 'vertical';
  color?: string;
  thickness?: number;
  style?: ViewStyle;
};

/**
 * NexaDivider — semantic separator.
 */
export function NexaDivider({ orientation = 'horizontal', color, thickness = 1, style }: NexaDividerProps) {
  const { theme } = useTheme();
  const bg = color ?? theme.colors.border;
  const dividerStyle: ViewStyle =
    orientation === 'horizontal'
      ? { height: thickness, backgroundColor: bg, width: '100%' }
      : { width: thickness, backgroundColor: bg, alignSelf: 'stretch' };

  return React.createElement(View, { style: [dividerStyle, style as any] });
}

export default NexaDivider;
