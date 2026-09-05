import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { NexaText } from '../primitives/NexaText';

export type NexaProgressProps = {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
};

/**
 * NexaProgress — determinate progress bar, theme-aware, accessible.
 */
export function NexaProgress({ value, max = 100, label, showValue, size = 'md', style }: NexaProgressProps) {
  const { theme } = useTheme();
  const pct = Math.max(0, Math.min(100, (value / (max || 100)) * 100));
  const h = size === 'sm' ? 4 : size === 'lg' ? 10 : 6;

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max, now: value }}
      style={[{ gap: 6 } as ViewStyle, style]}
    >
      {label || showValue ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {label ? <NexaText variant="labelSmall" color="textSecondary">{label}</NexaText> : <View />}
          {showValue ? <NexaText variant="caption" color="textSecondary">{Math.round(pct)}%</NexaText> : null}
        </View>
      ) : null}
      <View
        style={{
          height: h,
          borderRadius: theme.radius.full,
          backgroundColor: theme.colors.muted,
          overflow: 'hidden',
        } as ViewStyle}
      >
        <View
          style={{
            width: `${pct}%`,
            height: '100%',
            backgroundColor: theme.colors.primary,
            borderRadius: theme.radius.full,
          } as ViewStyle}
        />
      </View>
    </View>
  );
}

export default NexaProgress;
