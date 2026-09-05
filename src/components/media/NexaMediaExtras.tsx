import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { NexaText } from '../primitives/NexaText';
import { NexaSlider } from '../forms/NexaSlider';
import { NexaIcon } from '../../icons';
import { useTheme } from '../../theme/useTheme';
import { NexaPressable } from '../primitives/NexaPressable';

export type NexaVolumeControlProps = {
  value: number;
  onValueChange?: (v: number) => void;
  muted?: boolean;
  onMuteToggle?: () => void;
  style?: ViewStyle;
};

export function NexaVolumeControl({ value, onValueChange, muted, onMuteToggle, style }: NexaVolumeControlProps) {
  const { theme } = useTheme();
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing[2] } as ViewStyle, style]}>
      <NexaPressable onPress={onMuteToggle} accessibilityLabel={muted ? 'Unmute' : 'Mute'} accessibilityRole="button">
        <NexaIcon name={muted || value === 0 ? 'volume-off' : value < 50 ? 'volume-low' : 'volume-high'} size="sm" color={theme.colors.textSecondary} />
      </NexaPressable>
      <View style={{ flex: 1 }}>
        <NexaSlider value={muted ? 0 : value} minimumValue={0} maximumValue={100} onValueChange={onValueChange} />
      </View>
    </View>
  );
}

export function NexaVisualizer({ style }: { style?: ViewStyle }) {
  const { theme } = useTheme();
  return (
    <View style={[{ height: 48, flexDirection: 'row', alignItems: 'center', gap: 2, justifyContent: 'center' } as ViewStyle, style]}>
      {Array.from({ length: 24 }).map((_, i) => (
        <View key={i} style={{ width: 3, height: 12 + Math.random() * 28, borderRadius: 2, backgroundColor: theme.colors.primary, opacity: 0.7 + Math.random() * 0.3 } as ViewStyle} />
      ))}
    </View>
  );
}

export function NexaLyrics({ lines, activeIndex = 0, style }: { lines: string[]; activeIndex?: number; style?: ViewStyle }) {
  const { theme } = useTheme();
  return (
    <View style={[{ gap: theme.spacing[2], padding: theme.spacing[3] } as ViewStyle, style]}>
      {lines.map((line, i) => (
        <NexaText key={i} variant={i === activeIndex ? 'titleSmall' : 'bodySmall'} color={i === activeIndex ? 'primary' : 'textSecondary'} align="center">
          {line}
        </NexaText>
      ))}
    </View>
  );
}

export function NexaQueue({ items, onSelect, style }: { items: Array<{ id: string; title: string; subtitle?: string }>; onSelect?: (id: string) => void; style?: ViewStyle }) {
  const { theme } = useTheme();
  return (
    <View style={[{ gap: 1, backgroundColor: theme.colors.border, borderRadius: theme.radius.md, overflow: 'hidden' } as ViewStyle, style]}>
      {items.map((it) => (
        <NexaPressable key={it.id} onPress={() => onSelect?.(it.id)} style={{ backgroundColor: theme.colors.surface, padding: theme.spacing[3], gap: 2 } as ViewStyle}>
          <NexaText variant="labelMedium">{it.title}</NexaText>
          {it.subtitle ? <NexaText variant="caption" color="textSecondary">{it.subtitle}</NexaText> : null}
        </NexaPressable>
      ))}
    </View>
  );
}

export default NexaVolumeControl;
