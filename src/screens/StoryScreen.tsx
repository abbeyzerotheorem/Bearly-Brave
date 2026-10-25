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
  actions: {
    gap: 10,
    marginTop: 'auto',
    paddingTop: 36,
  },
  content: {
    flexGrow: 1,
    paddingBottom: 24,
    paddingHorizontal: screenPadding,
    paddingTop: 4,
  },
  footer: {
    color: colors.muted,
    fontFamily: fonts.body,
    fontSize: 11.5,
    lineHeight: 17,
    textAlign: 'center',
  },
  heading: {
    alignItems: 'flex-start',
    marginTop: 22,
  },
  inner: {
    alignSelf: 'center',
    flexGrow: 1,
  },
  lead: {
    color: colors.inkSoft,
    fontFamily: fonts.body,
    fontSize: 15.5,
    lineHeight: 24,
    marginTop: 17,
    maxWidth: 390,
  },
  miniBear: {
    alignItems: 'center',
    bottom: -16,
    height: 130,
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 2,
    width: 112,
  },
  miniBearNarrow: {
    height: 108,
    right: -4,
    width: 92,
  },
  noteCard: {
    alignItems: 'flex-end',
    backgroundColor: colors.butterSoft,
    borderColor: 'rgba(165, 101, 69, 0.13)',
    borderRadius: 22,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 150,
    overflow: 'visible',
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 116,
    paddingTop: 22,
  },
  noteCopy: {
    flex: 1,
    paddingBottom: 1,
    paddingRight: 4,
  },
  noteCopyNarrow: {
    paddingRight: 2,
  },
  noteWrap: {
    marginTop: 30,
    position: 'relative',
  },
  quote: {
    color: colors.brownDeep,
    fontFamily: fonts.displayItalic,
    fontSize: 19,
    letterSpacing: -0.2,
    lineHeight: 26,
  },
  scroll: {
    flex: 1,
  },
  signature: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    marginTop: 12,
  },
  signatureText: {
    color: colors.brown,
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 0.9,
    textTransform: 'uppercase',
  },
  tape: {
    backgroundColor: 'rgba(246, 217, 146, 0.72)',
    borderRadius: 2,
    height: 23,
    left: '32%',
    position: 'absolute',
    top: -10,
    transform: [{ rotate: '-2.5deg' }],
    width: 78,
    zIndex: 3,
  },
  title: {
    color: colors.ink,
    fontFamily: fonts.display,
    fontSize: 42,
    letterSpacing: -1.15,
    lineHeight: 46,
    marginTop: 15,
    maxWidth: 390,
  },
});
