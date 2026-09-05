import React, { useState } from 'react';
import { View, type ViewStyle } from 'react-native';
import { NexaPressable } from '../primitives/NexaPressable';
import { NexaText } from '../primitives/NexaText';
import { NexaIcon } from '../../icons';
import { useTheme } from '../../theme/useTheme';

export type NexaAccordionProps = {
  title: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  style?: ViewStyle;
};

export function NexaAccordion({ title, children, defaultOpen = false, style }: NexaAccordionProps) {
  const { theme } = useTheme();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <View style={[{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.md, overflow: 'hidden' } as ViewStyle, style]}>
      <NexaPressable
        onPress={() => setOpen((v) => !v)}
        accessibilityLabel={title}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: theme.spacing[3], backgroundColor: theme.colors.surface } as ViewStyle}
      >
        <NexaText variant="labelMedium">{title}</NexaText>
        <NexaIcon name={open ? 'chevron-up' : 'chevron-down'} size="sm" color={theme.colors.textTertiary} />
      </NexaPressable>
      {open ? <View style={{ padding: theme.spacing[3], borderTopWidth: 1, borderTopColor: theme.colors.border }}>{children}</View> : null}
    </View>
  );
}

export const NexaDisclosure = NexaAccordion;

export default NexaAccordion;
