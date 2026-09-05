import React from 'react';
import { Text, type TextStyle } from 'react-native';
import { NexaPressable } from '../primitives/NexaPressable';
import { useTheme } from '../../theme/useTheme';

export type NexaLinkProps = {
  children: React.ReactNode;
  onPress?: () => void;
  href?: string;
  style?: TextStyle;
};

export function NexaLink({ children, onPress, href, style }: NexaLinkProps) {
  const { theme } = useTheme();
  return (
    <NexaPressable onPress={onPress} accessibilityRole="link" accessibilityLabel={typeof children === 'string' ? children : href}>
      <Text style={[{ color: theme.colors.primary, textDecorationLine: 'underline' } as TextStyle, style]}>{children}</Text>
    </NexaPressable>
  );
}

export default NexaLink;
