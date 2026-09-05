import React, { useState } from 'react';
import { View, TextInput, type TextInputProps, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { NexaPressable } from '../primitives/NexaPressable';
import { NexaIcon } from '../../icons';

export type NexaSearchInputProps = Omit<TextInputProps, 'style'> & {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  placeholder?: string;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  style?: any;
};

/**
 * NexaSearchInput — search field with search icon + clear button.
 */
export function NexaSearchInput({
  value,
  onChangeText,
  onClear,
  placeholder = 'Search',
  disabled,
  containerStyle,
  style,
  ...rest
}: NexaSearchInputProps) {
  const { theme } = useTheme();
  const [focused, setFocused] = useState(false);
  const borderColor = focused ? theme.colors.ring : theme.colors.input;

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          backgroundColor: theme.colors.surface,
          borderColor,
          borderWidth: 1,
          borderRadius: theme.radius.full,
          paddingHorizontal: theme.spacing[3],
          minHeight: 44,
          opacity: disabled ? theme.opacity.disabled : 1,
        } as ViewStyle,
        containerStyle as any,
      ]}
    >
      <NexaIcon name="search" size="sm" color={theme.colors.textTertiary} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textTertiary}
        editable={!disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        accessibilityLabel={placeholder}
        accessibilityRole="search"
        style={[{ flex: 1, color: theme.colors.foreground, fontSize: 14, paddingVertical: 10 } as any, style]}
        {...rest}
      />
      {value.length > 0 ? (
        <NexaPressable
          onPress={() => {
            onChangeText('');
            onClear?.();
          }}
          accessibilityLabel="Clear search"
          accessibilityRole="button"
          style={{ padding: 4 } as ViewStyle}
        >
          <NexaIcon name="x" size="sm" color={theme.colors.textTertiary} />
        </NexaPressable>
      ) : null}
    </View>
  );
}

export default NexaSearchInput;
