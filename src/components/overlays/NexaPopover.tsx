import React from 'react';
import { View, Pressable, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';

export type NexaPopoverProps = {
  visible: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  anchor?: React.ReactNode;
  style?: ViewStyle;
};

export function NexaPopover({ visible, onClose, children, anchor, style }: NexaPopoverProps) {
  const { theme } = useTheme();
  if (!visible) return anchor ? <>{anchor}</> : null;
  return (
    <View>
      {anchor}
      <Pressable onPress={onClose} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } as ViewStyle} />
      <View
        style={[
          {
            position: 'absolute',
            top: 40,
            left: 0,
            backgroundColor: theme.colors.surfaceElevated,
            borderRadius: theme.radius.md,
            padding: theme.spacing[3],
            minWidth: 160,
            borderWidth: 1,
            borderColor: theme.colors.border,
          } as ViewStyle,
          theme.elevation[3] as any,
          style,
        ]}
      >
        {children}
      </View>
    </View>
  );
}

export function NexaTooltip({ children, content }: { children: React.ReactNode; content: string }) {
  const { theme } = useTheme();
  return (
    <View accessibilityLabel={content}>
      {children}
    </View>
  );
}

export function NexaContextMenu({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default NexaPopover;
