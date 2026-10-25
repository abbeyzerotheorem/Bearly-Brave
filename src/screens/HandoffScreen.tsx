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
import { BrandBar, Eyebrow, PrimaryButton } from '../components/ui';

type HandoffScreenProps = {
  name: string;
  answer: 'yes' | 'no';
  onGiveBack: () => void;
  reducedMotion: boolean;
};

export function HandoffScreen({
  name,
  answer,
  onGiveBack,
  reducedMotion,
}: HandoffScreenProps) {
  const { height, width } = useWindowDimensions();
  const compact = height < 870;
  const contentWidth = Math.min(width - screenPadding * 2, 500);
  const displayName = name || 'the nervous human';
  const isYes = answer === 'yes';

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.inner, { width: contentWidth }]}>
        <BrandBar />

        <View style={styles.heading}>
          <Eyebrow center>{isYes ? 'SHE SAID YES' : 'ALL GOOD'}</Eyebrow>
          <Text
            accessibilityRole="header"
            style={[styles.title, compact && styles.titleCompact]}
          >
            {isYes
              ? 'You just made his week.'
              : "That's completely okay."}
          </Text>
        </View>

        <View style={[styles.bearStage, compact && styles.bearStageCompact]}>
          <View style={styles.halo} />
          <Bear
            size={compact ? 172 : 198}
            mood={isYes ? 'cheer' : 'gentle'}
            reducedMotion={reducedMotion}
          />
        </View>

        <Text style={styles.body}>
          {isYes
            ? 'Hand the phone back to ' + displayName + ' and watch him try to play it cool.'
            : 'Hand the phone back to ' + displayName + ' with a smile — he’ll take it from here.'}
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>
            HER ANSWER
          </Text>
          <Text style={styles.cardAnswer}>
            {isYes ? 'Yes, I’d like that.' : 'Not right now.'}
          </Text>
        </View>

        <PrimaryButton
          label="Give the phone back"
          onPress={onGiveBack}
        />
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
    gap: 11,
    marginTop: 10,
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
  card: {
    marginTop: 20,
    backgroundColor: colors.paper,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(165, 101, 69, 0.14)',
    padding: 18,
    alignItems: 'center',
  },
  cardLabel: {
    fontFamily: fonts.bodyBlack,
    fontSize: 9.5,
    letterSpacing: 1.6,
    color: colors.muted,
    textTransform: 'uppercase',
  },
  cardAnswer: {
    marginTop: 6,
    fontFamily: fonts.displaySoft,
    fontSize: 20,
    lineHeight: 26,
    color: colors.ink,
    textAlign: 'center',
  },
});
