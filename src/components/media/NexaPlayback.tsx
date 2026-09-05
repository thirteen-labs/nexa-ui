import React from 'react';
import { View, type ViewStyle, type TextStyle } from 'react-native';
import { NexaPressable } from '../primitives/NexaPressable';
import { NexaText } from '../primitives/NexaText';
import { NexaIcon } from '../../icons';
import { NexaAlbumArt } from './NexaAlbumArt';
import { useTheme } from '../../theme/useTheme';

// ─── PlayButton ────────────────────────────────────────────────────
export type NexaPlayButtonProps = {
  playing?: boolean;
  onPress?: () => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  accessibilityLabel?: string;
};

export function NexaPlayButton({ playing, onPress, size = 'md', disabled, accessibilityLabel }: NexaPlayButtonProps) {
  const { theme } = useTheme();
  const dim = size === 'sm' ? 40 : size === 'lg' ? 64 : 52;
  const iconSize = size === 'sm' ? 'md' : size === 'lg' ? 'xl' : 'lg';

  return (
    <NexaPressable
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel ?? (playing ? 'Pause' : 'Play')}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={[
        {
          width: dim,
          height: dim,
          borderRadius: dim / 2,
          backgroundColor: theme.colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled ? theme.opacity.disabled : 1,
        } as ViewStyle,
        theme.elevation[2] as any,
      ]}
    >
      <NexaIcon name={playing ? 'pause' : 'play'} size={iconSize as any} color={theme.colors.onPrimary} />
    </NexaPressable>
  );
}

// ─── SeekBar / ProgressBar ─────────────────────────────────────────
export type NexaSeekBarProps = {
  value: number;
  max?: number;
  onValueChange?: (v: number) => void;
  buffered?: number;
  disabled?: boolean;
  showTime?: boolean;
  formatTime?: (seconds: number) => string;
  style?: ViewStyle;
};

function fmt(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function NexaSeekBar({ value, max = 100, buffered, disabled, showTime, formatTime, style }: NexaSeekBarProps) {
  const { theme } = useTheme();
  const pct = Math.max(0, Math.min(100, (value / (max || 100)) * 100));
  const bufPct = buffered !== undefined ? Math.max(0, Math.min(100, (buffered / (max || 100)) * 100)) : 0;

  return (
    <View
      accessible
      accessibilityRole="adjustable"
      accessibilityValue={{ min: 0, max, now: value }}
      accessibilityState={{ disabled }}
      style={[{ gap: 6, opacity: disabled ? theme.opacity.disabled : 1 } as ViewStyle, style]}
    >
      <View style={{ height: 4, borderRadius: theme.radius.full, backgroundColor: theme.colors.muted, overflow: 'hidden' } as ViewStyle}>
        {bufPct > 0 ? (
          <View style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${bufPct}%`, backgroundColor: theme.colors.borderStrong, borderRadius: theme.radius.full } as ViewStyle} />
        ) : null}
        <View style={{ width: `${pct}%`, height: '100%', backgroundColor: theme.colors.primary, borderRadius: theme.radius.full } as ViewStyle} />
      </View>
      {/* Thumb */}
      <View style={{ height: 12, justifyContent: 'center' }}>
        <View
          style={{
            position: 'absolute',
            left: `${pct}%`,
            marginLeft: -6,
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: theme.colors.primary,
            borderWidth: 2,
            borderColor: theme.colors.surface,
          } as ViewStyle}
        />
      </View>
      {showTime ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <NexaText variant="caption" color="textSecondary">
            {(formatTime ?? fmt)(value)}
          </NexaText>
          <NexaText variant="caption" color="textSecondary">
            {(formatTime ?? fmt)(max)}
          </NexaText>
        </View>
      ) : null}
    </View>
  );
}

export function NexaProgressBar(props: NexaSeekBarProps) {
  return <NexaSeekBar {...props} />;
}

// ─── MiniPlayer ────────────────────────────────────────────────────
export type NexaMiniPlayerProps = {
  title: string;
  artist?: string;
  artwork?: string;
  playing?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onPress?: () => void;
  style?: ViewStyle;
};

export function NexaMiniPlayer({ title, artist, artwork, playing, onPlay, onPause, onPress, style }: NexaMiniPlayerProps) {
  const { theme } = useTheme();
  const toggle = playing ? onPause : onPlay;

  return (
    <NexaPressable
      onPress={onPress}
      accessibilityLabel={`${title}${artist ? ` by ${artist}` : ''}${playing ? ', playing' : ''}`}
      accessibilityRole="button"
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing[3],
          paddingHorizontal: theme.spacing[3],
          paddingVertical: theme.spacing[2],
          backgroundColor: theme.colors.surfaceElevated,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          borderRadius: 0,
        } as ViewStyle,
        theme.elevation[3] as any,
        style as any,
      ]}
    >
      <NexaAlbumArt src={artwork} alt={title} size="sm" />
      <View style={{ flex: 1, gap: 2 }}>
        <NexaText variant="labelMedium" truncate={1}>
          {title}
        </NexaText>
        {artist ? (
          <NexaText variant="caption" color="textSecondary" truncate={1}>
            {artist}
          </NexaText>
        ) : null}
      </View>
      <NexaPlayButton playing={playing} onPress={toggle} size="sm" accessibilityLabel={playing ? 'Pause' : 'Play'} />
    </NexaPressable>
  );
}

// ─── PlaybackControls ──────────────────────────────────────────────
export type NexaPlaybackControlsProps = {
  playing?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  shuffle?: boolean;
  onShuffleToggle?: () => void;
  repeat?: 'off' | 'one' | 'all';
  onRepeatToggle?: () => void;
  style?: ViewStyle;
};

export function NexaPlaybackControls({
  playing,
  onPlay,
  onPause,
  onNext,
  onPrev,
  shuffle,
  onShuffleToggle,
  repeat = 'off',
  onRepeatToggle,
  style,
}: NexaPlaybackControlsProps) {
  const { theme } = useTheme();
  const muted = theme.colors.textTertiary;
  const active = theme.colors.primary;

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: theme.spacing[3] } as ViewStyle, style]}>
      <NexaPressable onPress={onShuffleToggle} accessibilityLabel={`Shuffle ${shuffle ? 'on' : 'off'}`} accessibilityRole="button" style={{ padding: 6 } as ViewStyle}>
        <NexaIcon name="shuffle" size="sm" color={shuffle ? active : muted} />
      </NexaPressable>
      <NexaPressable onPress={onPrev} accessibilityLabel="Previous" accessibilityRole="button" style={{ padding: 8 } as ViewStyle}>
        <NexaIcon name="prev" size="md" color={theme.colors.foreground} />
      </NexaPressable>
      <NexaPlayButton playing={playing} onPress={playing ? onPause : onPlay} size="lg" />
      <NexaPressable onPress={onNext} accessibilityLabel="Next" accessibilityRole="button" style={{ padding: 8 } as ViewStyle}>
        <NexaIcon name="next" size="md" color={theme.colors.foreground} />
      </NexaPressable>
      <NexaPressable onPress={onRepeatToggle} accessibilityLabel={`Repeat ${repeat}`} accessibilityRole="button" style={{ padding: 6 } as ViewStyle}>
        <NexaIcon name={repeat === 'one' ? 'repeat-one' : 'repeat'} size="sm" color={repeat !== 'off' ? active : muted} />
      </NexaPressable>
    </View>
  );
}
