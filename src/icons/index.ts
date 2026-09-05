/**
 * NexaUI Icon System — adapter architecture.
 * Default: no hard dependency. Apps register their preferred library
 * (Lucide, Tabler, Material, custom SVG) via <NexaIconProvider>.
 *
 * Usage:
 *   <NexaIcon name="play" size={20} color={colors.primary} />
 *
 * Adapter:
 *   <NexaIconProvider registry={{ play: (p) => <LucidePlay {...p} /> }}>
 */

import React, { createContext, useContext } from 'react';
import { Text } from 'react-native';
import type { SemanticColors } from '../tokens/colors';

export type IconSize = number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconColor = keyof SemanticColors | string;

export type IconProps = {
  name: string;
  size?: IconSize;
  color?: IconColor;
  style?: any;
  accessibilityLabel?: string;
};

export type IconRegistry = Record<string, React.ComponentType<{ size?: number; color?: string; style?: any }>>;

const IconContext = createContext<IconRegistry | null>(null);

export function NexaIconProvider({
  children,
  registry,
}: {
  children: React.ReactNode;
  registry: IconRegistry;
}) {
  return React.createElement(IconContext.Provider, { value: registry }, children);
}

export function useIconRegistry() {
  return useContext(IconContext);
}

const sizeMap: Record<string, number> = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
};

/**
 * NexaIcon — renders via registry if available, else a text fallback.
 * Keeps NexaUI dependency-free while supporting any icon library.
 */
export function NexaIcon({ name, size = 'md', color, style, accessibilityLabel }: IconProps) {
  const registry = useIconRegistry();
  const numericSize = typeof size === 'number' ? size : (sizeMap[size] ?? 20);
  const Adapter = registry?.[name];

  if (Adapter) {
    // Adapter is responsible for color handling; pass through.
    return React.createElement(Adapter, { size: numericSize, color: color as string, style });
  }

  // Fallback — accessible, visible placeholder so UI doesn't break without a library.
  // Sized box with first letter — replace by registering a real registry.
  return React.createElement(
    Text,
    {
      accessible: true,
      accessibilityLabel: accessibilityLabel ?? name,
      accessibilityRole: 'image' as const,
      style: [{ fontSize: numericSize * 0.6, textAlign: 'center', lineHeight: numericSize }, style],
    },
    name.slice(0, 2).toUpperCase()
  );
}

export default NexaIcon;
