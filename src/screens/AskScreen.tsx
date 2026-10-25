import React, { useEffect, useRef, useState } from 'react';
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
} from '../components/ui';
import { tapHaptic } from '../haptics';

const DEFAULT_QUESTION = 'Would you like to get coffee with me?';
const DEFAULT_BODY =
  'No clever lines. No pressure. Just coffee — and a walk, if we’re lucky.';
// Used when the owner sets their own question but no body, so a dinner
// invite never says "just coffee".
const GENERIC_BODY = 'No clever lines. No pressure. Just an honest question.';

// How long the bear celebrates a yes before the next screen. Declining gets
// no delay on purpose: "no" must always be the faster, easier tap.
const YES_BEAT_MS = 900;
const YES_BEAT_REDUCED_MS = 600;

export type AskScreenProps = {
  /** The owner's name, for the signature line. */
  name: string;
  /** Optional: remove on her screens if back could lead to the owner's settings. */
  onBack?: () => void;
  onYes: () => void;
  onNo: () => void;
  reducedMotion: boolean;
  /** From the owner's settings. Omit to keep the original coffee invite. */
  question?: string;
  body?: string;
  /** Full P.S. line, without the "P.S." prefix. */
  ps?: string;
  /** Icon in the badge beside the bear. */
  badge?: React.ReactNode;
};

export function AskScreen({
  name,
  onBack,
  onYes,
  onNo,
  reducedMotion,
  question,
  body,
  ps,
  badge,
}: AskScreenProps) {
  const { height, width } = useWindowDimensions();
  const compact = height < 870;
  const contentWidth = Math.min(width - screenPadding * 2, 500);

  const [answered, setAnswered] = useState(false);
  const yesTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (yesTimer.current) clearTimeout(yesTimer.current);
    },
    [],
  );

  const customQuestion = Boolean(question?.trim());
  const shownQuestion = customQuestion ? question!.trim() : DEFAULT_QUESTION;
  const shownBody = body ?? (customQuestion ? GENERIC_BODY : DEFAULT_BODY);
  const shownPs =
    ps ??
    `${name || 'The human'} is much smoother in person. Either answer is a good answer.`;
  const shownBadge =
    badge ??
    (customQuestion ? (
      <Heart size={26} color={colors.coral} />
    ) : (
      <CoffeeCupIcon size={32} color={colors.coral} />
    ));
  const signature = name ? `${name}, via bear` : 'the nervous human, via bear';

  const handleYes = () => {
    if (answered) return;
    tapHaptic();
    setAnswered(true);
    yesTimer.current = setTimeout(
      onYes,
      reducedMotion ? YES_BEAT_REDUCED_MS : YES_BEAT_MS,
    );
  };

  const handleNo = () => {
    if (answered) return;
    tapHaptic();
    onNo();
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.inner, { width: contentWidth }]}>
        <BrandBar onBack={onBack} />

        <View style={styles.heading}>
          <Text
            accessibilityRole="header"
            style={[styles.title, compact && styles.titleCompact]}
          >
            {shownQuestion}
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
            mood={answered ? 'inLove' : 'gentle'}
            reducedMotion={reducedMotion}
          />
          <View style={styles.cupBadge}>{shownBadge}</View>
        </View>

        <Text style={styles.body}>{shownBody}</Text>
        <Text style={styles.ps}>P.S. {shownPs}</Text>

        <View style={styles.actions}>
          <PrimaryButton
            label="Yes, I’d like that"
            onPress={handleYes}
            icon={<Heart size={17} color={colors.white} />}
            accessibilityHint="Accept the invitation"
          />
          <SecondaryButton
            label="Not right now"
            onPress={handleNo}
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
    marginTop: 14,
  },
  title: {
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
