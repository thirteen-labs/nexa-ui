import React, { useState } from 'react';
import { View, type ViewStyle } from 'react-native';
import { NexaPressable } from '../primitives/NexaPressable';
import { NexaText } from '../primitives/NexaText';
import { NexaIcon } from '../../icons';
import { NexaModal } from '../overlays/NexaModal';
import { useTheme } from '../../theme/useTheme';

export type SelectOption = { label: string; value: string };

export type NexaSelectProps = {
  value?: string;
  placeholder?: string;
  options: SelectOption[];
  onValueChange?: (v: string) => void;
  label?: string;
  style?: ViewStyle;
};

export function NexaSelect({ value, placeholder = 'Select', options, onValueChange, label, style }: NexaSelectProps) {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <>
      {label ? <NexaText variant="labelMedium" color="textSecondary" style={{ marginBottom: 6 } as any}>{label}</NexaText> : null}
      <NexaPressable
        onPress={() => setOpen(true)}
        accessibilityLabel={label ?? placeholder}
        accessibilityRole="button"
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: theme.spacing[3],
            minHeight: 44,
            borderWidth: 1,
            borderColor: theme.colors.input,
            borderRadius: theme.radius.md,
            backgroundColor: theme.colors.surface,
          } as ViewStyle,
          style as any,
        ]}
      >
        <NexaText variant="bodyMedium" color={selected ? 'textPrimary' : 'textTertiary'}>
          {selected?.label ?? placeholder}
        </NexaText>
        <NexaIcon name="chevron-down" size="sm" color={theme.colors.textTertiary} />
      </NexaPressable>
      <NexaModal visible={open} onClose={() => setOpen(false)} title={label ?? placeholder} size="sm">
        <View style={{ gap: 4 }}>
          {options.map((opt) => (
            <NexaPressable
              key={opt.value}
              onPress={() => {
                onValueChange?.(opt.value);
                setOpen(false);
              }}
              style={{
                paddingVertical: 12,
                paddingHorizontal: 12,
                borderRadius: theme.radius.md,
                backgroundColor: opt.value === value ? theme.colors.muted : 'transparent',
              } as ViewStyle}
            >
              <NexaText variant="bodyMedium" color={opt.value === value ? 'primary' : 'textPrimary'}>
                {opt.label}
              </NexaText>
            </NexaPressable>
          ))}
        </View>
      </NexaModal>
    </>
  );
}

// Aliases per spec
export const NexaDropdown = NexaSelect;
export const NexaCombobox = NexaSelect;
export const NexaAutocomplete = NexaSelect;

export default NexaSelect;
