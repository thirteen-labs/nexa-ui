import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { NexaPressable } from '../primitives/NexaPressable';
import { NexaIcon } from '../../icons';
import { NexaText } from '../primitives/NexaText';
import { useTheme } from '../../theme/useTheme';

export type NexaFABProps = {
  icon: string;
  label?: string;
  onPress?: () => void;
  size?: 'md' | 'lg';
  variant?: 'primary' | 'surface';
  disabled?: boolean;
  style?: ViewStyle;
  accessibilityLabel?: string;
};

/**
 * NexaFAB — floating action button. Theme-aware, accessible, elevated.
 */
export function NexaFAB({
  icon,
  label,
  onPress,
  size = 'md',
  variant = 'primary',
  disabled,
  style,
  accessibilityLabel,
}: NexaFABProps) {
  const { theme } = useTheme();
  const isExtended = !!label;
  const dim = size === 'lg' ? 56 : 48;

  const bg = variant === 'primary' ? theme.colors.primary : theme.colors.surfaceElevated;
  const fg = variant === 'primary' ? theme.colors.onPrimary : theme.colors.foreground;

  return (
    <View
      style={[
        {
          position: 'absolute',
          bottom: theme.spacing[4],
          right: theme.spacing[4],
          // ensure above content
          zIndex: 10,
        } as ViewStyle,
        style as any,
      ]}
    >
      <NexaPressable
        onPress={onPress}
        disabled={disabled}
        accessibilityLabel={accessibilityLabel ?? label ?? icon}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        style={[
          {
            backgroundColor: bg,
            borderRadius: isExtended ? theme.radius.lg : theme.radius.full,
            height: dim,
            minWidth: isExtended ? dim : dim,
            paddingHorizontal: isExtended ? 16 : 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            opacity: disabled ? theme.opacity.disabled : 1,
          } as ViewStyle,
          theme.elevation[3] as any,
        ]}
      >
        <NexaIcon name={icon} size={size === 'lg' ? 'lg' : 'md'} color={fg} />
        {isExtended ? (
          <NexaText variant="labelLarge" style={{ color: fg } as any}>
            {label}
          </NexaText>
        ) : null}
      </NexaPressable>
    </View>
  );
}

export const NexaFloatingButton = NexaFAB;
export default NexaFAB;
