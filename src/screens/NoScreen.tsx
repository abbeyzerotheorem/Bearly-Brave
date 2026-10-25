import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { colors, fonts, screenPadding } from '../theme';
import { Bear } from '../components/Bear';
import {
  BrandBar,
  Eyebrow,
  PawMark,
  PrimaryButton,
  SecondaryButton,
} from '../components/ui';

export function NoScreen({
  onRestart,
  onAskAgain,
  reducedMotion,
}: {
  onRestart: () => void;
  onAskAgain: () => void;
  reducedMotion: boolean;
}) {
  const { height, width } = useWindowDimensions();
  const compact = height < 870;
  const contentWidth = Math.min(width - screenPadding * 2, 500);

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.inner, { width: contentWidth }]}>
        <BrandBar />

        <View style={styles.heading}>
          <Eyebrow center>ALL GOOD</Eyebrow>
          <Text
            accessibilityRole="header"
            style={[styles.title, compact && styles.titleCompact]}
          >
            That’s completely okay.
          </Text>
        </View>

        <View style={[styles.bearStage, compact && styles.bearStageCompact]}>
          <View style={styles.halo} />
          <Bear
            size={compact ? 168 : 190}
            mood="gentle"
            reducedMotion={reducedMotion}
          />
        </View>

        <Text style={styles.body}>
          Thanks for hearing him out. That took a lot to ask.
        </Text>
        <Text style={styles.bodySoft}>
          No explanation needed. Hand the phone back with a smile — he’ll take
          it from here.
        </Text>

        <View style={styles.note}>
          <PawMark size={14} color={colors.brown} />
          <Text style={styles.noteText}>He’ll survive. He has a bear.</Text>
        </View>

        <View style={styles.actions}>
          <PrimaryButton label="Hand the phone back" onPress={onRestart} />
          <SecondaryButton label="Wait — ask me again" onPress={onAskAgain} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: screenPadding,
    paddingTop: 4,
    paddingBottom: 24,
  },
  inner: {
    alignSelf: 'center',
    flexGrow: 1,
  },
  heading: {
    alignItems: 'center',
    gap: 13,
    marginTop: 13,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 39,
    lineHeight: 43,
    letterSpacing: -1.05,
    color: colors.ink,
    textAlign: 'center',
  },
  titleCompact: {
    fontSize: 35,
    lineHeight: 39,
  },
  bearStage: {
    height: 214,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 3,
  },
  bearStageCompact: {
    height: 198,
  },
  halo: {
    position: 'absolute',
    bottom: 9,
    width: 202,
    height: 202,
    borderRadius: 101,
    backgroundColor: 'rgba(246, 217, 146, 0.34)',
  },
  body: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 16,
    lineHeight: 24,
    color: colors.ink,
    textAlign: 'center',
    maxWidth: 340,
    alignSelf: 'center',
  },
  bodySoft: {
    marginTop: 9,
    fontFamily: fonts.body,
    fontSize: 14.5,
    lineHeight: 22,
    color: colors.inkSoft,
    textAlign: 'center',
    maxWidth: 340,
    alignSelf: 'center',
  },
  note: {
    marginTop: 18,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 253, 248, 0.63)',
    borderWidth: 1,
    borderColor: 'rgba(165, 101, 69, 0.13)',
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  noteText: {
    fontFamily: fonts.displayItalic,
    fontSize: 13,
    lineHeight: 18,
    color: colors.brownDeep,
  },
  actions: {
    marginTop: 22,
    gap: 11,
  },
});
