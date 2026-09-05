import React from 'react';
import { NexaInput, type NexaInputProps } from './NexaInput';

export type NexaTextareaProps = NexaInputProps & { rows?: number };

export function NexaTextarea({ rows = 4, style, inputStyle, ...rest }: NexaTextareaProps) {
  return (
    <NexaInput
      multiline
      numberOfLines={rows}
      textAlignVertical="top"
      style={[{ minHeight: rows * 20 + 24 } as any, style] as any}
      inputStyle={[{ minHeight: rows * 20 } as any, inputStyle] as any}
      {...rest}
    />
  );
}

export default NexaTextarea;
