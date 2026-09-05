import React from 'react';
import { NexaText, type NexaTextProps } from '../primitives/NexaText';

export type NexaHeadingProps = Omit<NexaTextProps, 'variant'> & { level?: 1 | 2 | 3 | 4 };

export function NexaHeading({ level = 1, children, ...rest }: NexaHeadingProps) {
  const map: Record<number, any> = { 1: 'displayMedium', 2: 'headlineLarge', 3: 'headlineMedium', 4: 'headlineSmall' };
  return (
    <NexaText variant={map[level]} {...rest}>
      {children}
    </NexaText>
  );
}

export function NexaLabel(props: Omit<NexaTextProps, 'variant'>) {
  return <NexaText variant="labelLarge" {...props} />;
}

export function NexaCaption(props: Omit<NexaTextProps, 'variant'>) {
  return <NexaText variant="caption" color="textSecondary" {...props} />;
}

export function NexaCode({ children, ...rest }: NexaTextProps) {
  return (
    <NexaText variant="bodySmall" style={{ fontFamily: 'monospace' } as any} {...rest}>
      {children}
    </NexaText>
  );
}

export default NexaHeading;
