import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { NexaPressable } from '../primitives/NexaPressable';
import { NexaText } from '../primitives/NexaText';
import { NexaIcon } from '../../icons';
import { useTheme } from '../../theme/useTheme';

export type Crumb = { label: string; onPress?: () => void };

export type NexaBreadcrumbProps = {
  items: Crumb[];
  style?: ViewStyle;
};

export function NexaBreadcrumb({ items, style }: NexaBreadcrumbProps) {
  const { theme } = useTheme();
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 4 } as ViewStyle, style]}>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {it.onPress ? (
            <NexaPressable onPress={it.onPress} accessibilityLabel={it.label} accessibilityRole="link">
              <NexaText variant="labelSmall" color={i === items.length - 1 ? 'textPrimary' : 'primary'}>
                {it.label}
              </NexaText>
            </NexaPressable>
          ) : (
            <NexaText variant="labelSmall" color={i === items.length - 1 ? 'textPrimary' : 'textSecondary'}>
              {it.label}
            </NexaText>
          )}
          {i < items.length - 1 ? <NexaIcon name="chevron-right" size="xs" color={theme.colors.textTertiary} /> : null}
        </React.Fragment>
      ))}
    </View>
  );
}

export default NexaBreadcrumb;
