import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { NexaText } from '../primitives/NexaText';

export type NexaPanelProps = {
  children?: React.ReactNode;
  title?: string;
  style?: ViewStyle;
};

export function NexaPanel({ children, title, style }: NexaPanelProps) {
  const { theme } = useTheme();
  return (
    <View style={[{ backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.lg, overflow: 'hidden' } as ViewStyle, style]}>
      {title ? (
        <View style={{ padding: theme.spacing[3], borderBottomWidth: 1, borderBottomColor: theme.colors.border, backgroundColor: theme.colors.surfaceVariant }}>
          <NexaText variant="labelLarge">{title}</NexaText>
        </View>
      ) : null}
      <View style={{ padding: theme.spacing[4] }}>{children}</View>
    </View>
  );
}

export function NexaSection({ children, title, style }: NexaPanelProps) {
  const { theme } = useTheme();
  return (
    <View style={[{ gap: theme.spacing[3] } as ViewStyle, style]}>
      {title ? <NexaText variant="titleSmall" color="textSecondary">{title}</NexaText> : null}
      {children}
    </View>
  );
}

export default NexaPanel;
