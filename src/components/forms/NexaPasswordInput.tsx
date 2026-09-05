import React, { useState } from 'react';
import { NexaInput, type NexaInputProps } from './NexaInput';
import { NexaPressable } from '../primitives/NexaPressable';
import { NexaIcon } from '../../icons';
import { useTheme } from '../../theme/useTheme';

export type NexaPasswordInputProps = Omit<NexaInputProps, 'secureTextEntry'>;

export function NexaPasswordInput(props: NexaPasswordInputProps) {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);

  return (
    <NexaInput
      secureTextEntry={!visible}
      rightIcon={
        <NexaPressable onPress={() => setVisible((v) => !v)} accessibilityLabel={visible ? 'Hide password' : 'Show password'} accessibilityRole="button">
          <NexaIcon name={visible ? 'eye-off' : 'eye'} size="sm" color={theme.colors.textTertiary} />
        </NexaPressable>
      }
      {...props}
    />
  );
}

export default NexaPasswordInput;
