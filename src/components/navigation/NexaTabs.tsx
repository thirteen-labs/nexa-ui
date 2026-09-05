import React, { createContext, useContext } from 'react';
import { View, type ViewStyle } from 'react-native';
import { NexaPressable } from '../primitives/NexaPressable';
import { NexaText } from '../primitives/NexaText';
import { NexaIcon } from '../../icons';
import { useTheme } from '../../theme/useTheme';

type TabsCtx = { value?: string; onValueChange?: (v: string) => void };
const TabsContext = createContext<TabsCtx>({});

export type NexaTabsProps = {
  children?: React.ReactNode;
  value?: string;
  onValueChange?: (v: string) => void;
  style?: ViewStyle;
};

export function NexaTabs({ children, value, onValueChange, style }: NexaTabsProps) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <View style={[{ flexDirection: 'row', gap: 4 } as ViewStyle, style]}>{children}</View>
    </TabsContext.Provider>
  );
}

export type NexaTabProps = {
  value: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  style?: ViewStyle;
};

export function NexaTab({ value, label, icon, disabled, style }: NexaTabProps) {
  const { theme } = useTheme();
  const ctx = useContext(TabsContext);
  const active = ctx.value === value;

  return (
    <NexaPressable
      disabled={disabled}
      onPress={() => ctx.onValueChange?.(value)}
      accessibilityLabel={label}
      accessibilityRole="tab"
      accessibilityState={{ selected: active, disabled }}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          paddingHorizontal: theme.spacing[3],
          paddingVertical: theme.spacing[2],
          borderRadius: theme.radius.full,
          backgroundColor: active ? theme.colors.primary : 'transparent',
          borderWidth: active ? 0 : 1,
          borderColor: theme.colors.border,
          opacity: disabled ? theme.opacity.disabled : 1,
        } as ViewStyle,
        style as any,
      ]}
    >
      {icon ? <NexaIcon name={icon} size="sm" color={active ? theme.colors.onPrimary : theme.colors.textSecondary} /> : null}
      <NexaText variant="labelSmall" style={{ color: active ? theme.colors.onPrimary : theme.colors.textSecondary } as any}>
        {label}
      </NexaText>
    </NexaPressable>
  );
}

export function NexaTabBar({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  const { theme } = useTheme();
  return (
    <View
      accessibilityRole="tablist"
      style={[
        {
          flexDirection: 'row',
          gap: theme.spacing[2],
          paddingVertical: theme.spacing[1],
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        } as ViewStyle,
        style,
      ]}
    >
      {children}
    </View>
  );
}

export default NexaTabs;
