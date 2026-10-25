import React, { useCallback } from 'react';
import {
  Linking,
  Pressable,
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
import { phoneHref, instagramHref } from '../storage';

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

  const handlePressPhone = useCallback(() => {
    Linking.openURL(phoneHref(profile.phone)).catch(() => undefined);
  }, [profile.phone]);

  const handlePressInstagram = useCallback(() => {
    Linking.openURL(instagramHref(profile.instagram)).catch(() => undefined);
  }, [profile.instagram]);

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
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Call ${profile.phone}`}
                  onPress={handlePressPhone}
                  style={({ pressed }: { pressed: boolean }) => [
                    styles.contactRow,
                    pressed && styles.contactRowPressed,
                  ]}
                >
                  <Text style={styles.contactLabel}>NUMBER</Text>
                  <Text style={styles.contactValue}>{profile.phone}</Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Open Instagram @${profile.instagram}`}
                  onPress={handlePressInstagram}
                  style={({ pressed }: { pressed: boolean }) => [
                    styles.contactRow,
                    pressed && styles.contactRowPressed,
                  ]}
                >
                  <Text style={styles.contactLabel}>INSTAGRAM</Text>
                  <Text style={styles.contactValue}>@{profile.instagram}</Text>
                </Pressable>
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
  bearStage: {
    alignItems: 'center',
    height: 218,
    justifyContent: 'flex-end',
    marginTop: 2,
  },
  bearStageCompact: {
    height: 202,
  },
  contactLabel: {
    color: colors.muted,
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    letterSpacing: 1.1,
    width: 74,
  },
  contactRow: {
    alignItems: 'baseline',
    flexDirection: 'row',
    gap: 10,
  },
  contactRowPressed: {
    opacity: 0.7,
  },
  contactRows: {
    gap: 6,
    marginTop: 8,
  },
  contactValue: {
    color: colors.ink,
    flex: 1,
    fontFamily: fonts.bodySemiBold,
    fontSize: 15,
    lineHeight: 21,
  },
  content: {
    flexGrow: 1,
    paddingBottom: 22,
    paddingHorizontal: screenPadding,
    paddingTop: 4,
  },
  dashedRule: {
    borderColor: 'rgba(165, 101, 69, 0.25)',
    borderStyle: 'dashed',
    borderTopWidth: 1,
    marginBottom: 11,
    marginTop: 15,
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
  noContact: {
    color: colors.inkSoft,
    fontFamily: fonts.body,
    fontSize: 13.5,
    lineHeight: 20,
    marginTop: 9,
  },
  root: {
    flex: 1,
  },
  scroll: {
    flex: 1,
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
  ticket: {
    backgroundColor: colors.paper,
    borderColor: 'rgba(165, 101, 69, 0.14)',
    borderRadius: 22,
    borderWidth: 1,
    marginTop: 13,
    padding: 19,
  },
  ticketHint: {
    color: colors.brownDeep,
    fontFamily: fonts.displayItalic,
    fontSize: 12.5,
    lineHeight: 18,
  },
  ticketLabel: {
    color: colors.muted,
    fontFamily: fonts.bodyBlack,
    fontSize: 9.5,
    letterSpacing: 1.6,
  },
  ticketName: {
    color: colors.ink,
    fontFamily: fonts.displaySoft,
    fontSize: 25,
    letterSpacing: -0.4,
    lineHeight: 30,
    marginTop: 4,
  },
  ticketTopRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
