import React from 'react';
import { NexaBadge } from './NexaBadge';

export type NexaTagProps = React.ComponentProps<typeof NexaBadge>;

export function NexaTag(props: NexaTagProps) {
  return <NexaBadge {...props} />;
}

export default NexaTag;
