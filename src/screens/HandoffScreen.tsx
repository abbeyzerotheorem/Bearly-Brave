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
import { BrandBar, PrimaryButton } from '../components/ui';
import { tapHaptic } from '../haptics';

type HandoffScreenProps = {
  /** The owner's name. */
  name: string;
  /**
   * Kept so the parent still compiles. This screen deliberately does NOT
   * show it: both people can see the phone, and she should decide who learns
   * her answer first. The owner's next screen does the reveal.
   */
  answer?: 'yes' | 'no';
  /** Fires when the OWNER taps "I’ve got my phone back". */
  onGiveBack: () => void;
  reducedMotion: boolean;
};

export function HandoffScreen({
  name,
  onGiveBack,
  reducedMotion,
}: HandoffScreenProps) {
  const { height, width } = useWindowDimensions();
  const compact = height < 870;
  const contentWidth = Math.min(width - screenPadding * 2, 500);
  const displayName = name || 'the nervous human';

  const handleBack = () => {
    tapHaptic();
    onGiveBack();
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.inner, { width: contentWidth }]}>
        {/* No settings or back button here: she's holding the phone. */}
        <BrandBar />

        <View style={styles.heading}>
          <Text
            accessibilityRole="header"
            style={[styles.title, compact && styles.titleCompact]}
          >
            Hand it back.
          </Text>
        </View>

        <View style={[styles.bearStage, compact && styles.bearStageCompact]}>
          <View style={styles.halo} />
          <Bear
            size={compact ? 172 : 198}
            mood="wave"
            reducedMotion={reducedMotion}
          />
        </View>

        <Text style={styles.body}>
          Thanks for answering. Pass the phone back to {displayName}. I’ll
          pretend I wasn’t listening.
        </Text>

        <View style={styles.actions}>
          <Text style={styles.cue}>
            Tap once the phone is back where it belongs.
          </Text>
          <PrimaryButton
            label="I’ve got my phone back"
            onPress={handleBack}
            accessibilityHint="Shows the bear’s message for the phone’s owner. This one is for the owner to tap."
          />
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
    marginTop: 14,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 43,
    lineHeight: 47,
    letterSpacing: -1.25,
    color: colors.ink,
    textAlign: 'center',
  },
  titleCompact: {
    fontSize: 37,
    lineHeight: 42,
  },
  bearStage: {
    height: 218,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 2,
  },
  bearStageCompact: {
    height: 202,
  },
  halo: {
    position: 'absolute',
    bottom: 8,
    width: 196,
    height: 196,
    borderRadius: 98,
    backgroundColor: 'rgba(246, 217, 146, 0.4)',
  },
  body: {
    marginTop: 14,
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 23,
    color: colors.inkSoft,
    textAlign: 'center',
    maxWidth: 340,
    alignSelf: 'center',
  },
  actions: {
    marginTop: 'auto',
    paddingTop: 22,
    gap: 8,
  },
  cue: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 13.5,
    lineHeight: 19,
    color: colors.coral,
    textAlign: 'center',
  },
});
