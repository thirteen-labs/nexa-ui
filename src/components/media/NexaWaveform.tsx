import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';

export type NexaWaveformProps = {
  /** Normalized amplitudes 0-1 */
  data?: number[];
  /** Progress 0-1 for played portion */
  progress?: number;
  barCount?: number;
  barWidth?: number;
  gap?: number;
  height?: number;
  style?: ViewStyle;
};

/**
 * NexaWaveform — lightweight waveform visualization (no SVG/Reanimated required).
 * Renders bars via Views; apps feed amplitudes from audio analysis.
 */
export function NexaWaveform({ data, progress = 0, barCount = 32, barWidth = 3, gap = 3, height = 48, style }: NexaWaveformProps) {
  const { theme } = useTheme();
  const bars = data && data.length > 0 ? data.slice(0, barCount) : Array.from({ length: barCount }, () => 0.3 + Math.random() * 0.7);
  const activeCount = Math.floor(bars.length * Math.max(0, Math.min(1, progress)));

  return (
    <View
      accessible
      accessibilityLabel="Waveform"
      accessibilityRole="image"
      style={[{ flexDirection: 'row', alignItems: 'center', gap, height, overflow: 'hidden' } as ViewStyle, style]}
    >
      {bars.map((v, i) => {
        const h = Math.max(4, Math.round(v * height));
        const active = i < activeCount;
        return (
          <View
            key={i}
            style={{
              width: barWidth,
              height: h,
              borderRadius: barWidth / 2,
              backgroundColor: active ? theme.colors.primary : theme.colors.muted,
            } as ViewStyle}
          />
        );
      })}
    </View>
  );
}

export function NexaSpectrum(props: NexaWaveformProps) {
  return <NexaWaveform {...props} height={64} barCount={40} barWidth={2} />;
}

export default NexaWaveform;
