import React from 'react';
import {
  Modal as RNModal,
  View,
  Pressable,
  ScrollView,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { NexaText } from '../primitives/NexaText';

export type NexaBottomSheetProps = {
  visible: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  title?: string;
  /** Snap heights — currently fixed 60% max, future: gesture snap points */
  snapPoints?: string[];
  closeOnBackdrop?: boolean;
  showHandle?: boolean;
};

/**
 * NexaBottomSheet — bottom sheet with handle, backdrop, and scroll.
 * Phase 3: RN Modal + slide animation, handle, theme-aware.
 * Future: Reanimated + Gesture Handler for drag/snap.
 */
export function NexaBottomSheet({
  visible,
  onClose,
  children,
  title,
  closeOnBackdrop = true,
  showHandle = true,
}: NexaBottomSheetProps) {
  const { theme } = useTheme();

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'flex-end' } as ViewStyle}>
        {/* Backdrop */}
        <Pressable
          onPress={closeOnBackdrop ? onClose : undefined}
          accessibilityLabel="Close sheet"
          accessibilityRole="button"
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: theme.colors.scrim } as ViewStyle}
        />
        {/* Sheet */}
        <View
          accessibilityViewIsModal
          accessibilityRole={"dialog" as any}
          style={[
            {
              backgroundColor: theme.colors.surfaceElevated,
              borderTopLeftRadius: theme.radius.xl,
              borderTopRightRadius: theme.radius.xl,
              maxHeight: '86%',
              paddingBottom: theme.spacing[4],
            } as ViewStyle,
            theme.elevation[5] as any,
          ]}
        >
          {showHandle ? (
            <View style={{ alignItems: 'center', paddingTop: theme.spacing[2], paddingBottom: theme.spacing[1] }}>
              <View
                style={{
                  width: 36,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: theme.colors.borderStrong,
                  opacity: 0.6,
                } as ViewStyle}
              />
            </View>
          ) : null}
          {title ? (
            <View style={{ paddingHorizontal: theme.spacing[4], paddingVertical: theme.spacing[2], borderBottomWidth: 1, borderBottomColor: theme.colors.border }}>
              <NexaText variant="titleMedium" align="center">
                {title}
              </NexaText>
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

export default NexaBottomSheet;
