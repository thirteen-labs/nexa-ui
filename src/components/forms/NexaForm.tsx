import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { NexaText } from '../primitives/NexaText';
import { useTheme } from '../../theme/useTheme';

export function NexaForm({ children, style }: { children?: React.ReactNode; style?: ViewStyle }) {
  const { theme } = useTheme();
  return <View style={[{ gap: theme.spacing[4] } as ViewStyle, style]}>{children}</View>;
}

export function NexaFormField({ children, style }: { children?: React.ReactNode; style?: ViewStyle }) {
  const { theme } = useTheme();
  return <View style={[{ gap: 6 } as ViewStyle, style]}>{children}</View>;
}

export function NexaFormLabel({ children }: { children: React.ReactNode }) {
  return <NexaText variant="labelMedium" color="textSecondary">{children}</NexaText>;
}

export function NexaFormError({ children }: { children: React.ReactNode }) {
  return <NexaText variant="caption" color="destructive">{children}</NexaText>;
}

export function NexaFormHelper({ children }: { children: React.ReactNode }) {
  return <NexaText variant="caption" color="textTertiary">{children}</NexaText>;
}

export default NexaForm;
