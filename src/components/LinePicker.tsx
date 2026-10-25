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
};

export function LinePicker({
  title,
  lines,
  value,
  onSelect,
  onAdd,
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
  addChip: {
    alignItems: 'center',
    backgroundColor: colors.butterSoft,
    borderColor: 'rgba(124, 71, 47, 0.16)',
    borderRadius: 100,
    borderWidth: 1.3,
    justifyContent: 'center',
    minWidth: 42,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  addChipText: {
    color: colors.brownDeep,
    fontFamily: fonts.bodyBold,
    fontSize: 20,
  },
  chip: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 253, 248, 0.7)',
    borderColor: 'rgba(124, 71, 47, 0.16)',
    borderRadius: 100,
    borderWidth: 1.3,
    minWidth: 90,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  chipActive: {
    backgroundColor: colors.lavender,
    borderColor: colors.lavender,
  },
  chipPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.96 }],
  },
  chipText: {
    color: colors.inkSoft,
    fontFamily: fonts.bodySemiBold,
    fontSize: 12.5,
    lineHeight: 18,
  },
  chipTextActive: {
    color: colors.white,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  chipsScroll: {
    paddingBottom: 4,
  },
  content: {
    paddingBottom: 24,
    paddingHorizontal: screenPadding,
    paddingTop: 10,
  },
  hint: {
    color: colors.muted,
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 14,
    textAlign: 'center',
  },
  inner: {
    alignSelf: 'center',
  },
  scroll: {
    flex: 1,
  },
  title: {
    color: colors.ink,
    fontFamily: fonts.display,
    fontSize: 26,
    letterSpacing: -0.6,
    lineHeight: 32,
    marginBottom: 16,
    textAlign: 'center',
  },
});
