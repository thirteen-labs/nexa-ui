import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { NexaPressable } from '../primitives/NexaPressable';
import { NexaText } from '../primitives/NexaText';
import { NexaIcon } from '../../icons';
import { useTheme } from '../../theme/useTheme';

export type BottomBarItem = {
  key: string;
  label: string;
  icon: string;
  active?: boolean;
  badge?: number | string;
  onPress?: () => void;
};

export type NexaBottomBarProps = {
  items: BottomBarItem[];
  style?: ViewStyle;
};

/**
 * NexaBottomBar — bottom tab bar, visual only. App controls navigation.
 */
export function NexaBottomBar({ items, style }: NexaBottomBarProps) {
  const { theme } = useTheme();

  return (
    <View
      accessibilityRole="tablist"
      style={[
        {
          flexDirection: 'row',
          backgroundColor: theme.colors.surface,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          paddingVertical: theme.spacing[1],
          paddingBottom: theme.spacing[2],
        } as ViewStyle,
        style,
      ]}
    >
      {items.map((it) => {
        const active = !!it.active;
        const fg = active ? theme.colors.primary : theme.colors.textSecondary;
        return (
          <NexaPressable
            key={it.key}
            onPress={it.onPress}
            accessibilityLabel={it.label}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            style={{ flex: 1, alignItems: 'center', gap: 2, paddingVertical: 4, opacity: active ? 1 : 0.85 } as ViewStyle}
          >
            <View>
              <NexaIcon name={it.icon} size="md" color={fg} />
              {it.badge !== undefined ? (
                <View
                  style={{
                    position: 'absolute',
                    top: -4,
                    right: -8,
                    minWidth: 16,
                    height: 16,
                    borderRadius: 8,
                    backgroundColor: theme.colors.destructive,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 3,
                  } as ViewStyle}
                >
                  <NexaText variant="caption" style={{ color: '#FFF', fontSize: 9, lineHeight: 10 } as any}>
                    {String(it.badge)}
                  </NexaText>
                </View>
              ) : null}
            </View>
            <NexaText variant="caption" style={{ color: fg, fontSize: 10 } as any}>
              {it.label}
            </NexaText>
          </NexaPressable>
        );
      })}
    </View>
  );
}

export default NexaBottomBar;
