import React, { createContext, useContext } from 'react';
import { View, type ViewStyle } from 'react-native';
import { NexaPressable } from '../primitives/NexaPressable';
import { NexaText } from '../primitives/NexaText';
import { useTheme } from '../../theme/useTheme';

type RadioContextValue = {
  value?: string;
  onChange?: (v: string) => void;
  disabled?: boolean;
};

const RadioGroupContext = createContext<RadioContextValue>({});

export type NexaRadioGroupProps = {
  children?: React.ReactNode;
  value?: string;
  onValueChange?: (v: string) => void;
  disabled?: boolean;
  style?: ViewStyle;
};

export function NexaRadioGroup({ children, value, onValueChange, disabled, style }: NexaRadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ value, onChange: onValueChange, disabled }}>
      <View style={[{ gap: 8 } as ViewStyle, style]}>{children}</View>
    </RadioGroupContext.Provider>
  );
}

export type NexaRadioProps = {
  value: string;
  label?: string;
  disabled?: boolean;
  checked?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
};

export function NexaRadio({ value, label, disabled, checked: controlledChecked, onPress, style }: NexaRadioProps) {
  const { theme } = useTheme();
  const ctx = useContext(RadioGroupContext);
  const isDisabled = disabled || ctx.disabled;
  const isChecked = controlledChecked ?? ctx.value === value;

  const handlePress = () => {
    if (isDisabled) return;
    if (onPress) onPress();
    else ctx.onChange?.(value);
  };

  return (
    <NexaPressable
      disabled={isDisabled}
      onPress={handlePress}
      accessibilityLabel={label ?? value}
      accessibilityRole="radio"
      accessibilityState={{ selected: isChecked, disabled: isDisabled }}
      style={[{ flexDirection: 'row', alignItems: 'center', gap: 8, opacity: isDisabled ? theme.opacity.disabled : 1 } as ViewStyle, style as any]}
    >
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          borderWidth: 1.5,
          borderColor: isChecked ? theme.colors.primary : theme.colors.borderStrong,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
        } as ViewStyle}
      >
        {isChecked ? (
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: theme.colors.primary,
            } as ViewStyle}
          />
        ) : null}
      </View>
      {label ? <NexaText variant="bodyMedium">{label}</NexaText> : null}
    </NexaPressable>
  );
}

export default NexaRadio;
