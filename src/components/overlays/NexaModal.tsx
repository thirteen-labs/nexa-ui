import React from 'react';
import {
  Modal as RNModal,
  View,
  Pressable,
  ScrollView,
  type ViewStyle,
  type ModalProps,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { NexaText } from '../primitives/NexaText';
import { NexaIconButton } from '../actions/NexaIconButton';

export type NexaModalProps = Omit<ModalProps, 'visible' | 'animationType'> & {
  visible: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  title?: string;
  /** Width constraint */
  size?: 'sm' | 'md' | 'lg' | 'full';
  /** Animation */
  animationType?: 'fade' | 'slide' | 'none';
  /** Close on backdrop press */
  closeOnBackdrop?: boolean;
  /** Show close button */
  showClose?: boolean;
  /** Test ID */
  testID?: string;
};

/**
 * NexaModal — accessible modal with backdrop, safe-area, and theme-aware surface.
 * Handles back-button (hardware), backdrop press, and focus.
 */
export function NexaModal({
  visible,
  onClose,
  children,
  title,
  size = 'md',
  animationType = 'fade',
  closeOnBackdrop = true,
  showClose = false,
  statusBarTranslucent = true,
  ...rest
}: NexaModalProps) {
  const { theme } = useTheme();

  const maxWidth = size === 'sm' ? 360 : size === 'lg' ? 560 : size === 'full' ? 960 : 440;

  return (
    <RNModal
      visible={visible}
      transparent
      animationType={animationType}
      statusBarTranslucent={statusBarTranslucent}
      onRequestClose={onClose}
      {...rest}
    >
      <View style={{ flex: 1, backgroundColor: theme.colors.scrim, justifyContent: 'center', alignItems: 'center', padding: theme.spacing[4] } as ViewStyle}>
        {/* Backdrop */}
        <Pressable
          accessibilityLabel="Close modal"
          accessibilityRole="button"
          onPress={closeOnBackdrop ? onClose : undefined}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } as ViewStyle}
        />
        {/* Content */}
        <View
          accessibilityViewIsModal
          accessibilityRole={"dialog" as any}
          style={[
            {
              width: '100%',
              maxWidth,
              maxHeight: '88%',
              backgroundColor: theme.colors.surfaceElevated,
              borderRadius: theme.radius.xl,
              overflow: 'hidden',
            } as ViewStyle,
            theme.elevation[5] as any,
          ]}
        >
          {title ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: theme.spacing[4],
                paddingVertical: theme.spacing[3],
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.border,
              } as ViewStyle}
            >
              <NexaText variant="titleMedium" style={{ flex: 1 } as any}>
                {title}
              </NexaText>
              {showClose && onClose ? (
                <NexaIconButton icon="x" size="sm" variant="ghost" onPress={onClose} accessibilityLabel="Close" />
              ) : null}
            </View>
          ) : showClose && onClose ? (
            <View style={{ alignItems: 'flex-end', padding: 8 }}>
              <NexaIconButton icon="x" size="sm" variant="ghost" onPress={onClose} accessibilityLabel="Close" />
            </View>
          ) : null}
          <ScrollView
            contentContainerStyle={{ padding: theme.spacing[4] } as any}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </View>
      </View>
    </RNModal>
  );
}

export default NexaModal;
