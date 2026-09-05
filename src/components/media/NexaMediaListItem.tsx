import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { NexaPressable } from '../primitives/NexaPressable';
import { NexaText } from '../primitives/NexaText';
import { NexaAlbumArt } from './NexaAlbumArt';
import { NexaIcon } from '../../icons';
import { useTheme } from '../../theme/useTheme';

export type NexaMediaListItemProps = {
  title: string;
  subtitle?: string;
  artwork?: string;
  trailing?: React.ReactNode;
  onPress?: () => void;
  onMorePress?: () => void;
  active?: boolean;
  style?: ViewStyle;
};

/**
 * NexaMediaListItem — row for queues, playlists, library.
 */
export function NexaMediaListItem({ title, subtitle, artwork, trailing, onPress, onMorePress, active, style }: NexaMediaListItemProps) {
  const { theme } = useTheme();

  return (
    <NexaPressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityLabel={`${title}${subtitle ? `, ${subtitle}` : ''}`}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing[3],
          paddingVertical: theme.spacing[2],
          paddingHorizontal: theme.spacing[3],
          backgroundColor: active ? theme.colors.surfaceVariant : 'transparent',
          borderRadius: theme.radius.md,
          opacity: onPress ? 1 : 0.95,
        } as ViewStyle,
        style as any,
      ]}
    >
      <NexaAlbumArt src={artwork} alt={title} size="sm" />
      <View style={{ flex: 1, gap: 2 }}>
        <NexaText variant="labelMedium" truncate={1} color={active ? 'primary' : 'textPrimary'}>
          {title}
        </NexaText>
        {subtitle ? (
          <NexaText variant="caption" color="textSecondary" truncate={1}>
            {subtitle}
          </NexaText>
        ) : null}
      </View>
      {trailing ?? null}
      {onMorePress ? (
        <NexaPressable onPress={onMorePress} accessibilityLabel={`More options for ${title}`} accessibilityRole="button" style={{ padding: 6 } as ViewStyle}>
          <NexaIcon name="more" size="sm" color={theme.colors.textTertiary} />
        </NexaPressable>
      ) : null}
    </NexaPressable>
  );
}

export default NexaMediaListItem;
