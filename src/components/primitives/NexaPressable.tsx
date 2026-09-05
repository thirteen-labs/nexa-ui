import React, { useCallback } from 'react';
import {
  Pressable,
  type PressableProps,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { a11yState } from '../../accessibility';

export type NexaPressableProps = Omit<PressableProps, 'style'> & {
  children?: React.ReactNode | ((state: { pressed: boolean; hovered?: boolean }) => React.ReactNode);
  /** Style or pressed-aware style */
  style?: StyleProp<ViewStyle> | ((state: { pressed: boolean }) => StyleProp<ViewStyle>);
  /** Opacity when pressed (0-1). Default 0.7 if no pressed style provided */
  pressedOpacity?: number;
  /** Whether pressable is disabled (a11y + interaction) */
  disabled?: boolean;
};

/**
 * NexaPressable — accessible pressable primitive.
 * Handles a11y role/state, hitSlop defaults, and pressed opacity feedback
 * without requiring Reanimated. Works on all platforms.
 */
export function NexaPressable({
  children,
  style,
  pressedOpacity = 0.72,
  disabled,
  accessibilityRole = 'button',
  accessibilityState,
  ...rest
}: NexaPressableProps) {
  const mergedA11yState = a11yState({
    disabled,
    ...(accessibilityState as any),
  });

  const styleFn = useCallback(
    ({ pressed }: { pressed: boolean }) => {
      const base = typeof style === 'function' ? (style as any)({ pressed }) : style;
      if (pressed && typeof style !== 'function' && !disabled) {
        // Simple opacity feedback when no custom pressed style supplied
        return [{ opacity: pressedOpacity }, base as any];
      }
      return base as any;
    },
    [style, pressedOpacity, disabled]
  );

  return React.createElement(
    Pressable,
    {
      disabled,
      accessibilityRole: accessibilityRole as any,
      accessibilityState: mergedA11yState as any,
      style: styleFn as any,
      ...rest,
    },
    children as any
  );
}

export default NexaPressable;
