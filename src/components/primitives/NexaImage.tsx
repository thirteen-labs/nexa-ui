import React, { useState } from 'react';
import {
  Image as RNImage,
  View,
  type ImageProps as RNImageProps,
  type ViewStyle,
  type ImageStyle,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { NexaSkeleton } from '../feedback/NexaSkeleton';
import { NexaText } from './NexaText';

export type NexaImageProps = Omit<RNImageProps, 'style'> & {
  /** Source uri or require */
  src?: string;
  /** Fallback uri if src fails */
  fallbackSrc?: string;
  /** Alt text for a11y */
  alt?: string;
  /** Aspect ratio (width / height) */
  aspectRatio?: number;
  /** Fixed dimensions */
  width?: number | string;
  height?: number | string;
  /** Radius token or number */
  radius?: number | string;
  /** Content fit */
  contentFit?: 'cover' | 'contain' | 'fill' | 'scale-down';
  /** Show skeleton while loading */
  showPlaceholder?: boolean;
  style?: ViewStyle | ImageStyle;
};

/**
 * NexaImage — theme-aware image with placeholder, fallback, and a11y.
 * Expo-compatible, no native deps.
 */
export function NexaImage({
  src,
  fallbackSrc,
  alt,
  aspectRatio,
  width,
  height,
  radius,
  contentFit = 'cover',
  showPlaceholder = true,
  style,
  ...rest
}: NexaImageProps) {
  const { theme } = useTheme();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(!!src);

  const uri = error && fallbackSrc ? fallbackSrc : src;
  const hasUri = !!uri;

  const containerStyle: ViewStyle = {
    width: width as any,
    height: height as any,
    aspectRatio,
    borderRadius:
      typeof radius === 'number'
        ? radius
        : radius
          ? (theme.radius as any)[radius] ?? undefined
          : theme.radius.md,
    overflow: 'hidden',
    backgroundColor: theme.colors.muted,
  };

  if (!hasUri) {
    return (
      <View
        accessible
        accessibilityLabel={alt ?? 'image'}
        accessibilityRole="image"
        style={[containerStyle, style as any]}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 12 }}>
          <NexaText variant="caption" color="textTertiary" align="center">
            {alt ?? 'No image'}
          </NexaText>
        </View>
      </View>
    );
  }

  return (
    <View style={[containerStyle, style as any]}>
      {loading && showPlaceholder ? (
        <View style={{ ...StyleSheetFill }}>
          <NexaSkeleton width="100%" height="100%" radius={containerStyle.borderRadius as number} />
        </View>
      ) : null}
      <RNImage
        source={typeof uri === 'string' ? { uri } : (uri as any)}
        accessible
        accessibilityLabel={alt}
        accessibilityRole="image"
        resizeMode={contentFit as any}
        onError={() => {
          if (!error && fallbackSrc) setError(true);
          else setLoading(false);
        }}
        onLoadEnd={() => setLoading(false)}
        style={[
          StyleSheetFill as unknown as ImageStyle,
          { borderRadius: containerStyle.borderRadius } as ImageStyle,
        ] as any}
        {...rest}
      />
    </View>
  );
}

const StyleSheetFill: ViewStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
};

export default NexaImage;
