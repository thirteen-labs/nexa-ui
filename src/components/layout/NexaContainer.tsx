import React from 'react';
import { NexaBox, type NexaBoxProps } from './NexaBox';

export type NexaContainerProps = NexaBoxProps & {
  /** Max width — defaults to 1280, collapses on small screens */
  maxWidth?: number;
  /** Center horizontally (default true) */
  centered?: boolean;
};

/**
 * NexaContainer — constrained width wrapper for readable layouts.
 */
export function NexaContainer({ maxWidth = 1280, centered = true, w = '100%', px = 4, style, children, ...rest }: NexaContainerProps) {
  return React.createElement(
    NexaBox,
    {
      w,
      px,
      style: [{ maxWidth, alignSelf: centered ? 'center' : undefined, width: '100%' } as any, style as any],
      ...rest,
    },
    children
  );
}

export default NexaContainer;
