import React from 'react';
import { ImageBackground as RNImageBackground, type ViewStyle } from 'react-native';
import { NexaImage } from '../primitives/NexaImage';
import { NexaScrollView } from '../primitives/NexaScrollView';
import { NexaGrid } from '../layout/NexaGrid';

export type NexaImageBackgroundProps = React.ComponentProps<typeof RNImageBackground> & { children?: React.ReactNode };

export function NexaImageBackground({ children, style, ...rest }: NexaImageBackgroundProps) {
  return (
    <RNImageBackground style={style as any} {...rest}>
      {children}
    </RNImageBackground>
  );
}

export function NexaThumbnail({ src, size = 48, radius = 8, style }: { src?: string; size?: number; radius?: number; style?: ViewStyle }) {
  return <NexaImage src={src} width={size} height={size} radius={radius} style={style} />;
}

export function NexaCarousel({ children, style }: { children?: React.ReactNode; style?: ViewStyle }) {
  return <NexaScrollView horizontal showsHorizontalScrollIndicator={false} style={style as any} contentStyle={{ gap: 12 } as any}>{children}</NexaScrollView>;
}

export function NexaGallery({ children, style }: { children?: React.ReactNode; style?: ViewStyle }) {
  return <NexaGrid columns={3} style={style as any}>{children}</NexaGrid>;
}

export default NexaImageBackground;
