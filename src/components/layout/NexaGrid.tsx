import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';

export type NexaGridProps = {
  children?: React.ReactNode;
  columns?: number;
  gap?: number | string;
  style?: ViewStyle;
};

/**
 * NexaGrid — simple responsive grid via flex wrap.
 * columns: number of columns (2-6)
 */
export function NexaGrid({ children, columns = 2, gap = 3, style }: NexaGridProps) {
  const { theme } = useTheme();
  const gapVal = typeof gap === 'number' ? (theme.spacing as any)[gap] ?? gap : (theme.spacing as any)[gap] ?? 12;
  const childArray = React.Children.toArray(children);

  return (
    <View style={[{ flexDirection: 'row', flexWrap: 'wrap', margin: -gapVal / 2 } as ViewStyle, style]}>
      {childArray.map((child, i) => (
        <View key={i} style={{ width: `${100 / columns}%`, padding: gapVal / 2 } as ViewStyle}>
          {child as any}
        </View>
      ))}
    </View>
  );
}

export function NexaWrap({ children, gap = 2, style }: { children?: React.ReactNode; gap?: number | string; style?: ViewStyle }) {
  const { theme } = useTheme();
  const gapVal = typeof gap === 'number' ? (theme.spacing as any)[gap] ?? gap : (theme.spacing as any)[gap] ?? 8;
  return <View style={[{ flexDirection: 'row', flexWrap: 'wrap', gap: gapVal } as ViewStyle, style]}>{children}</View>;
}

export default NexaGrid;
