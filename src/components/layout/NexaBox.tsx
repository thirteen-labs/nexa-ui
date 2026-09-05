import React from 'react';
import { View, type ViewProps, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { SpacingKey } from '../../tokens/spacing';
import type { RadiusKey } from '../../tokens/radius';
import type { SemanticColors } from '../../tokens/colors';

type SpacingToken = SpacingKey | number;
type ColorToken = keyof SemanticColors | string;

export type NexaBoxProps = ViewProps & {
  children?: React.ReactNode;
  /** Background — semantic token or raw */
  bg?: ColorToken;
  /** Padding */
  p?: SpacingToken;
  px?: SpacingToken;
  py?: SpacingToken;
  pt?: SpacingToken;
  pb?: SpacingToken;
  pl?: SpacingToken;
  pr?: SpacingToken;
  /** Margin */
  m?: SpacingToken;
  mx?: SpacingToken;
  my?: SpacingToken;
  mt?: SpacingToken;
  mb?: SpacingToken;
  ml?: SpacingToken;
  mr?: SpacingToken;
  /** Gap for flex children */
  gap?: SpacingToken;
  rowGap?: SpacingToken;
  columnGap?: SpacingToken;
  /** Radius */
  radius?: RadiusKey | number;
  /** Border color */
  borderColor?: ColorToken;
  borderWidth?: number;
  /** Flex */
  flex?: ViewStyle['flex'];
  direction?: ViewStyle['flexDirection'];
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
  wrap?: ViewStyle['flexWrap'];
  /** Size */
  w?: ViewStyle['width'];
  h?: ViewStyle['height'];
  minH?: ViewStyle['minHeight'];
  minW?: ViewStyle['minWidth'];
};

function resolveSpacing(theme: any, v: SpacingToken | undefined): number | undefined {
  if (v === undefined) return undefined;
  if (typeof v === 'number' && v in theme.spacing) return theme.spacing[v as SpacingKey];
  if (typeof v === 'number') return v;
  return theme.spacing[v as SpacingKey] ?? undefined;
}

function resolveColor(theme: any, c: ColorToken | undefined): string | undefined {
  if (!c) return undefined;
  return (theme.colors[c] as string) ?? (c as string);
}

function resolveRadius(theme: any, r: RadiusKey | number | undefined): number | undefined {
  if (r === undefined) return undefined;
  if (typeof r === 'number' && String(r) in theme.radius) return (theme.radius as any)[r];
  if (typeof r === 'number') return r;
  return theme.radius[r as RadiusKey] ?? undefined;
}

/**
 * NexaBox — layout atom. Token-aware View.
 * All spacing/radius/color props resolve via theme tokens.
 */
export function NexaBox({
  children,
  bg,
  p, px, py, pt, pb, pl, pr,
  m, mx, my, mt, mb, ml, mr,
  gap, rowGap, columnGap,
  radius, borderColor, borderWidth,
  flex, direction, align, justify, wrap,
  w, h, minH, minW,
  style,
  ...rest
}: NexaBoxProps) {
  const { theme } = useTheme();

  const tokenStyle: ViewStyle = {
    backgroundColor: resolveColor(theme, bg),
    padding: resolveSpacing(theme, p),
    paddingHorizontal: resolveSpacing(theme, px),
    paddingVertical: resolveSpacing(theme, py),
    paddingTop: resolveSpacing(theme, pt),
    paddingBottom: resolveSpacing(theme, pb),
    paddingLeft: resolveSpacing(theme, pl),
    paddingRight: resolveSpacing(theme, pr),
    margin: resolveSpacing(theme, m),
    marginHorizontal: resolveSpacing(theme, mx),
    marginVertical: resolveSpacing(theme, my),
    marginTop: resolveSpacing(theme, mt),
    marginBottom: resolveSpacing(theme, mb),
    marginLeft: resolveSpacing(theme, ml),
    marginRight: resolveSpacing(theme, mr),
    gap: resolveSpacing(theme, gap),
    rowGap: resolveSpacing(theme, rowGap),
    columnGap: resolveSpacing(theme, columnGap),
    borderRadius: resolveRadius(theme, radius),
    borderColor: resolveColor(theme, borderColor),
    borderWidth,
    flex,
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap,
    width: w,
    height: h,
    minHeight: minH,
    minWidth: minW,
  };

  // Strip undefined keys to avoid RN warnings
  Object.keys(tokenStyle).forEach((k) => (tokenStyle as any)[k] === undefined && delete (tokenStyle as any)[k]);

  return React.createElement(View, { style: [tokenStyle, style as any], ...rest }, children);
}

export default NexaBox;
