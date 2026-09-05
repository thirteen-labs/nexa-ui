import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { NexaModal } from './NexaModal';
import { NexaText } from '../primitives/NexaText';
import { NexaButton } from '../actions/NexaButton';
import { NexaStack } from '../layout/NexaStack';
import { useTheme } from '../../theme/useTheme';

export type NexaDialogProps = {
  visible: boolean;
  onClose?: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  /** Primary action */
  confirmLabel?: string;
  onConfirm?: () => void;
  /** Secondary */
  cancelLabel?: string;
  onCancel?: () => void;
  /** Destructive confirm */
  destructive?: boolean;
  loading?: boolean;
  size?: 'sm' | 'md';
};

/**
 * NexaDialog — opinionated dialog for alerts/confirms.
 * Built on NexaModal, accessible, theme-aware, with keyboard/backdrop handling.
 */
export function NexaDialog({
  visible,
  onClose,
  title,
  description,
  children,
  confirmLabel = 'Confirm',
  onConfirm,
  cancelLabel = 'Cancel',
  onCancel,
  destructive,
  loading,
  size = 'sm',
}: NexaDialogProps) {
  const { theme } = useTheme();
  const handleCancel = onCancel ?? onClose;

  return (
    <NexaModal visible={visible} onClose={onClose} size={size} animationType="fade" title={title} showClose={false}>
      <View style={{ gap: theme.spacing[3] } as ViewStyle}>
        {description ? (
          <NexaText variant="bodyMedium" color="textSecondary">
            {description}
          </NexaText>
        ) : null}
        {children}
        <NexaStack direction="row" justify="flex-end" gap={2} style={{ marginTop: theme.spacing[2] } as ViewStyle}>
          {handleCancel ? (
            <NexaButton variant="ghost" onPress={handleCancel} disabled={loading}>
              {cancelLabel}
            </NexaButton>
          ) : null}
          {onConfirm ? (
            <NexaButton variant={destructive ? 'destructive' : 'solid'} onPress={onConfirm} loading={loading}>
              {confirmLabel}
            </NexaButton>
          ) : null}
        </NexaStack>
      </View>
    </NexaModal>
  );
}

export default NexaDialog;
