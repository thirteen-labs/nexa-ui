import React from 'react';
import { NexaBox, type NexaBoxProps } from './NexaBox';

export type NexaStackProps = Omit<NexaBoxProps, 'direction'> & {
  /** Gap between children — spacing token */
  gap?: NexaBoxProps['gap'];
  /** Horizontal or vertical */
  direction?: 'row' | 'column';
  /** Reverse direction */
  reverse?: boolean;
};

/**
 * NexaStack — flex stack with tokenized gap.
 * Eliminates manual `flexDirection` + `gap` boilerplate.
 *
 * @example
 * <NexaStack gap="md"><NexaText>Title</NexaText><NexaText>Body</NexaText></NexaStack>
 * <NexaStack direction="row" gap="lg" align="center">
 */
export function NexaStack({ gap = 3, direction = 'column', reverse, align, justify, wrap, children, ...rest }: NexaStackProps) {
  const dir = reverse ? (`${direction}-reverse` as any) : direction;
  return React.createElement(
    NexaBox,
    { direction: dir, gap, align, justify, wrap, ...rest },
    children
  );
}

export function NexaRow(props: Omit<NexaStackProps, 'direction'>) {
  return React.createElement(NexaStack, { direction: 'row', ...props });
}

export function NexaColumn(props: Omit<NexaStackProps, 'direction'>) {
  return React.createElement(NexaStack, { direction: 'column', ...props });
}

export default NexaStack;
