import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { SpacingKey } from '../../tokens/spacing';

export type NexaSpacerProps = {
  /** Spacing token for size */
  size?: SpacingKey | number;
  /** Axis — horizontal spacer has width, vertical has height */
  axis?: 'vertical' | 'horizontal' | 'both';
  style?: any;
};

/**
 * NexaSpacer — tokenized whitespace.
 */
export function NexaSpacer({ size = 4, axis = 'vertical', style }: NexaSpacerProps) {
  const { theme } = useTheme();
  const resolved = typeof size === 'number' && size in theme.spacing ? (theme.spacing as any)[size] : typeof size === 'number' ? size : (theme.spacing as any)[size] ?? 16;

  const spacerStyle =
    axis === 'horizontal'
      ? { width: resolved }
      : axis === 'both'
        ? { width: resolved, height: resolved }
        : { height: resolved };

  return React.createElement(View, { style: [spacerStyle, style] });
}

export default NexaSpacer;
