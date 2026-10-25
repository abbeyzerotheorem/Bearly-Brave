import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { colors, fonts, screenPadding } from '../theme';
import { Bear } from '../components/Bear';
import { FloatingHearts } from '../components/FloatingHearts';
import { BrandBar, PawMark, PrimaryButton } from '../components/ui';
import { boopHaptic, tapHaptic } from '../haptics';

export type Role = 'owner' | 'guest';

type Phase = 'ready' | 'handoff';

const BOOP_HINT = 'psst… boop the bear';

const BOOPS = [
  'eep! Okay, you’re fun.',
  'Careful. I blush easily.',
  'My human is watching. Act natural.',
  'That tickles. Do it again.',
  'Right. Back to being professional.',
  'Okay, you’re not stopping. I respect it.',
  'Boop count: classified.',
  'Fine. Now go bother my human.',
];

export type WelcomeScreenProps = {
  /**
   * Fires when SHE taps "I’ve got the phone" on the handoff step.
   * Always emits 'guest' now; the owner path no longer exists on this screen.
   */
  onStart: (role: Role) => void;
  onSettings: () => void;
  reducedMotion: boolean;
  /** Pass false when the settings bio is empty so the owner gets warned. */
  hasBio?: boolean;
};

export function WelcomeScreen({
  onStart,
  onSettings,
  reducedMotion,
  hasBio = true,
}: WelcomeScreenProps) {
  const { height, width } = useWindowDimensions();
  const compact = height < 740;
  const contentWidth = Math.min(width - screenPadding * 2, 500);

  const [phase, setPhase] = useState<Phase>('ready');
  const [boopCount, setBoopCount] = useState(0);
  const [excited, setExcited] = useState(false);
  const [dizzy, setDizzy] = useState(false);
  const streak = useRef(0);
  const calmTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (calmTimer.current) clearTimeout(calmTimer.current);
    },
    [],
  );

  // Counter + mood for every boop. No haptic in here: Bear already fires its
  // own when tapped, so only the pill adds one (pillBoop). Otherwise the bear
  // buzzes twice.
  const registerBoop = useCallback(() => {
    streak.current += 1;
    setBoopCount((count) => count + 1);
    setExcited(true);
    setDizzy(streak.current >= 6);
    if (calmTimer.current) clearTimeout(calmTimer.current);
    calmTimer.current = setTimeout(() => {
      streak.current = 0;
      setExcited(false);
      setDizzy(false);
    }, 1400);
  }, []);

  const pillBoop = () => {
    boopHaptic();
    registerBoop();
  };

  const boopLabel = dizzy
    ? 'Whoa. The room is spinning.'
    : boopCount === 0
      ? BOOP_HINT
      : BOOPS[(boopCount - 1) % BOOPS.length];

  const goHandoff = () => {
    tapHaptic();
    setPhase('handoff');
  };

  const goBack = () => {
    tapHaptic();
    setPhase('ready');
  };

  const begin = () => {
    tapHaptic();
    onStart('guest');
  };

  const isReady = phase === 'ready';

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.content,
        compact && styles.contentCompact,
      ]}
      showsVerticalScrollIndicator={false}
      bounces
    >
      <View style={[styles.inner, { width: contentWidth }]}>
        {isReady ? (
          <BrandBar onSettings={onSettings} />
        ) : (
          <View style={styles.barSpacer} />
        )}

        <View style={styles.heading}>
          <Text
            accessibilityRole="header"
            style={[styles.title, compact && styles.titleCompact]}
          >
            {isReady ? 'Ready to begin?' : 'Hand the phone to her.'}
          </Text>
        </View>

        <View style={[styles.hero, compact && styles.heroCompact]}>
          <View style={[styles.arch, compact && styles.archCompact]} />
          <View style={styles.ring} />
          <FloatingHearts reducedMotion={reducedMotion} style={styles.hearts} />
          <Bear
            size={compact ? 198 : 232}
            mood={dizzy ? 'dizzy' : excited || !isReady ? 'cheer' : 'wave'}
            onBoop={registerBoop}
            reducedMotion={reducedMotion}
          />
          {isReady && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Boop the bear"
              accessibilityLiveRegion="polite"
              onPress={pillBoop}
              style={({ pressed }) => [
                styles.boopPill,
                boopCount > 0 && styles.boopPillActive,
                pressed && styles.boopPillPressed,
              ]}
            >
              <PawMark size={13} color={colors.coral} />
              <Text style={styles.boopText} numberOfLines={2}>
                {boopLabel}
              </Text>
            </Pressable>
          )}
        </View>

        {isReady ? (
          <>
            <Text style={styles.body}>
              Say yes and I’ll tell you exactly what to do with the phone.
              <Text style={styles.bodyEmphasis}>
                {' '}
                Spoiler: it leaves your hands.
              </Text>
            </Text>

            {!hasBio && (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Your bio is empty. Open settings to add it."
                onPress={onSettings}
                style={({ pressed }) => [
                  styles.bioNudge,
                  pressed && styles.linkPressed,
                ]}
              >
                <Text style={styles.bioNudgeText}>
                  Your bio is empty, so I’ll have nothing to say about you. Tap
                  to fix it.
                </Text>
              </Pressable>
            )}

            <View style={styles.actions}>
              <PrimaryButton
                label="Yes, I’m ready"
                onPress={goHandoff}
                accessibilityHint="Next, you’ll be asked to hand the phone over"
              />
            </View>
          </>
        ) : (
          <>
            <Text style={styles.body}>
              I’ll introduce myself, then I’ll introduce you.
              <Text style={styles.bodyEmphasis}>
                {' '}
                Stay quiet and look confident.
              </Text>
            </Text>

            <View style={styles.actions}>
              <Text style={styles.cue}>
                Her turn. Tap once you’re holding the phone.
              </Text>
              <PrimaryButton
                label="I’ve got the phone"
                onPress={begin}
                accessibilityHint="Starts the bear’s introduction. This one is for her to tap."
              />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Wait, not yet"
                accessibilityHint="Go back to the previous step"
                onPress={goBack}
                hitSlop={8}
                style={({ pressed }) => [
                  styles.link,
                  pressed && styles.linkPressed,
                ]}
              >
                <Text style={styles.linkText}>Wait, not yet</Text>
              </Pressable>
            </View>
          </>
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
    flexGrow: 1,
    paddingHorizontal: screenPadding,
    paddingTop: 4,
    paddingBottom: 24,
  },
  contentCompact: {
    paddingBottom: 16,
  },
  inner: {
    alignSelf: 'center',
    flexGrow: 1,
  },
  barSpacer: {
    height: 44,
  },
  heading: {
    alignItems: 'center',
    marginTop: 14,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 44,
    lineHeight: 49,
    letterSpacing: -1.35,
    color: colors.ink,
    textAlign: 'center',
  },
  titleCompact: {
    fontSize: 38,
    lineHeight: 43,
  },
  hero: {
    height: 292,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
    marginBottom: 8,
  },
  heroCompact: {
    height: 238,
    marginTop: 0,
    marginBottom: 2,
  },
  arch: {
    position: 'absolute',
    bottom: 6,
    width: 248,
    height: 258,
    borderTopLeftRadius: 130,
    borderTopRightRadius: 130,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    backgroundColor: 'rgba(249, 208, 193, 0.56)',
    borderWidth: 1.2,
    borderColor: 'rgba(217, 84, 65, 0.14)',
  },
  archCompact: {
    width: 214,
    height: 212,
    borderTopLeftRadius: 110,
    borderTopRightRadius: 110,
  },
  ring: {
    position: 'absolute',
    bottom: -5,
    width: 286,
    height: 84,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(165, 101, 69, 0.17)',
    transform: [{ scaleY: 0.4 }],
  },
  hearts: {
    top: 4,
    bottom: 40,
    left: 4,
    right: 4,
  },
  boopPill: {
    minHeight: 32,
    maxWidth: 270,
    marginTop: -3,
    borderRadius: 100,
    paddingVertical: 7,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    backgroundColor: 'rgba(255, 253, 248, 0.72)',
    borderWidth: 1,
    borderColor: 'rgba(165, 101, 69, 0.15)',
    zIndex: 6,
  },
  boopPillActive: {
    backgroundColor: colors.paper,
    borderColor: 'rgba(217, 84, 65, 0.23)',
  },
  boopPillPressed: {
    backgroundColor: colors.paperDeep,
  },
  boopText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 11.5,
    lineHeight: 16,
    color: colors.inkSoft,
    textAlign: 'center',
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 15.5,
    lineHeight: 24,
    color: colors.inkSoft,
    textAlign: 'center',
    maxWidth: 350,
    alignSelf: 'center',
    marginTop: 4,
  },
  bodyEmphasis: {
    fontFamily: fonts.bodySemiBold,
    color: colors.ink,
  },
  bioNudge: {
    alignSelf: 'center',
    maxWidth: 330,
    marginTop: 14,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: 'rgba(249, 208, 193, 0.56)',
    borderWidth: 1,
    borderColor: 'rgba(217, 84, 65, 0.14)',
  },
  bioNudgeText: {
    fontFamily: fonts.body,
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.inkSoft,
    textAlign: 'center',
  },
  actions: {
    marginTop: 'auto',
    paddingTop: 22,
    gap: 6,
  },
  cue: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 13.5,
    lineHeight: 19,
    color: colors.coral,
    textAlign: 'center',
    marginBottom: 6,
  },
  link: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkPressed: {
    opacity: 0.6,
  },
  linkText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 13.5,
    lineHeight: 19,
    color: colors.inkSoft,
    textDecorationLine: 'underline',
  },
});
