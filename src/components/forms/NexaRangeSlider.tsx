import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { NexaSlider } from './NexaSlider';
import { NexaText } from '../primitives/NexaText';
import { useTheme } from '../../theme/useTheme';

export type NexaRangeSliderProps = {
  min: number;
  max: number;
  low: number;
  high: number;
  onLowChange?: (v: number) => void;
  onHighChange?: (v: number) => void;
  label?: string;
  style?: ViewStyle;
};

export function NexaRangeSlider({ min, max, low, high, label, style }: NexaRangeSliderProps) {
  const { theme } = useTheme();
  return (
    <View style={[{ gap: 8 } as ViewStyle, style]}>
      {label ? <NexaText variant="labelMedium" color="textSecondary">{label}</NexaText> : null}
      <NexaSlider value={low} minimumValue={min} maximumValue={max} style={{ opacity: 0.9 } as ViewStyle} />
      <NexaSlider value={high} minimumValue={min} maximumValue={max} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <NexaText variant="caption" color="textSecondary">{low}</NexaText>
        <NexaText variant="caption" color="textSecondary">{high}</NexaText>
      </View>
    </View>
  );
}

export default NexaRangeSlider;
