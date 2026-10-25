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
  CoffeeCupIcon,
  Heart,
  PrimaryButton,
  SecondaryButton,
  Eyebrow,
} from '../components/ui';

export function AskScreen({
  name,
  onBack,
  onYes,
  onNo,
  reducedMotion,
}: {
  name: string;
  onBack: () => void;
  onYes: () => void;
  onNo: () => void;
  reducedMotion: boolean;
}) {
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
          <Eyebrow center>THE ACTUAL QUESTION</Eyebrow>
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
            mood="gentle"
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
    marginTop: 6,
  },
  title: {
    marginTop: 12,
    fontFamily: fonts.display,
    fontSize: 34,
    lineHeight: 39,
    letterSpacing: -0.9,
    color: colors.ink,
    textAlign: 'center',
    maxWidth: 350,
  },
  titleCompact: {
    fontSize: 31,
    lineHeight: 36,
  },
  signatureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 16,
  },
  signatureLine: {
    height: 1,
    width: 22,
    backgroundColor: 'rgba(165, 101, 69, 0.26)',
  },
  signature: {
    fontFamily: fonts.displayItalic,
    fontSize: 15.5,
    lineHeight: 21,
    color: colors.brownDeep,
  },
  bearStage: {
    height: 210,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  bearStageCompact: {
    height: 184,
  },
  bearHalo: {
    position: 'absolute',
    bottom: 6,
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: 'rgba(249, 208, 193, 0.48)',
  },
  cupBadge: {
    position: 'absolute',
    right: '22%',
    bottom: 16,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.paper,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(165, 101, 69, 0.14)',
    shadowColor: '#6F3B27',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
    transform: [{ rotate: '7deg' }],
  },
  body: {
    marginTop: 13,
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 23,
    color: colors.inkSoft,
    textAlign: 'center',
    maxWidth: 340,
    alignSelf: 'center',
  },
  ps: {
    marginTop: 8,
    fontFamily: fonts.displayItalic,
    fontSize: 13.5,
    lineHeight: 20,
    color: colors.muted,
    textAlign: 'center',
    maxWidth: 340,
    alignSelf: 'center',
  },
  actions: {
    marginTop: 22,
    gap: 11,
  },
});
