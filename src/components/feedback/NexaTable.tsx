import React from 'react';
import { View, ScrollView, type ViewStyle } from 'react-native';
import { NexaText } from '../primitives/NexaText';
import { useTheme } from '../../theme/useTheme';

export type Column<T> = { key: string; header: string; render?: (row: T) => React.ReactNode; width?: number };

export type NexaTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  style?: ViewStyle;
};

export function NexaTable<T extends Record<string, any>>({ columns, data, style }: NexaTableProps<T>) {
  const { theme } = useTheme();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={[{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.md, overflow: 'hidden' } as ViewStyle, style]}>
        <View style={{ flexDirection: 'row', backgroundColor: theme.colors.surfaceVariant, paddingVertical: 8 }}>
          {columns.map((c) => (
            <View key={c.key} style={{ width: c.width ?? 120, paddingHorizontal: 12 }}>
              <NexaText variant="labelSmall" color="textSecondary">{c.header}</NexaText>
            </View>
          ))}
        </View>
        {data.map((row, i) => (
          <View key={i} style={{ flexDirection: 'row', paddingVertical: 10, borderTopWidth: i === 0 ? 0 : 1, borderTopColor: theme.colors.border }}>
            {columns.map((c) => (
              <View key={c.key} style={{ width: c.width ?? 120, paddingHorizontal: 12 }}>
                {c.render ? (c.render(row) as any) : <NexaText variant="bodySmall">{String(row[c.key] ?? '')}</NexaText>}
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export function NexaDataList({ children, style }: { children?: React.ReactNode; style?: ViewStyle }) {
  const { theme } = useTheme();
  return <View style={[{ gap: theme.spacing[2] } as ViewStyle, style]}>{children}</View>;
}

export function NexaTimeline({ items, style }: { items: Array<{ title: string; subtitle?: string }>; style?: ViewStyle }) {
  const { theme } = useTheme();
  return (
    <View style={[{ gap: theme.spacing[3] } as ViewStyle, style]}>
      {items.map((it, i) => (
        <View key={i} style={{ flexDirection: 'row', gap: theme.spacing[3] }}>
          <View style={{ width: 12, alignItems: 'center' }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: theme.colors.primary, marginTop: 4 }} />
            {i < items.length - 1 ? <View style={{ flex: 1, width: 1, backgroundColor: theme.colors.border, marginTop: 4 }} /> : null}
          </View>
          <View style={{ flex: 1, paddingBottom: 12 }}>
            <NexaText variant="labelMedium">{it.title}</NexaText>
            {it.subtitle ? <NexaText variant="caption" color="textSecondary">{it.subtitle}</NexaText> : null}
          </View>
        </View>
      ))}
    </View>
  );
}

export function NexaStat({ label, value, style }: { label: string; value: string; style?: ViewStyle }) {
  return (
    <View style={[{ gap: 2 } as ViewStyle, style]}>
      <NexaText variant="caption" color="textSecondary">{label}</NexaText>
      <NexaText variant="headlineMedium">{value}</NexaText>
    </View>
  );
}

export const NexaMetric = NexaStat;

export default NexaTable;
