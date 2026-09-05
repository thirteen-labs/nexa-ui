import React, { useState } from 'react';
import {
  View,
  TextInput,
  type TextInputProps,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { NexaText } from '../primitives/NexaText';

export type NexaInputProps = Omit<TextInputProps, 'style'> & { style?: any;
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  disabled?: boolean;
};

/**
 * NexaInput — accessible, theme-aware text field.
 * Handles label, helper, error, focus ring, and disabled states.
 */
export function NexaInput({
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  disabled,
  editable,
  placeholderTextColor,
  onFocus,
  onBlur,
  style,
  ...rest
}: NexaInputProps) {
  const { theme } = useTheme();
  const [focused, setFocused] = useState(false);
  const isError = !!error;
  const isDisabled = disabled || editable === false;

  const borderColor = isError
    ? theme.colors.destructive
    : focused
      ? theme.colors.ring
      : theme.colors.input;

  return React.createElement(
    View,
    { style: [containerStyle as any] },
    label
      ? React.createElement(NexaText, { variant: 'labelMedium', color: isError ? 'destructive' : 'textSecondary', style: { marginBottom: 6 } as any }, label)
      : null,
    React.createElement(
      View,
      {
        style: [
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            backgroundColor: theme.colors.surface,
            borderColor,
            borderWidth: 1,
            borderRadius: theme.radius.md,
            paddingHorizontal: theme.spacing[3],
            minHeight: 44,
            opacity: isDisabled ? theme.opacity.disabled : 1,
          } as ViewStyle,
          style as any,
        ],
      },
      leftIcon ?? null,
      React.createElement(TextInput, {
        editable: !isDisabled,
        placeholderTextColor: placeholderTextColor ?? theme.colors.textTertiary,
        style: [
          {
            flex: 1,
            color: theme.colors.foreground,
            fontSize: 14,
            paddingVertical: 10,
          } as TextStyle,
          inputStyle as any,
        ],
        onFocus: (e: any) => {
          setFocused(true);
          onFocus?.(e);
        },
        onBlur: (e: any) => {
          setFocused(false);
          onBlur?.(e);
        },
        accessibilityLabel: label,
        ...rest,
      }),
      rightIcon ?? null
    ),
    error
      ? React.createElement(NexaText, { variant: 'caption', color: 'destructive', style: { marginTop: 6 } as any }, error)
      : helperText
        ? React.createElement(NexaText, { variant: 'caption', color: 'textTertiary', style: { marginTop: 6 } as any }, helperText)
        : null
  );
}

export default NexaInput;
