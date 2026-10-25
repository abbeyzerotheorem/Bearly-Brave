import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { colors, fonts, screenPadding, shadow } from '../theme';
import { Bear } from '../components/Bear';
import {
  BrandBar,
  Eyebrow,
  PawMark,
  PrimaryButton,
} from '../components/ui';

export function StoryScreen({
  onBack,
  onContinue,
  reducedMotion,
}: {
  onBack: () => void;
  onContinue: () => void;
  reducedMotion: boolean;
}) {
  const { width } = useWindowDimensions();
  const narrow = width < 360;
  const contentWidth = Math.min(width - screenPadding * 2, 500);

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.inner, { width: contentWidth }]}>
        <BrandBar onBack={onBack} />

        <View style={styles.heading}>
          <Eyebrow>THE SITUATION</Eyebrow>
          <Text accessibilityRole="header" style={styles.title}>
            He hasn’t got the words today.
          </Text>
          <Text style={styles.lead}>
            The human holding this phone wanted to talk to you. Asking you out
            mattered too much to skip — so he brought a bear instead.
          </Text>
        </View>

        <View style={styles.noteWrap}>
          <View style={styles.tape} />
          <View style={[styles.noteCard, shadow.card]}>
            <View style={[styles.noteCopy, narrow && styles.noteCopyNarrow]}>
              <Text style={styles.quote}>
                “I’m told he’s kind, funny, and currently holding this phone
                much too tightly.”
              </Text>
              <View style={styles.signature}>
                <PawMark size={13} color={colors.brown} />
                <Text style={styles.signatureText}>the bear</Text>
              </View>
            </View>
            <View style={[styles.miniBear, narrow && styles.miniBearNarrow]}>
              <Bear
                size={narrow ? 90 : 112}
                mood="gentle"
                reducedMotion={reducedMotion}
              />
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <PrimaryButton
            label="Okay, what’s the question?"
            onPress={onContinue}
            accessibilityHint="Continue to the question"
          />
          <Text style={styles.footer}>
            It’s a good one. Bear’s honor.
          </Text>
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
    marginTop: 22,
    alignItems: 'flex-start',
  },
  title: {
    marginTop: 15,
    fontFamily: fonts.display,
    fontSize: 42,
    lineHeight: 46,
    letterSpacing: -1.15,
    color: colors.ink,
    maxWidth: 390,
  },
  lead: {
    marginTop: 17,
    fontFamily: fonts.body,
    fontSize: 15.5,
    lineHeight: 24,
    color: colors.inkSoft,
    maxWidth: 390,
  },
  noteWrap: {
    marginTop: 30,
    position: 'relative',
  },
  tape: {
    position: 'absolute',
    top: -10,
    left: '32%',
    width: 78,
    height: 23,
    backgroundColor: 'rgba(246, 217, 146, 0.72)',
    borderRadius: 2,
    transform: [{ rotate: '-2.5deg' }],
    zIndex: 3,
  },
  noteCard: {
    minHeight: 150,
    backgroundColor: colors.butterSoft,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(165, 101, 69, 0.13)',
    paddingTop: 22,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 116,
    flexDirection: 'row',
    alignItems: 'flex-end',
    overflow: 'visible',
  },
  noteCopy: {
    flex: 1,
    paddingRight: 4,
    paddingBottom: 1,
  },
  noteCopyNarrow: {
    paddingRight: 2,
  },
  quote: {
    fontFamily: fonts.displayItalic,
    fontSize: 19,
    lineHeight: 26,
    letterSpacing: -0.2,
    color: colors.brownDeep,
  },
  signature: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  signatureText: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 0.9,
    textTransform: 'uppercase',
    color: colors.brown,
  },
  miniBear: {
    position: 'absolute',
    right: 2,
    bottom: -16,
    width: 112,
    height: 130,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  miniBearNarrow: {
    right: -4,
    width: 92,
    height: 108,
  },
  actions: {
    marginTop: 'auto',
    paddingTop: 36,
    gap: 10,
  },
  footer: {
    textAlign: 'center',
    fontFamily: fonts.body,
    fontSize: 11.5,
    lineHeight: 17,
    color: colors.muted,
  },
});
