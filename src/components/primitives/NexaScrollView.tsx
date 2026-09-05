import React from 'react';
import { ScrollView, type ScrollViewProps, type ViewStyle } from 'react-native';

export type NexaScrollViewProps = ScrollViewProps & {
  children?: React.ReactNode;
  contentStyle?: ViewStyle;
};

/**
 * NexaScrollView — theme-aware scroll view with keyboard handling defaults.
 */
export function NexaScrollView({ children, contentStyle, keyboardShouldPersistTaps = 'handled', showsVerticalScrollIndicator = false, ...rest }: NexaScrollViewProps) {
  return (
    <ScrollView keyboardShouldPersistTaps={keyboardShouldPersistTaps} showsVerticalScrollIndicator={showsVerticalScrollIndicator} contentContainerStyle={contentStyle as any} {...rest}>
      {children}
    </ScrollView>
  );
}

export default NexaScrollView;
