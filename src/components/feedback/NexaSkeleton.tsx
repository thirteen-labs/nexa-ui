import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';

export type NexaSkeletonProps = {
  width?: ViewStyle['width'];
  height?: ViewStyle['height'];
  radius?: number;
  style?: ViewStyle;
};

/**
 * NexaSkeleton — placeholder shimmer base (static, no animation dependency).
 * Phase 3 will add Reanimated shimmer; this keeps the API stable now.
 */
export function NexaSkeleton({ width = '100%', height = 16, radius, style }: NexaSkeletonProps) {
  const { theme } = useTheme();
  return React.createElement(View, {
    style: [
      {
        width: width as any,
        height: height as any,
        borderRadius: radius ?? theme.radius.md,
        backgroundColor: theme.colors.muted,
        opacity: 0.9,
      } as ViewStyle,
      style as any,
    ],
  });
}

export default NexaSkeleton;
