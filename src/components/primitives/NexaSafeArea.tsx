import React from 'react';
import { View, type ViewProps, type ViewStyle } from 'react-native';

export type NexaSafeAreaProps = ViewProps & {
  children?: React.ReactNode;
  edges?: Array<'top' | 'bottom' | 'left' | 'right'>;
  style?: ViewStyle;
};

/**
 * NexaSafeArea — safe-area aware container.
 * Falls back to View with no insets if react-native-safe-area-context not installed.
 */
export function NexaSafeArea({ children, edges = ['top', 'bottom'], style, ...rest }: NexaSafeAreaProps) {
  let insets: any = { top: 0, bottom: 0, left: 0, right: 0 };
  try {
    // Optional dep — if not installed, use 0 insets
    const mod = require('react-native-safe-area-context');
    if (mod?.useSafeAreaInsets) insets = mod.useSafeAreaInsets();
  } catch {}

  const pad: ViewStyle = {
    paddingTop: edges.includes('top') ? insets.top : 0,
    paddingBottom: edges.includes('bottom') ? insets.bottom : 0,
    paddingLeft: edges.includes('left') ? insets.left : 0,
    paddingRight: edges.includes('right') ? insets.right : 0,
  };

  return (
    <View style={[pad, style as any]} {...rest}>
      {children}
    </View>
  );
}

export default NexaSafeArea;
