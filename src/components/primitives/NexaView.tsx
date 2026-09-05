import React from 'react';
import { View, type ViewProps, type ViewStyle } from 'react-native';

/**
 * NexaView — thin wrapper over RN View.
 * Exists so the import surface stays within NexaUI and we can add
 * theme-aware defaults (e.g., background) later without breaking.
 */
export type NexaViewProps = ViewProps & {
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
};

export function NexaView({ children, style, ...rest }: NexaViewProps) {
  return React.createElement(View, { style, ...rest }, children);
}

export default NexaView;
