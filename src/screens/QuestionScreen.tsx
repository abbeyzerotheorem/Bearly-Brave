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
import { BrandBar, CoffeeCupIcon, Heart, PrimaryButton, SecondaryButton } from '../components/ui';

type QuestionScreenProps = {
  name: string;
  onBack: () => void;
  onYes: () => void;
  onNo: () => void;
  reducedMotion: boolean;
};

export function QuestionScreen({
  name,
  onBack,
  onYes,
  onNo,
  reducedMotion,
}: QuestionScreenProps) {
  const { height, width } = useWindowDimensions();
  const compact = height < 870;
  const contentWidth = Math.min(width - screenPadding * 2, 500);
  const signature = name ? `${name}, via bear` : 'the nervous human, via bear';

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.inner, { width: contentWidth }]}>
        <BrandBar onBack={onBack} />

        <View style={styles.heading}>
          <EyebrowInline center>THE QUESTION</EyebrowInline>
          <Text
            accessibilityRole="header"
            style={[styles.title, compact && styles.titleCompact]}
          >
            Would you like to get coffee with me?
          </Text>
          <View style={styles.signatureRow}>
            <View style={styles.signatureLine} />
            <Text style={styles.signature}>{signature}</Text>
            <View style={styles.signatureLine} />
          </View>
        </View>

        <View style={[styles.bearStage, compact && styles.bearStageCompact]}>
          <View style={styles.bearHalo} />
          <Bear
            size={compact ? 150 : 172}
            mood="nervous"
            reducedMotion={reducedMotion}
          />
          <View style={styles.cupBadge}>
            <CoffeeCupIcon size={32} color={colors.coral} />
          </View>
        </View>

        <Text style={styles.body}>
          No clever lines. No pressure. Just coffee — and a walk, if we’re
          lucky.
        </Text>
        <Text style={styles.ps}>
          P.S. He’s much smoother in person. Either answer is a good answer.
        </Text>

        <View style={styles.actions}>
          <PrimaryButton
            label="Yes, I’d like that"
            onPress={onYes}
            icon={<Heart size={17} color={colors.white} />}
            accessibilityHint="Accept the invitation"
          />
          <SecondaryButton
            label="Not right now"
            onPress={onNo}
            accessibilityHint="Decline gently"
          />
        </View>

        <View style={styles.handoffHint}>
          <Text style={styles.handoffText}>
            Tap your answer, then hand the phone back to{' '}
            <Text style={styles.handoffName}>{name || 'him'}</Text>.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: 11,
    marginTop: 22,
  },
  bearHalo: {
    backgroundColor: 'rgba(249, 208, 193, 0.48)',
    borderRadius: 95,
    bottom: 6,
    height: 190,
    position: 'absolute',
    width: 190,
  },
  bearStage: {
    alignItems: 'center',
    height: 210,
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  bearStageCompact: {
    height: 184,
  },
  body: {
    alignSelf: 'center',
    color: colors.inkSoft,
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 13,
    maxWidth: 340,
    textAlign: 'center',
  },
  content: {
    flexGrow: 1,
    paddingBottom: 24,
    paddingHorizontal: screenPadding,
    paddingTop: 4,
  },
  cupBadge: {
    alignItems: 'center',
    backgroundColor: colors.paper,
    borderColor: 'rgba(165, 101, 69, 0.14)',
    borderRadius: 26,
    borderWidth: 1,
    bottom: 16,
    elevation: 4,
    height: 52,
    justifyContent: 'center',
    position: 'absolute',
    right: '22%',
    shadowColor: '#6F3B27',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    transform: [{ rotate: '7deg' }],
    width: 52,
  },
  eyebrowInline: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.butterSoft,
    borderColor: 'rgba(165, 101, 69, 0.12)',
    borderRadius: 100,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 7,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  eyebrowInlineText: {
    color: colors.brownDeep,
    fontFamily: fonts.bodyBlack,
    fontSize: 10,
    letterSpacing: 1.45,
  },
  handoffHint: {
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: 16,
  },
  handoffName: {
    color: colors.ink,
    fontFamily: fonts.bodyBold,
  },
  handoffText: {
    color: colors.muted,
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
  heading: {
    alignItems: 'center',
    marginTop: 6,
  },
  inner: {
    alignSelf: 'center',
    flexGrow: 1,
  },
  ps: {
    alignSelf: 'center',
    color: colors.muted,
    fontFamily: fonts.displayItalic,
    fontSize: 13.5,
    lineHeight: 20,
    marginTop: 8,
    maxWidth: 340,
    textAlign: 'center',
  },
  scroll: {
    flex: 1,
  },
  signature: {
    color: colors.brownDeep,
    fontFamily: fonts.displayItalic,
    fontSize: 15.5,
    lineHeight: 21,
  },
  signatureLine: {
    backgroundColor: 'rgba(165, 101, 69, 0.26)',
    height: 1,
    width: 22,
  },
  signatureRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  title: {
    color: colors.ink,
    fontFamily: fonts.display,
    fontSize: 34,
    letterSpacing: -0.9,
    lineHeight: 39,
    marginTop: 12,
    maxWidth: 350,
    textAlign: 'center',
  },
  titleCompact: {
    fontSize: 31,
    lineHeight: 36,
  },
});

function EyebrowInline({
  children,
  center = false,
}: {
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <View
      style={[
        { alignSelf: center ? 'center' : 'flex-start' },
        styles.eyebrowInline,
      ]}
    >
      <Text style={styles.eyebrowInlineText}>{children}</Text>
    </View>
  );
}
