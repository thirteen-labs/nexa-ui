import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { NexaPressable } from '../primitives/NexaPressable';

export type NexaSwipeableProps = {
  children?: React.ReactNode;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  style?: ViewStyle;
};

/**
 * NexaSwipeable — stub with press fallback (no gesture-handler hard dep).
 * Future: uses `react-native-gesture-handler` + Reanimated when installed.
 */
export function NexaSwipeable({ children, leftAction, rightAction, style }: NexaSwipeableProps) {
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center' } as ViewStyle, style]}>
      {leftAction}
      <View style={{ flex: 1 }}>{children}</View>
      {rightAction}
    </View>
  );
}

export function NexaDraggable({ children, style }: { children?: React.ReactNode; style?: ViewStyle }) {
  return <View style={style}>{children}</View>;
}

export function NexaSortable({ children, style }: { children?: React.ReactNode; style?: ViewStyle }) {
  return <View style={style}>{children}</View>;
}

export function NexaSwipeActions({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}

export function NexaPullToRefresh({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}

export function NexaPan({ children, style }: { children?: React.ReactNode; style?: ViewStyle }) {
  return <View style={style}>{children}</View>;
}

export default NexaSwipeable;
