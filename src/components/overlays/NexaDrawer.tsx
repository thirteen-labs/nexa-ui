import React from 'react';
import { Modal, View, Pressable, ScrollView, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';

export type NexaDrawerProps = {
  visible: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  side?: 'left' | 'right';
  width?: number;
};

export function NexaDrawer({ visible, onClose, children, side = 'left', width = 300 }: NexaDrawerProps) {
  const { theme } = useTheme();
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose} statusBarTranslucent>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {side === 'right' ? <Pressable onPress={onClose} style={{ flex: 1, backgroundColor: theme.colors.scrim } as ViewStyle} /> : null}
        <View style={[{ width, backgroundColor: theme.colors.surface, height: '100%' } as ViewStyle, theme.elevation[5] as any]}>
          <ScrollView contentContainerStyle={{ padding: theme.spacing[4] } as any}>{children}</ScrollView>
        </View>
        {side === 'left' ? <Pressable onPress={onClose} style={{ flex: 1, backgroundColor: theme.colors.scrim } as ViewStyle} /> : null}
      </View>
    </Modal>
  );
}

export function NexaActionSheet({ visible, onClose, children }: { visible: boolean; onClose?: () => void; children?: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose} statusBarTranslucent>
      <Pressable onPress={onClose} style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: theme.colors.scrim } as ViewStyle}>
        <Pressable style={{ backgroundColor: theme.colors.surfaceElevated, borderTopLeftRadius: theme.radius.xl, borderTopRightRadius: theme.radius.xl, padding: theme.spacing[4] } as ViewStyle}>
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function NexaAlert({ children, style }: { children?: React.ReactNode; style?: ViewStyle }) {
  const { theme } = useTheme();
  return <View style={[{ backgroundColor: theme.colors.surfaceVariant, borderRadius: theme.radius.md, padding: theme.spacing[3], borderWidth: 1, borderColor: theme.colors.border } as ViewStyle, style]}>{children}</View>;
}

export function NexaSnackbar({ message, style }: { message: string; style?: ViewStyle }) {
  const { theme } = useTheme();
  return <View style={[{ backgroundColor: theme.colors.foreground, padding: 12, borderRadius: theme.radius.md } as ViewStyle, style]}><View>{message as any}</View></View>;
}

export function NexaNotification(props: any) {
  return null;
}

export default NexaDrawer;
