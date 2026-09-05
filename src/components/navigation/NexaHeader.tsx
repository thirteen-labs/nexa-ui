import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { NexaText } from '../primitives/NexaText';
import { NexaIconButton } from '../actions/NexaIconButton';
import { useTheme } from '../../theme/useTheme';
import { NexaBox } from '../layout/NexaBox';

export type NexaHeaderProps = {
  title?: string;
  subtitle?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  onBack?: () => void;
  style?: ViewStyle;
  children?: React.ReactNode;
};

/**
 * NexaHeader — top app bar with title, back, and actions.
 * Safe-area agnostic; wraps with NexaBox for token spacing.
 */
export function NexaHeader({ title, subtitle, leading, trailing, onBack, style, children }: NexaHeaderProps) {
  const { theme } = useTheme();

  return (
    <NexaBox
      bg="surface"
      direction="row"
      align="center"
      justify="space-between"
      px={4}
      py={3}
      gap={3}
      style={[{ borderBottomWidth: 1, borderBottomColor: theme.colors.border } as ViewStyle, style]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing[2], flex: 1 }}>
        {onBack ? <NexaIconButton icon="arrow-left" size="sm" variant="ghost" onPress={onBack} accessibilityLabel="Back" /> : leading}
        {title ? (
          <View style={{ flex: 1, gap: 2 }}>
            <NexaText variant="titleMedium" truncate={1}>
              {title}
            </NexaText>
            {subtitle ? (
              <NexaText variant="caption" color="textSecondary" truncate={1}>
                {subtitle}
              </NexaText>
            ) : null}
          </View>
        ) : null}
        {children}
      </View>
      {trailing ? <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>{trailing}</View> : null}
    </NexaBox>
  );
}

export function NexaTopBar(props: NexaHeaderProps) {
  return <NexaHeader {...props} />;
}

export default NexaHeader;
