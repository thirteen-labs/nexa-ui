import React from 'react';
import { View, type ViewProps, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { NexaBox } from '../layout/NexaBox';
import type { RadiusKey } from '../../tokens/radius';
import type { ElevationLevel } from '../../tokens/elevation';

export type NexaCardProps = ViewProps & {
  children?: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
  radius?: RadiusKey | number;
  elevation?: ElevationLevel;
  padded?: boolean;
  style?: ViewStyle;
};

function CardRoot({ children, variant = 'elevated', radius = 'lg', elevation = 1, padded, style, ...rest }: NexaCardProps) {
  const { theme } = useTheme();

  const bg =
    variant === 'filled'
      ? theme.colors.surfaceVariant
      : variant === 'outlined'
        ? theme.colors.surface
        : theme.colors.surfaceElevated;

  const borderColor = variant === 'outlined' ? theme.colors.border : undefined;
  const elevationStyle = variant === 'elevated' ? theme.elevation[elevation] : undefined;
  const radiusVal = typeof radius === 'number' ? radius : (theme.radius as any)[radius] ?? theme.radius.lg;

  return React.createElement(
    View,
    {
      style: [
        {
          backgroundColor: bg,
          borderRadius: radiusVal,
          borderColor,
          borderWidth: borderColor ? 1 : 0,
          padding: padded ? theme.spacing[4] : undefined,
          overflow: 'hidden',
        } as ViewStyle,
        elevationStyle as any,
        style as any,
      ],
      ...rest,
    },
    children
  );
}

function CardHeader({ children, style, ...rest }: ViewProps) {
  const { theme } = useTheme();
  return React.createElement(View, { style: [{ padding: theme.spacing[4], paddingBottom: theme.spacing[2] } as ViewStyle, style as any], ...rest }, children);
}

function CardContent({ children, style, ...rest }: ViewProps) {
  const { theme } = useTheme();
  return React.createElement(View, { style: [{ paddingHorizontal: theme.spacing[4], paddingVertical: theme.spacing[2] } as ViewStyle, style as any], ...rest }, children);
}

function CardFooter({ children, style, ...rest }: ViewProps) {
  const { theme } = useTheme();
  return React.createElement(
    View,
    { style: [{ padding: theme.spacing[4], paddingTop: theme.spacing[2], flexDirection: 'row', alignItems: 'center', gap: 8 } as ViewStyle, style as any], ...rest },
    children
  );
}

export const NexaCard = Object.assign(CardRoot, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
});

export default NexaCard;
