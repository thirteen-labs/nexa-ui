import React from 'react';
import { NexaBox, type NexaBoxProps } from './NexaBox';

/**
 * NexaCenter — centers children both axes.
 */
export function NexaCenter({ children, ...rest }: NexaBoxProps) {
  return React.createElement(NexaBox, { align: 'center', justify: 'center', ...rest }, children);
}

export default NexaCenter;
