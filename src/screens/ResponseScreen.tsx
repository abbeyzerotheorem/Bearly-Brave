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
import { Confetti } from '../components/Confetti';
import { SpeechButton } from '../components/SpeechButton';
import {
  BrandBar,
  Eyebrow,
  Heart,
  TextLink,
} from '../components/ui';
import { tapHaptic } from '../haptics';
import type { Profile } from '../storage';

type ResponseScreenProps = {
  profile: Profile;
  answer: 'yes' | 'no';
  onRestart: () => void;
  reducedMotion: boolean;
};

export function ResponseScreen({
  profile,
  answer,
  onRestart,
  reducedMotion,
}: ResponseScreenProps) {
  const { height, width } = useWindowDimensions();
  const compact = height < 870;
  const contentWidth = Math.min(width - screenPadding * 2, 500);
  const isYes = answer === 'yes';
  const [spokenLine, setSpokenLine] = useState<string | null>(null);
  const [lineType, setLineType] = useState<'question' | 'compliment' | null>(
    null
  );
  const defaultQuestion =
    profile.questions?.[0] || 'So… coffee sometime?';
  const defaultCompliment =
    profile.compliments?.[0] || 'You have great energy.';

  return (
    <View style={styles.root}>
      {isYes && <Confetti reducedMotion={reducedMotion} />}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.inner, { width: contentWidth }]}>
          <BrandBar />

          <View style={styles.heading}>
            <Eyebrow center>HER ANSWER</Eyebrow>
            <Text
              accessibilityRole="header"
              style={[styles.title, compact && styles.titleCompact]}
            >
              {isYes ? 'She said yes!' : "She said not right now."}
            </Text>
            <Text style={styles.lead}>
              {isYes
                ? 'You just made her day. Now’s your turn — pick a line and say it out loud.'
                : 'No pressure at all. Pick a kind line and say it out loud when you’re ready.'}
            </Text>
          </View>

          <View style={[styles.bearStage, compact && styles.bearStageCompact]}>
            <View style={styles.halo} />
            <View style={[styles.sunRay, styles.sunRayOne]} />
            <View style={[styles.sunRay, styles.sunRayTwo]} />
            <Bear
              size={compact ? 172 : 198}
              mood={isYes ? 'excited' : 'gentle'}
              speaking={spokenLine !== null}
              reducedMotion={reducedMotion}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>HER ANSWER</Text>
            <Text style={styles.cardAnswer}>
              {isYes ? "Yes, I'd like that." : 'Not right now.'}
            </Text>
          </View>

          {spokenLine !== null && (
            <View style={styles.spokenBanner}>
              <Heart size={16} color={colors.coral} />
              <Text style={styles.spokenText}>
                You said: “{spokenLine}”
              </Text>
            </View>
          )}

          <View style={styles.pickerSection}>
            <Text style={styles.pickerLabel}>What do you want to say?</Text>
            <View style={styles.pickerRow}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Pick a question"
                accessibilityHint="Choose a question to ask her"
                onPress={() => {
                  tapHaptic();
                  setLineType('question');
                  setSpokenLine(defaultQuestion);
                }}
                style={[
                  styles.pill,
                  lineType === 'question' && styles.pillActive,
                ]}
              >
                <Text style={styles.pillText}>Ask a question</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Give a compliment"
                accessibilityHint="Choose a compliment to tell her"
                onPress={() => {
                  tapHaptic();
                  setLineType('compliment');
                  setSpokenLine(defaultCompliment);
                }}
                style={[
                  styles.pill,
                  lineType === 'compliment' && styles.pillActive,
                ]}
              >
                <Text style={styles.pillText}>Give a compliment</Text>
              </Pressable>
            </View>
          </View>

          {lineType === 'question' ? (
            <View style={styles.lineSection}>
              <Text style={styles.lineLabel}>Pick your question</Text>
              <View style={styles.lineChips}>
                {profile.questions.map((q, i) => {
                  const active = spokenLine === q;
                  return (
                    <Pressable
                      key={i}
                      accessibilityRole="button"
                      accessibilityLabel={q}
                      accessibilityState={{ selected: active }}
                      onPress={() => {
                        tapHaptic();
                        setLineType('question');
                        setSpokenLine(q);
                      }}
                      style={[
                        styles.lineChip,
                        active && styles.lineChipActive,
                      ]}
                    >
                      <Text style={[styles.lineChipText, active && styles.lineChipTextActive]}>
                        {q}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          ) : lineType === 'compliment' ? (
            <View style={styles.lineSection}>
              <Text style={styles.lineLabel}>Pick your compliment</Text>
              <View style={styles.lineChips}>
                {profile.compliments.map((c, i) => {
                  const active = spokenLine === c;
                  return (
                    <Pressable
                      key={i}
                      accessibilityRole="button"
                      accessibilityLabel={c}
                      accessibilityState={{ selected: active }}
                      onPress={() => {
                        tapHaptic();
                        setLineType('compliment');
                        setSpokenLine(c);
                      }}
                      style={[
                        styles.lineChip,
                        active && styles.lineChipActive,
                      ]}
                    >
                      <Text style={[styles.lineChipText, active && styles.lineChipTextActive]}>
                        {c}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          ) : null}

          {spokenLine !== null && (
            <SpeechButton
              text={spokenLine}
              label="Say this out loud"
              disabled={false}
              reducedMotion={reducedMotion}
            />
          )}

          <View style={styles.footer}>
            <Text style={styles.footerNote}>
              The bear is taking full credit, by the way.
            </Text>
            <TextLink label="Back to the beginning" onPress={onRestart} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bearStage: {
    alignItems: 'center',
    height: 218,
    justifyContent: 'flex-end',
    marginTop: 2,
  },
  bearStageCompact: {
    height: 202,
  },
  card: {
    alignItems: 'center',
    backgroundColor: colors.paper,
    borderColor: 'rgba(165, 101, 69, 0.14)',
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 16,
    padding: 18,
  },
  cardAnswer: {
    color: colors.ink,
    fontFamily: fonts.displaySoft,
    fontSize: 20,
    lineHeight: 26,
    marginTop: 6,
    textAlign: 'center',
  },
  cardLabel: {
    color: colors.muted,
    fontFamily: fonts.bodyBlack,
    fontSize: 9.5,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  content: {
    flexGrow: 1,
    paddingBottom: 22,
    paddingHorizontal: screenPadding,
    paddingTop: 4,
  },
  footer: {
    alignItems: 'center',
    gap: 2,
    marginTop: 'auto',
    paddingTop: 17,
  },
  footerNote: {
    color: colors.muted,
    fontFamily: fonts.body,
    fontSize: 11.5,
    lineHeight: 17,
    textAlign: 'center',
  },
  halo: {
    backgroundColor: 'rgba(246, 217, 146, 0.4)',
    borderRadius: 98,
    bottom: 8,
    height: 196,
    position: 'absolute',
    width: 196,
  },
  heading: {
    alignItems: 'center',
    gap: 11,
    marginTop: 10,
  },
  inner: {
    alignSelf: 'center',
    flexGrow: 1,
  },
  lead: {
    color: colors.inkSoft,
    fontFamily: fonts.body,
    fontSize: 14.5,
    lineHeight: 22,
    maxWidth: 310,
    textAlign: 'center',
  },
  lineChip: {
    backgroundColor: 'rgba(255, 253, 248, 0.6)',
    borderColor: 'rgba(124, 71, 47, 0.16)',
    borderRadius: 100,
    borderWidth: 1.3,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  lineChipActive: {
    backgroundColor: colors.lavender,
    borderColor: colors.lavender,
  },
  lineChipText: {
    color: colors.inkSoft,
    fontFamily: fonts.bodySemiBold,
    fontSize: 12.5,
    lineHeight: 17,
  },
  lineChipTextActive: {
    color: colors.white,
  },
  lineChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    maxWidth: 420,
  },
  lineLabel: {
    alignSelf: 'center',
    color: colors.inkSoft,
    fontFamily: fonts.bodySemiBold,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 10,
  },
  lineSection: {
    alignItems: 'center',
    marginTop: 18,
    width: '100%',
  },
  pickerLabel: {
    color: colors.inkSoft,
    fontFamily: fonts.bodySemiBold,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  pickerRow: {
    flexDirection: 'row',
    gap: 10,
  },
  pickerSection: {
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: 18,
  },
  pill: {
    backgroundColor: 'rgba(255, 253, 248, 0.7)',
    borderColor: 'rgba(124, 71, 47, 0.16)',
    borderRadius: 100,
    borderWidth: 1.3,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  pillActive: {
    backgroundColor: colors.lavender,
    borderColor: colors.lavender,
  },
  pillText: {
    color: colors.inkSoft,
    fontFamily: fonts.bodySemiBold,
    fontSize: 13,
  },
  root: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  spokenBanner: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.lavenderSoft,
    borderColor: colors.lavender,
    borderRadius: 100,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
    maxWidth: 300,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  spokenText: {
    color: colors.ink,
    fontFamily: fonts.bodySemiBold,
    fontSize: 13.5,
    lineHeight: 20,
  },
  sunRay: {
    backgroundColor: colors.butter,
    borderRadius: 2,
    height: 24,
    opacity: 0.85,
    position: 'absolute',
    width: 2,
  },
  sunRayOne: {
    left: '24%',
    top: 34,
    transform: [{ rotate: '-28deg' }],
  },
  sunRayTwo: {
    height: 18,
    right: '25%',
    top: 20,
    transform: [{ rotate: '24deg' }],
  },
  title: {
    color: colors.ink,
    fontFamily: fonts.display,
    fontSize: 43,
    letterSpacing: -1.25,
    lineHeight: 47,
    textAlign: 'center',
  },
  titleCompact: {
    fontSize: 37,
    lineHeight: 42,
  },
});
