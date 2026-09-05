import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { NexaCard } from '../surfaces/NexaCard';
import { NexaText } from '../primitives/NexaText';
import { NexaAlbumArt } from './NexaAlbumArt';
import { NexaPressable } from '../primitives/NexaPressable';
import { useTheme } from '../../theme/useTheme';

export type NexaMediaCardProps = {
  title: string;
  subtitle?: string;
  artwork?: string;
  artworkSize?: 'sm' | 'md' | 'lg';
  onPress?: () => void;
  style?: ViewStyle;
  children?: React.ReactNode;
};

/**
 * NexaMediaCard — generic media card (album/artist/video).
 * Composable; artwork + title/subtitle + press handling.
 */
export function NexaMediaCard({ title, subtitle, artwork, artworkSize = 'md', onPress, style, children }: NexaMediaCardProps) {
  const { theme } = useTheme();
  const content = (
    <View style={{ gap: theme.spacing[2] } as ViewStyle}>
      <NexaAlbumArt src={artwork} alt={title} size={artworkSize} />
      <View style={{ gap: 2 }}>
        <NexaText variant="titleSmall" truncate={1}>
          {title}
        </NexaText>
        {subtitle ? (
          <NexaText variant="bodySmall" color="textSecondary" truncate={1}>
            {subtitle}
          </NexaText>
        ) : null}
      </View>
      {children}
    </View>
  );

  if (onPress) {
    return (
      <NexaCard padded style={style}>
        <NexaPressable onPress={onPress} accessibilityLabel={title} accessibilityRole="button">
          {content}
        </NexaPressable>
      </NexaCard>
    );
  }

  return (
    <NexaCard padded style={style}>
      {content}
    </NexaCard>
  );
}

export function NexaAlbumCard(props: NexaMediaCardProps) {
  return <NexaMediaCard {...props} />;
}

export function NexaArtistCard(props: Omit<NexaMediaCardProps, 'artworkSize'> & { artworkSize?: 'sm' | 'md' | 'lg' }) {
  // Artist cards use circular art
  return <NexaMediaCard {...props} artworkSize="md" />;
}

export function NexaVideoCard(props: NexaMediaCardProps) {
  return <NexaMediaCard {...props} />;
}

export default NexaMediaCard;
