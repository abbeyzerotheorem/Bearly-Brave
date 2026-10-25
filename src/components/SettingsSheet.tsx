import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, screenPadding, shadow } from '../theme';
import { normaliseProfile, type Profile } from '../storage';
import { Eyebrow, PrimaryButton, TextLink, PawMark } from './ui';

type Props = {
  visible: boolean;
  profile: Profile;
  onClose: () => void;
  onSave: (profile: Profile) => void;
  onPreview: () => void;
};

export function SettingsSheet({
  visible,
  profile,
  onClose,
  onSave,
  onPreview,
}: Props) {
  const [draft, setDraft] = useState(profile);

  useEffect(() => {
    if (visible) setDraft(profile);
  }, [profile, visible]);

  const update = (key: keyof Profile, value: string) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const handleSave = () => {
    onSave(normaliseProfile(draft));
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.modalRoot}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close setup"
          style={styles.backdrop}
          onPress={onClose}
        />
        <View style={[styles.sheet, shadow.card]}>
          <View style={styles.handle} />
          <SafeAreaView edges={['bottom']} style={styles.safeSheet}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.content}
            >
              <View style={styles.titleRow}>
                <View style={styles.titleCopy}>
                  <Eyebrow>FOR THE HUMAN HOLDING THE PHONE</Eyebrow>
                  <Text style={styles.title}>Make it yours.</Text>
                </View>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Close"
                  hitSlop={10}
                  onPress={onClose}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeGlyph}>×</Text>
                </Pressable>
              </View>

              <Text style={styles.intro}>
                Add your details so she knows how to find you after a yes.
                Nothing leaves this phone.
              </Text>

              <Field
                label="Your name"
                value={draft.name}
                onChangeText={(value) => update('name', value)}
                placeholder="e.g. Sam"
                autoCapitalize="words"
                maxLength={24}
                returnKeyType="next"
              />
              <Field
                label="Phone number"
                value={draft.phone}
                onChangeText={(value) => update('phone', value)}
                placeholder="e.g. +27 82 123 4567"
                keyboardType="phone-pad"
                maxLength={24}
                returnKeyType="next"
              />
              <Field
                label="Instagram (optional)"
                value={draft.instagram}
                onChangeText={(value) => update('instagram', value)}
                placeholder="e.g. @sam"
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={31}
                returnKeyType="done"
              />

              <PrimaryButton
                label="Save my details"
                onPress={handleSave}
                icon={<PawMark size={18} color={colors.white} />}
              />

              <View style={styles.footer}>
                <TextLink label="Preview her side of the app" onPress={onPreview} />
                <View style={styles.privacyRow}>
                  <View style={styles.privacyDot} />
                  <Text style={styles.privacy}>
                    Private. Stored on this device only.
                  </Text>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

function Field({
  label,
  ...inputProps
}: {
  label: string;
} & React.ComponentProps<typeof TextInput>) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...inputProps}
        accessibilityLabel={label}
        placeholderTextColor="rgba(123, 101, 88, 0.6)"
        selectionColor={colors.coral}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(44, 28, 21, 0.42)',
  },
  sheet: {
    backgroundColor: colors.paper,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    maxHeight: '92%',
  },
  safeSheet: {
    flexGrow: 0,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(124, 71, 47, 0.2)',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 2,
  },
  content: {
    paddingHorizontal: screenPadding,
    paddingTop: 18,
    paddingBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  titleCopy: {
    flex: 1,
    gap: 12,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 34,
    lineHeight: 38,
    letterSpacing: -0.7,
    color: colors.ink,
  },
  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.paperDeep,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeGlyph: {
    fontFamily: fonts.body,
    fontSize: 24,
    lineHeight: 26,
    color: colors.inkSoft,
    marginTop: -2,
  },
  intro: {
    marginTop: 12,
    marginBottom: 21,
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: colors.muted,
    maxWidth: 360,
  },
  field: {
    marginBottom: 15,
  },
  label: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    letterSpacing: 0.25,
    color: colors.inkSoft,
    marginBottom: 7,
    marginLeft: 4,
  },
  input: {
    minHeight: 54,
    borderRadius: 17,
    borderWidth: 1.3,
    borderColor: 'rgba(124, 71, 47, 0.18)',
    backgroundColor: colors.cream,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.ink,
  },
  footer: {
    marginTop: 13,
    alignItems: 'center',
    gap: 4,
  },
  privacyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  privacyDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.sage,
  },
  privacy: {
    fontFamily: fonts.body,
    fontSize: 11.5,
    lineHeight: 17,
    color: colors.muted,
  },
});
