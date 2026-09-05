import React from 'react';
import { View, Image, type ViewStyle, type ImageStyle } from 'react-native';
import { NexaText } from '../primitives/NexaText';
import { useTheme } from '../../theme/useTheme';

export type NexaAvatarProps = {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  style?: ViewStyle;
};

/**
 * NexaAvatar — circular avatar with image or initials fallback.
 */
export function NexaAvatar({ src, alt, fallback, size = 'md', style }: NexaAvatarProps) {
  const { theme } = useTheme();
  const sizeMap: Record<string, number> = { sm: 32, md: 40, lg: 56, xl: 72 };
  const dim = typeof size === 'number' ? size : (sizeMap[size] ?? 40);
  const initials = fallback ?? alt?.slice(0, 2).toUpperCase() ?? '?';

  return React.createElement(
    View,
    {
      accessible: true,
      accessibilityLabel: alt ?? fallback ?? 'avatar',
      accessibilityRole: 'image' as const,
      style: [
        {
          width: dim,
          height: dim,
          borderRadius: theme.radius.full,
          backgroundColor: theme.colors.muted,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        } as ViewStyle,
        style as any,
      ],
    },
    src
      ? React.createElement(Image, {
          source: { uri: src },
          accessibilityLabel: alt,
          style: { width: dim, height: dim } as ImageStyle,
        })
      : React.createElement(NexaText, { variant: dim > 48 ? 'titleLarge' : 'labelLarge', color: 'textSecondary' }, initials)
  );
}

export default NexaAvatar;
