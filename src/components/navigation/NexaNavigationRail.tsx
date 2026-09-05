import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { NexaPressable } from '../primitives/NexaPressable';
import { NexaText } from '../primitives/NexaText';
import { NexaIcon } from '../../icons';
import { useTheme } from '../../theme/useTheme';

export type RailItem = { key: string; label: string; icon: string; active?: boolean; onPress?: () => void };

export type NexaNavigationRailProps = {
  items: RailItem[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  style?: ViewStyle;
};

/**
 * NexaNavigationRail — vertical rail for tablets/desktop. Visual only.
 * Phone: use NexaBottomBar; Tablet/Desktop: use rail — same items.
 */
export function NexaNavigationRail({ items, header, footer, style }: NexaNavigationRailProps) {
  const { theme } = useTheme();

  return (
    <View
      accessibilityRole="tablist"
      style={[
        {
          width: 72,
          backgroundColor: theme.colors.surface,
          borderRightWidth: 1,
          borderRightColor: theme.colors.border,
          paddingVertical: theme.spacing[3],
          alignItems: 'center',
          gap: theme.spacing[3],
        } as ViewStyle,
        style,
      ]}
    >
      {header}
      <View style={{ flex: 1, gap: theme.spacing[2], alignItems: 'center' }}>
        {items.map((it) => {
          const active = !!it.active;
          return (
            <NexaPressable
              key={it.key}
              onPress={it.onPress}
              accessibilityLabel={it.label}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              style={[
                {
                  width: 56,
                  paddingVertical: 8,
                  borderRadius: theme.radius.md,
                  backgroundColor: active ? theme.colors.primaryContainer : 'transparent',
                  alignItems: 'center',
                  gap: 4,
                } as ViewStyle,
              ]}
            >
              <NexaIcon name={it.icon} size="md" color={active ? theme.colors.primary : theme.colors.textSecondary} />
              <NexaText variant="caption" style={{ color: active ? theme.colors.primary : theme.colors.textSecondary, fontSize: 10 } as any}>
                {it.label}
              </NexaText>
            </NexaPressable>
          );
        })}
      </View>
      {footer}
    </View>
  );
}

export default NexaNavigationRail;
