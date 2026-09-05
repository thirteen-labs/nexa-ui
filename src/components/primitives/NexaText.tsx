import React from 'react';
import { Text as RNText, type TextProps as RNTextProps, type TextStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { TextVariantKey } from '../../tokens/typography';
import type { SemanticColors } from '../../tokens/colors';

export type NexaTextProps = RNTextProps & {
  children?: React.ReactNode;
  /** Semantic variant — maps to tokens.typography.textVariants */
  variant?: TextVariantKey;
  /** Override color via semantic token or raw string */
  color?: keyof SemanticColors | string;
  /** Text alignment */
  align?: TextStyle['textAlign'];
  /** Font weight override */
  weight?: TextStyle['fontWeight'];
  /** Truncate with ellipsis after this line count */
  truncate?: boolean | number;
  /** Enable font scaling (default true, respects system) */
  allowFontScaling?: boolean;
};

/**
 * NexaText — typographic primitive.
 * Consumes theme typography tokens + semantic colors.
 * Accessible, selectable defaults are intentionally minimal.
 */
export function NexaText({
  children,
  variant = 'bodyMedium',
  color = 'textPrimary',
  align,
  weight,
  truncate,
  allowFontScaling = true,
  style,
  ...rest
}: NexaTextProps) {
  const { theme } = useTheme();
  const variantStyle = theme.typography.textVariants[variant] ?? theme.typography.textVariants.bodyMedium;

  // Resolve color: semantic token -> theme color, else raw string
  const colorValue =
    typeof color === 'string' && color in theme.colors
      ? (theme.colors as Record<string, string>)[color]
      : (color as string);

  const numberOfLines =
    typeof truncate === 'number' ? truncate : truncate ? 1 : undefined;

  const accessibilityProps = truncate
    ? { ellipsizeMode: 'tail' as const, numberOfLines }
    : {};

  return React.createElement(
    RNText,
    {
      allowFontScaling,
      style: [
        {
          fontFamily: theme.typography.fontFamily.sans,
          fontSize: (variantStyle as any).fontSize,
          lineHeight: (variantStyle as any).lineHeight,
          fontWeight: weight ?? (variantStyle as any).fontWeight,
          letterSpacing: (variantStyle as any).letterSpacing,
          color: colorValue,
          textAlign: align,
        } as TextStyle,
        style as any,
      ],
      ...accessibilityProps,
      ...rest,
    },
    children
  );
}

export default NexaText;
