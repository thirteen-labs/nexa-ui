import React from 'react';
import { View, type ViewProps, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { RadiusKey } from '../../tokens/radius';
import type { ElevationLevel } from '../../tokens/elevation';

export type NexaSurfaceProps = ViewProps & {
  children?: React.ReactNode;
  /** Visual variant */
  variant?: 'plain' | 'elevated' | 'inset';
  /** Background token */
  bg?: string;
  radius?: RadiusKey | number;
  elevation?: ElevationLevel;
  style?: ViewStyle;
};

/**
 * NexaSurface — generic surface for sections/panels.
 * Lighter than Card; no header/footer semantics.
 */
export function NexaSurface({
  children,
  variant = 'plain',
  bg,
  radius = 'lg',
  elevation = 1,
  style,
  ...rest
}: NexaSurfaceProps) {
  const { theme } = useTheme();

  const backgroundColor =
    bg && (theme.colors as any)[bg] ? (theme.colors as any)[bg] : (bg as string) ?? theme.colors.surface;

  const elevated = variant === 'elevated' ? theme.elevation[elevation] : undefined;
  const radiusVal =
    typeof radius === 'number' ? radius : ((theme.radius as any)[radius] ?? theme.radius.lg);

  const variantStyle: ViewStyle =
    variant === 'inset'
      ? {
          backgroundColor: theme.colors.surfaceVariant,
          borderWidth: 1,
          borderColor: theme.colors.border,
        }
      : {};

  return (
    <View
      style={[
        {
          backgroundColor,
          borderRadius: radiusVal,
          overflow: 'hidden',
        } as ViewStyle,
        variantStyle,
        elevated as any,
        style as any,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

export default NexaSurface;
