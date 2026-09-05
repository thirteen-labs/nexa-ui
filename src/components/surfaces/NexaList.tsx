import React from 'react';
import { View, FlatList, type ViewStyle } from 'react-native';
import { NexaDivider } from './NexaDivider';
import { useTheme } from '../../theme/useTheme';
import { NexaPressable } from '../primitives/NexaPressable';
import { NexaText } from '../primitives/NexaText';

export type NexaListProps = {
  children?: React.ReactNode;
  style?: ViewStyle;
};

export function NexaList({ children, style }: NexaListProps) {
  const { theme } = useTheme();
  const arr = React.Children.toArray(children);
  return (
    <View style={[{ backgroundColor: theme.colors.surface, borderRadius: theme.radius.lg, overflow: 'hidden', borderWidth: 1, borderColor: theme.colors.border } as ViewStyle, style]}>
      {arr.map((child, i) => (
        <React.Fragment key={i}>
          {child as any}
          {i < arr.length - 1 ? <NexaDivider /> : null}
        </React.Fragment>
      ))}
    </View>
  );
}

export type NexaListItemProps = {
  title: string;
  subtitle?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
};

export function NexaListItem({ title, subtitle, left, right, onPress, style }: NexaListItemProps) {
  const { theme } = useTheme();
  const content = (
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing[3], padding: theme.spacing[3] } as ViewStyle, style]}>
      {left}
      <View style={{ flex: 1 }}>
        <NexaText variant="labelMedium">{title}</NexaText>
        {subtitle ? <NexaText variant="caption" color="textSecondary">{subtitle}</NexaText> : null}
      </View>
      {right}
    </View>
  );

  if (onPress) {
    return (
      <NexaPressable onPress={onPress} accessibilityLabel={title} accessibilityRole="button">
        {content}
      </NexaPressable>
    );
  }
  return <View>{content}</View>;
}

export const NexaSeparator = NexaDivider;

export default NexaList;
