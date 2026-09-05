import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { NexaPressable } from '../primitives/NexaPressable';
import { NexaText } from '../primitives/NexaText';
import { useTheme } from '../../theme/useTheme';

export type SegmentOption = { value: string; label: string };

export type NexaSegmentedControlProps = {
  options: SegmentOption[];
  value?: string;
  onValueChange?: (v: string) => void;
  style?: ViewStyle;
};

export function NexaSegmentedControl({ options, value, onValueChange, style }: NexaSegmentedControlProps) {
  const { theme } = useTheme();
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          backgroundColor: theme.colors.muted,
          borderRadius: theme.radius.full,
          padding: 2,
          gap: 2,
        } as ViewStyle,
        style,
      ]}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <NexaPressable
            key={opt.value}
            onPress={() => onValueChange?.(opt.value)}
            accessibilityLabel={opt.label}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            style={[
              {
                flex: 1,
                paddingVertical: 6,
                borderRadius: theme.radius.full,
                backgroundColor: active ? theme.colors.surface : 'transparent',
                alignItems: 'center',
              } as ViewStyle,
              active ? (theme.elevation[1] as any) : null,
            ]}
          >
            <NexaText variant="labelSmall" color={active ? 'textPrimary' : 'textSecondary'}>
              {opt.label}
            </NexaText>
          </NexaPressable>
        );
      })}
    </View>
  );
}

export default NexaSegmentedControl;
