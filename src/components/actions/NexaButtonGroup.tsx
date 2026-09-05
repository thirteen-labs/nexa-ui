import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';

export type NexaButtonGroupProps = {
  children?: React.ReactNode;
  gap?: number | string;
  style?: ViewStyle;
};

export function NexaButtonGroup({ children, gap = 2, style }: NexaButtonGroupProps) {
  const { theme } = useTheme();
  const gapVal = typeof gap === 'number' ? (theme.spacing as any)[gap] ?? gap : (theme.spacing as any)[gap] ?? 8;
  return <View style={[{ flexDirection: 'row', gap: gapVal, flexWrap: 'wrap' } as ViewStyle, style]}>{children}</View>;
}

export default NexaButtonGroup;
