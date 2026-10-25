import React, { useCallback, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { colors, fonts, screenPadding } from '../theme';
import { tapHaptic } from '../haptics';

type LinePickerProps = {
  title: string;
  lines: string[];
  value: string | null;
  onSelect: (line: string) => void;
  onAdd?: () => void;
  reducedMotion: boolean;
};

export function LinePicker({
  title,
  lines,
  value,
  onSelect,
  onAdd,
  reducedMotion,
}: LinePickerProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    lines.indexOf(value || '')
  );
  const { width } = useWindowDimensions();
  const contentWidth = Math.min(width - screenPadding * 2, 500);

  const handleSelect = useCallback(
    (line: string, index: number) => {
      tapHaptic();
      setSelectedIndex(index);
      onSelect(line);
    },
    [onSelect]
  );

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.inner, { width: contentWidth }]}>
        <Text style={styles.title}>{title}</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}
          style={styles.chipsScroll}
        >
          {lines.map((line, index) => {
            const active = selectedIndex === index;
            return (
              <Pressable
                key={index}
                accessibilityRole="button"
                accessibilityLabel={line}
                accessibilityState={{ selected: active }}
                onPress={() => handleSelect(line, index)}
                hitSlop={8}
                style={({ pressed }) => [
                  styles.chip,
                  active && styles.chipActive,
                  pressed && styles.chipPressed,
                ]}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {line}
                </Text>
              </Pressable>
            );
          })}
          {onAdd && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Add your own line"
              onPress={onAdd}
              hitSlop={8}
              style={styles.addChip}
            >
              <Text style={styles.addChipText}>+</Text>
            </Pressable>
          )}
        </ScrollView>

        {value === null && (
          <Text style={styles.hint}>
            Pick a line to say, or tap one to make it your own.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: screenPadding,
    paddingTop: 10,
    paddingBottom: 24,
  },
  inner: {
    alignSelf: 'center',
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: -0.6,
    color: colors.ink,
    textAlign: 'center',
    marginBottom: 16,
  },
  chipsScroll: {
    paddingBottom: 4,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 253, 248, 0.7)',
    borderWidth: 1.3,
    borderColor: 'rgba(124, 71, 47, 0.16)',
    minWidth: 90,
    alignItems: 'center',
  },
  chipActive: {
    backgroundColor: colors.lavender,
    borderColor: colors.lavender,
  },
  chipPressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.9,
  },
  chipText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.inkSoft,
  },
  chipTextActive: {
    color: colors.white,
  },
  addChip: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 100,
    backgroundColor: colors.butterSoft,
    borderWidth: 1.3,
    borderColor: 'rgba(124, 71, 47, 0.16)',
    minWidth: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addChipText: {
    fontFamily: fonts.bodyBold,
    fontSize: 20,
    color: colors.brownDeep,
  },
  hint: {
    marginTop: 14,
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 20,
    color: colors.muted,
    textAlign: 'center',
  },
});
