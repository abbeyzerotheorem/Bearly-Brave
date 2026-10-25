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
import { Confetti } from '../components/Confetti';
import {
  BrandBar,
  Eyebrow,
  Heart,
  TextLink,
} from '../components/ui';
import type { Profile } from '../storage';

export function YesScreen({
  profile,
  onRestart,
  reducedMotion,
}: {
  profile: Profile;
  onRestart: () => void;
  reducedMotion: boolean;
}) {
  const { height, width } = useWindowDimensions();
  const compact = height < 870;
  const contentWidth = Math.min(width - screenPadding * 2, 500);
  const hasContact = Boolean(profile.phone || profile.instagram);
  const displayName = profile.name || 'The nervous human';

  return (
    <View style={styles.root}>
      <Confetti reducedMotion={reducedMotion} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.inner, { width: contentWidth }]}>
          <BrandBar />

          <View style={styles.heading}>
            <Eyebrow center>SHE SAID YES</Eyebrow>
            <Text
              accessibilityRole="header"
              style={[styles.title, compact && styles.titleCompact]}
            >
              You just made his week.
            </Text>
            <Text style={styles.lead}>
              Hand the phone back and watch him try to play it cool.
            </Text>
          </View>

          <View style={[styles.bearStage, compact && styles.bearStageCompact]}>
            <View style={styles.halo} />
            <View style={[styles.sunRay, styles.sunRayOne]} />
            <View style={[styles.sunRay, styles.sunRayTwo]} />
            <Bear
              size={compact ? 172 : 198}
              mood="cheer"
              reducedMotion={reducedMotion}
            />
          </View>

          <View style={[styles.ticket, shadow.card]}>
            <View style={styles.ticketTopRow}>
              <Text style={styles.ticketLabel}>TAKE-HOME CARD</Text>
              <Heart size={17} color={colors.coral} />
            </View>
            <Text style={styles.ticketName}>{displayName}</Text>

            {hasContact ? (
              <View style={styles.contactRows}>
                {profile.phone ? (
                  <View style={styles.contactRow}>
                    <Text style={styles.contactLabel}>NUMBER</Text>
                    <Text selectable style={styles.contactValue}>
                      {profile.phone}
                    </Text>
                  </View>
                ) : null}
                {profile.instagram ? (
                  <View style={styles.contactRow}>
                    <Text style={styles.contactLabel}>INSTAGRAM</Text>
                    <Text selectable style={styles.contactValue}>
                      @{profile.instagram}
                    </Text>
                  </View>
                ) : null}
              </View>
            ) : (
              <Text style={styles.noContact}>
                His number is a closely guarded secret. Ask him — he’s right
                there, trying not to grin.
              </Text>
            )}

            <View style={styles.dashedRule} />
            <Text style={styles.ticketHint}>
              {hasContact
                ? 'Screenshot this. He’ll be too shy to repeat it.'
                : 'Coffee plans are officially above my pay grade.'}
            </Text>
          </View>

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
  root: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: screenPadding,
    paddingTop: 4,
    paddingBottom: 22,
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
  lead: {
    fontFamily: fonts.body,
    fontSize: 14.5,
    lineHeight: 22,
    color: colors.inkSoft,
    textAlign: 'center',
    maxWidth: 310,
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
  sunRay: {
    position: 'absolute',
    width: 2,
    height: 24,
    borderRadius: 2,
    backgroundColor: colors.butter,
    opacity: 0.85,
  },
  sunRayOne: {
    left: '24%',
    top: 34,
    transform: [{ rotate: '-28deg' }],
  },
  sunRayTwo: {
    right: '25%',
    top: 20,
    height: 18,
    transform: [{ rotate: '24deg' }],
  },
  ticket: {
    marginTop: 13,
    backgroundColor: colors.paper,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(165, 101, 69, 0.14)',
    padding: 19,
  },
  ticketTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ticketLabel: {
    fontFamily: fonts.bodyBlack,
    fontSize: 9.5,
    letterSpacing: 1.6,
    color: colors.muted,
  },
  ticketName: {
    marginTop: 4,
    fontFamily: fonts.displaySoft,
    fontSize: 25,
    lineHeight: 30,
    letterSpacing: -0.4,
    color: colors.ink,
  },
  contactRows: {
    marginTop: 8,
    gap: 6,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
  },
  contactLabel: {
    width: 74,
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    letterSpacing: 1.1,
    color: colors.muted,
  },
  contactValue: {
    flex: 1,
    fontFamily: fonts.bodySemiBold,
    fontSize: 15,
    lineHeight: 21,
    color: colors.ink,
  },
  noContact: {
    marginTop: 9,
    fontFamily: fonts.body,
    fontSize: 13.5,
    lineHeight: 20,
    color: colors.inkSoft,
  },
  dashedRule: {
    marginTop: 15,
    marginBottom: 11,
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(165, 101, 69, 0.25)',
  },
  ticketHint: {
    fontFamily: fonts.displayItalic,
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.brownDeep,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 17,
    alignItems: 'center',
    gap: 2,
  },
  footerNote: {
    fontFamily: fonts.body,
    fontSize: 11.5,
    lineHeight: 17,
    color: colors.muted,
    textAlign: 'center',
  },
});
