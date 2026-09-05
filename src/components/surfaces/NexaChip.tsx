import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { NexaPressable } from '../primitives/NexaPressable';
import { NexaText } from '../primitives/NexaText';
import { NexaIcon } from '../../icons';
import { useTheme } from '../../theme/useTheme';

export type NexaChipProps = {
  children?: React.ReactNode;
  label: string;
  icon?: string;
  selected?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  onDelete?: () => void;
  variant?: 'filled' | 'outline' | 'soft';
  size?: 'sm' | 'md';
  style?: ViewStyle;
};

/**
 * NexaChip — selectable/filter tag. Accessible, theme-aware.
 */
export function NexaChip({
  label,
  icon,
  selected,
  disabled,
  onPress,
  onDelete,
  variant = 'soft',
  size = 'md',
  style,
  children,
}: NexaChipProps) {
  const { theme } = useTheme();
  const isInteractive = !!onPress || selected !== undefined;
  const isSmall = size === 'sm';

  const baseStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: isSmall ? 10 : 12,
    paddingVertical: isSmall ? 4 : 6,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    opacity: disabled ? theme.opacity.disabled : 1,
    alignSelf: 'flex-start',
  };

  let bg: string;
  let fg: string;
  let border: string | undefined;

  if (selected) {
    bg = theme.colors.primary;
    fg = theme.colors.onPrimary;
    border = theme.colors.primary;
  } else if (variant === 'filled') {
    bg = theme.colors.surfaceVariant;
    fg = theme.colors.foreground;
    border = theme.colors.border;
  } else if (variant === 'outline') {
    bg = 'transparent';
    fg = theme.colors.foreground;
    border = theme.colors.borderStrong;
  } else {
    bg = theme.colors.muted;
    fg = theme.colors.mutedForeground;
    border = theme.colors.muted;
  }

  const content = (
    <>
      {icon ? <NexaIcon name={icon} size={isSmall ? 'sm' : 'md'} color={fg} /> : null}
      <NexaText variant={isSmall ? 'labelSmall' : 'labelMedium'} style={{ color: fg } as any}>
        {label}
      </NexaText>
      {children}
      {onDelete ? (
        <NexaPressable
          onPress={onDelete}
          accessibilityLabel={`Remove ${label}`}
          accessibilityRole="button"
          style={{ marginLeft: 2, opacity: disabled ? 0.5 : 1 } as ViewStyle}
        >
          <NexaIcon name="x" size="sm" color={fg} />
        </NexaPressable>
      ) : null}
    </>
  );

  if (isInteractive) {
    return (
      <NexaPressable
        disabled={disabled}
        onPress={onPress}
        accessibilityLabel={label}
        accessibilityRole="button"
        accessibilityState={{ selected, disabled }}
        style={[baseStyle, { backgroundColor: bg, borderColor: border } as ViewStyle, style as any]}
      >
        {content}
      </NexaPressable>
    );
  }

  return (
    <View style={[baseStyle, { backgroundColor: bg, borderColor: border } as ViewStyle, style]} accessibilityLabel={label}>
      {content}
    </View>
  );
}

export default NexaChip;
