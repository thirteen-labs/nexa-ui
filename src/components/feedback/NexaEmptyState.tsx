import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { NexaText } from '../primitives/NexaText';
import { NexaIcon } from '../../icons';
import { NexaButton } from '../actions/NexaButton';
import { useTheme } from '../../theme/useTheme';
import { NexaBox } from '../layout/NexaBox';

export type NexaEmptyStateProps = {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  style?: ViewStyle;
};

/**
 * NexaEmptyState — feedback for empty/error states. Accessible, centered, theme-aware.
 */
export function NexaEmptyState({ icon = 'inbox', title, description, actionLabel, onAction, style }: NexaEmptyStateProps) {
  const { theme } = useTheme();
  return (
    <NexaBox align="center" justify="center" p={8} gap={3} style={[{ minHeight: 200 } as ViewStyle, style]}>
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: theme.colors.muted,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 4,
        } as ViewStyle}
      >
        <NexaIcon name={icon} size="lg" color={theme.colors.textSecondary} />
      </View>
      <NexaText variant="titleMedium" align="center">
        {title}
      </NexaText>
      {description ? (
        <NexaText variant="bodySmall" color="textSecondary" align="center" style={{ maxWidth: 320 } as any}>
          {description}
        </NexaText>
      ) : null}
      {actionLabel && onAction ? (
        <View style={{ marginTop: 8 }}>
          <NexaButton variant="soft" onPress={onAction}>
            {actionLabel}
          </NexaButton>
        </View>
      ) : null}
    </NexaBox>
  );
}

export default NexaEmptyState;
