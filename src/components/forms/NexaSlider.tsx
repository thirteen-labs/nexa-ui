import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { NexaText } from '../primitives/NexaText';

export type NexaSliderProps = {
  value: number;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  onValueChange?: (v: number) => void;
  onSlidingComplete?: (v: number) => void;
  disabled?: boolean;
  label?: string;
  showValue?: boolean;
  style?: ViewStyle;
};

/**
 * NexaSlider — accessible slider (progress-style fallback without native deps).
 * For full gesture support, apps can swap in `@react-native-community/slider` via same API.
 * This implementation is JS-only, no native module required.
 */
export function NexaSlider({
  value,
  minimumValue = 0,
  maximumValue = 100,
  disabled,
  label,
  showValue,
  style,
}: NexaSliderProps) {
  const { theme } = useTheme();
  const clamped = Math.min(maximumValue, Math.max(minimumValue, value));
  const pct = ((clamped - minimumValue) / (maximumValue - minimumValue || 1)) * 100;

  return (
    <View
      accessible
      accessibilityLabel={label ?? 'slider'}
      accessibilityRole="adjustable"
      accessibilityValue={{ min: minimumValue, max: maximumValue, now: clamped }}
      accessibilityState={{ disabled }}
      style={[{ gap: 6, opacity: disabled ? theme.opacity.disabled : 1 } as ViewStyle, style]}
    >
      {label || showValue ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {label ? <NexaText variant="labelMedium" color="textSecondary">{label}</NexaText> : <View />}
          {showValue ? <NexaText variant="labelSmall" color="textSecondary">{Math.round(clamped)}</NexaText> : null}
        </View>
      ) : null}
      <View
        style={{
          height: 6,
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
      <View style={{ height: 16, justifyContent: 'center' }}>
        <View
          style={{
            position: 'absolute',
            left: `${pct}%`,
            marginLeft: -8,
            width: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: theme.colors.primary,
            borderWidth: 2,
            borderColor: theme.colors.surface,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 2,
          } as ViewStyle}
        />
      </View>
    </View>
  );
}

export default NexaSlider;
