import React, { createContext, useContext, useCallback, useState, useRef } from 'react';
import { View, Text, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { NexaPressable } from '../primitives/NexaPressable';
import { NexaIcon } from '../../icons';

export type ToastVariant = 'default' | 'success' | 'warning' | 'destructive';
export type ToastOptions = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  actionLabel?: string;
  onAction?: () => void;
};

type ToastItem = ToastOptions & { id: string };

type ToastContextValue = {
  toasts: ToastItem[];
  toast: (opts: ToastOptions) => string;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `toast-${idCounter}-${Date.now()}`;
}

/**
 * NexaToastProvider — wraps app to enable `useToast().toast({ title, variant })`.
 * Renders a bottom-anchored queue with auto-dismiss.
 */
export function NexaToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const tm = timers.current.get(id);
    if (tm) clearTimeout(tm);
    timers.current.delete(id);
  }, []);

  const toast = useCallback(
    (opts: ToastOptions) => {
      const id = nextId();
      const item: ToastItem = { variant: 'default', duration: 3500, ...opts, id };
      setToasts((prev) => [...prev.slice(-2), item]); // keep max 3 visible
      if (item.duration && item.duration > 0) {
        const tm = setTimeout(() => dismiss(id), item.duration);
        timers.current.set(id, tm);
      }
      return id;
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <NexaToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('[NexaUI] useToast() must be used within <NexaToastProvider>');
  return ctx;
}

function NexaToastViewport({ toasts, onDismiss }: { toasts: ToastItem[]; onDismiss: (id: string) => void }) {
  const { theme } = useTheme();
  if (toasts.length === 0) return null;

  return (
    <View
      pointerEvents="box-none"
      style={{
        position: 'absolute',
        left: theme.spacing[4],
        right: theme.spacing[4],
        bottom: theme.spacing[8],
        gap: 8,
        zIndex: 9999,
      } as ViewStyle}
    >
      {toasts.map((t) => (
        <NexaToastItem key={t.id} item={t} onDismiss={onDismiss} />
      ))}
    </View>
  );
}

function NexaToastItem({ item, onDismiss }: { item: ToastItem; onDismiss: (id: string) => void }) {
  const { theme } = useTheme();
  const bg =
    item.variant === 'success'
      ? theme.colors.success
      : item.variant === 'destructive'
        ? theme.colors.destructive
        : item.variant === 'warning'
          ? theme.colors.warning
          : theme.colors.surfaceElevated;

  const fg =
    item.variant === 'default' ? theme.colors.foreground : '#FFFFFF';

  const icon =
    item.variant === 'success' ? 'check' : item.variant === 'destructive' ? 'alert' : item.variant === 'warning' ? 'warning' : 'info';

  return (
    <View
      accessible
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          paddingHorizontal: 14,
          paddingVertical: 12,
          borderRadius: theme.radius.lg,
          backgroundColor: bg,
          borderWidth: item.variant === 'default' ? 1 : 0,
          borderColor: theme.colors.border,
        } as ViewStyle,
        theme.elevation[3] as any,
      ]}
    >
      <NexaIcon name={icon} size="sm" color={fg} />
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={{ color: fg, fontSize: 14, fontWeight: '600' } as TextStyle}>{item.title}</Text>
        {item.description ? (
          <Text style={{ color: fg, fontSize: 12, opacity: 0.9 } as TextStyle}>{item.description}</Text>
        ) : null}
      </View>
      {item.actionLabel && item.onAction ? (
        <NexaPressable
          onPress={() => {
            item.onAction?.();
            onDismiss(item.id);
          }}
          accessibilityLabel={item.actionLabel}
          accessibilityRole="button"
          style={{ paddingHorizontal: 8, paddingVertical: 4 } as ViewStyle}
        >
          <Text style={{ color: fg, fontSize: 12, fontWeight: '700' } as TextStyle}>{item.actionLabel}</Text>
        </NexaPressable>
      ) : null}
      <NexaPressable
        onPress={() => onDismiss(item.id)}
        accessibilityLabel="Dismiss"
        accessibilityRole="button"
        style={{ padding: 4 } as ViewStyle}
      >
        <NexaIcon name="x" size="sm" color={fg} />
      </NexaPressable>
    </View>
  );
}

// Standalone static toast (without provider) — renders single inline banner
export function NexaToast({ title, description, variant = 'default' }: ToastOptions) {
  const { theme } = useTheme();
  const bg = variant === 'destructive' ? theme.colors.destructive : theme.colors.surface;
  return (
    <View style={{ backgroundColor: bg, padding: 12, borderRadius: theme.radius.md } as ViewStyle}>
      <Text style={{ color: theme.colors.foreground } as TextStyle}>{title}</Text>
      {description ? <Text style={{ color: theme.colors.textSecondary } as TextStyle}>{description}</Text> : null}
    </View>
  );
}

export default NexaToast;
