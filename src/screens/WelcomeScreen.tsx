import React, { useState } from 'react';
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
import { BrandBar, Eyebrow, PawMark, PrimaryButton } from '../components/ui';
import { boopHaptic, tapHaptic } from '../haptics';

type Role = 'owner' | 'guest';

const BOOPS = [
  'eep! Okay, you’re fun.',
  'Careful. I blush easily.',
  'My human is watching. Act natural.',
  'That tickles. Do it again.',
  'Right. Back to being professional.',
];

export type WelcomeScreenProps = {
  onStart: (role: Role) => void;
  onSettings: () => void;
  reducedMotion: boolean;
};

export function WelcomeScreen({
  onStart,
  onSettings,
  reducedMotion,
}: WelcomeScreenProps) {
  const { height, width } = useWindowDimensions();
  const compact = height < 740;
  const contentWidth = Math.min(width - screenPadding * 2, 500);
  const [boopCount, setBoopCount] = useState(0);
  const [role, setRole] = useState<Role | null>(null);

  const boop = () => {
    setBoopCount((count) => count + 1);
  };

  const boopLabel =
    boopCount === 0
      ? 'psst… boop the bear'
      : BOOPS[(boopCount - 1) % BOOPS.length];

  const handleStart = (r: Role) => {
    tapHaptic();
    setRole(r);
    onStart(r);
  };

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
        <BrandBar onSettings={onSettings} />

        <View style={styles.heading}>
          <Eyebrow center>A VERY SMALL QUESTION</Eyebrow>
          <Text
            accessibilityRole="header"
            style={[styles.title, compact && styles.titleCompact]}
          >
            Hi. I’m the bear.
          </Text>
        </View>

        <View style={[styles.hero, compact && styles.heroCompact]}>
          <View style={[styles.arch, compact && styles.archCompact]} />
          <View style={styles.ring} />
          <FloatingHearts reducedMotion={reducedMotion} style={styles.hearts} />
          <Bear
            size={compact ? 198 : 232}
            mood={role ? 'cheer' : 'wave'}
            onBoop={boop}
            reducedMotion={reducedMotion}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Boop the bear"
            accessibilityLiveRegion="polite"
            onPress={() => {
              boopHaptic();
              boop();
            }}
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
        </View>

        <Text style={styles.body}>
          The nervous human holding this phone has something to ask you.
          <Text style={styles.bodyEmphasis}>
            {' '}
            He’s currently pretending to be calm.
          </Text>
        </Text>

        {role === null ? (
          <View style={styles.rolePicker}>
            <Text style={styles.rolePickerLabel}>
              Who’s holding the phone?
            </Text>
            <View style={styles.roleButtons}>
              <PrimaryButton
                label="I’m the human asking"
                onPress={() => handleStart('owner')}
                accessibilityHint="Set up your details and what you want to say"
              />
              <PrimaryButton
                label="I’m being asked out"
                onPress={() => handleStart('guest')}
                accessibilityHint="Read the question and tap your answer"
              />
            </View>
          </View>
        ) : (
          <View style={styles.actions}>
            <PrimaryButton
              label="Okay, I’m curious"
              onPress={() => handleStart(role)}
              accessibilityHint="Continue to the next step"
            />
            <View style={styles.assurance}>
              <View style={styles.assuranceDot} />
              <Text style={styles.assuranceText}>
                No talking required. No pressure included.
              </Text>
            </View>
          </View>
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
  heading: {
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
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
  rolePicker: {
    marginTop: 20,
    alignItems: 'center',
  },
  rolePickerLabel: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 14,
    lineHeight: 20,
    color: colors.inkSoft,
    textAlign: 'center',
    marginBottom: 12,
  },
  roleButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actions: {
    marginTop: 'auto',
    paddingTop: 20,
    gap: 13,
  },
  assurance: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  assuranceDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.sage,
  },
  assuranceText: {
    fontFamily: fonts.body,
    fontSize: 11.5,
    lineHeight: 17,
    color: colors.muted,
  },
});
