import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { NexaImage } from '../primitives/NexaImage';
import { useTheme } from '../../theme/useTheme';
import { NexaIcon } from '../../icons';

export type NexaAlbumArtProps = {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  radius?: number | string;
  fallbackIcon?: string;
  style?: ViewStyle;
};

/**
 * NexaAlbumArt — square artwork with theme-aware placeholder.
 * UI-only; no player dependency.
 */
export function NexaAlbumArt({ src, alt, size = 'md', radius, fallbackIcon = 'music', style }: NexaAlbumArtProps) {
  const { theme } = useTheme();
  const sizeMap: Record<string, number> = { sm: 56, md: 80, lg: 128, xl: 168 };
  const dim = typeof size === 'number' ? size : (sizeMap[size] ?? 80);

  if (!src) {
    return (
      <View
        accessible
        accessibilityLabel={alt ?? 'album art'}
        accessibilityRole="image"
        style={[
          {
            width: dim,
            height: dim,
            borderRadius: typeof radius === 'number' ? radius : radius ? (theme.radius as any)[radius] : theme.radius.md,
            backgroundColor: theme.colors.surfaceVariant,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          } as ViewStyle,
          style,
        ]}
      >
        <NexaIcon name={fallbackIcon} size={dim > 100 ? 'xl' : dim > 70 ? 'lg' : 'md'} color={theme.colors.textTertiary} />
      </View>
    );
  }

  return (
    <NexaImage
      src={src}
      alt={alt}
      width={dim}
      height={dim}
      radius={(radius as any) ?? 'md'}
      contentFit="cover"
      style={style}
    />
  );
}

export default NexaAlbumArt;
