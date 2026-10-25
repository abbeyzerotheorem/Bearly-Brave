import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, screenPadding, shadow } from '../theme';
import { normaliseProfile, type Profile } from '../storage';
import { Eyebrow, PrimaryButton, TextLink } from '../components/ui';
import { LinePicker } from '../components/LinePicker';

type SetupScreenProps = {
  profile: Profile;
  onSave: (profile: Profile) => void;
  onBack: () => void;
  reducedMotion: boolean;
};

export function SetupScreen({
  profile,
  onSave,
  onBack,
  reducedMotion,
}: SetupScreenProps) {
  const [draft, setDraft] = useState<Profile>(profile);
  const [editingQuestions, setEditingQuestions] = useState<string[]>([]);
  const [editingCompliments, setEditingCompliments] = useState<string[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newCompliment, setNewCompliment] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [selectedCompliment, setSelectedCompliment] = useState<string | null>(
    null
  );
  const { width } = useWindowDimensions();
  const contentWidth = Math.min(width - screenPadding * 2, 500);

  useEffect(() => {
    setDraft(profile);
    setSelectedQuestion(
      profile.questions?.[0] || null
    );
    setSelectedCompliment(
      profile.compliments?.[0] || null
    );
  }, [profile]);

  const updateField = useCallback(
    (key: keyof Profile, value: string) => {
      setDraft((current) => ({ ...current, [key]: value }));
    },
    []
  );

  const handleSave = () => {
    const next = normaliseProfile({
      ...draft,
      questions: editingQuestions.length
        ? editingQuestions
        : draft.questions,
      compliments: editingCompliments.length
        ? editingCompliments
        : draft.compliments,
    });
    onSave(next);
  };

  const handleAddQuestion = () => {
    const trimmed = newQuestion.trim();
    if (!trimmed) return;
    if (editingQuestions.includes(trimmed)) {
      Alert.alert('That one’s already in the list.');
      return;
    }
    setEditingQuestions([...editingQuestions, trimmed]);
    setNewQuestion('');
  };

  const handleAddCompliment = () => {
    const trimmed = newCompliment.trim();
    if (!trimmed) return;
    if (editingCompliments.includes(trimmed)) {
      Alert.alert('That one’s already in the list.');
      return;
    }
    setEditingCompliments([...editingCompliments, trimmed]);
    setNewCompliment('');
  };

  const handleRemoveQuestion = (index: number) => {
    setEditingQuestions(editingQuestions.filter((_, i) => i !== index));
  };

  const handleRemoveCompliment = (index: number) => {
    setEditingCompliments(editingCompliments.filter((_, i) => i !== index));
  };

  return (
    <KeyboardAvoidingView
      style={styles.modalRoot}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Close setup"
        style={styles.backdrop}
        onPress={onBack}
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
                <Text style={styles.title}>Set up your lines.</Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close setup"
                hitSlop={10}
                onPress={onBack}
                style={styles.closeButton}
              >
                <Text style={styles.closeGlyph}>×</Text>
              </Pressable>
            </View>

            <Text style={styles.intro}>
              Add your name and contact details. Then pick the questions and
              compliments you’d like to say when the phone comes back. She
              won’t see this screen — it’s just for you.
            </Text>

            <View style={styles.field}>
              <Text style={styles.label}>Your name</Text>
              <TextInput
                value={draft.name}
                onChangeText={(v) => updateField('name', v)}
                placeholder="e.g. Sam"
                autoCapitalize="words"
                maxLength={24}
                returnKeyType="next"
                style={styles.input}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Phone number</Text>
              <TextInput
                value={draft.phone}
                onChangeText={(v) => updateField('phone', v)}
                placeholder="e.g. +27 82 123 4567"
                keyboardType="phone-pad"
                maxLength={24}
                returnKeyType="next"
                style={styles.input}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Instagram (optional)</Text>
              <TextInput
                value={draft.instagram}
                onChangeText={(v) => updateField('instagram', v)}
                placeholder="e.g. @sam"
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={31}
                returnKeyType="done"
                style={styles.input}
              />
            </View>

            <View style={styles.section}>
              <Eyebrow>QUESTIONS YOU CAN ASK</Eyebrow>
              <Text style={styles.sectionHint}>
                These appear as buttons when she hands the phone back. Pick one
                to say out loud.
              </Text>
              <LinePicker
                title="Pick a question"
                lines={draft.questions}
                value={selectedQuestion}
                onSelect={setSelectedQuestion}
                onAdd={() => {
                  setEditingQuestions(draft.questions);
                  setSelectedQuestion(null);
                }}
                reducedMotion={reducedMotion}
              />
              <View style={styles.addRow}>
                <TextInput
                  value={newQuestion}
                  onChangeText={setNewQuestion}
                  placeholder="Type a new question…"
                  maxLength={120}
                  returnKeyType="done"
                  style={styles.addInput}
                />
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Add question"
                  onPress={handleAddQuestion}
                  style={styles.addButton}
                >
                  <Text style={styles.addButtonText}>+</Text>
                </Pressable>
              </View>
              {editingQuestions.length > 0 && (
                <Text style={styles.listHint}>
                  {editingQuestions.length} custom question(s). Tap × to remove.
                </Text>
              )}
              {editingQuestions.map((q, i) => (
                <Pressable
                  key={i}
                  accessibilityRole="button"
                  accessibilityLabel={`Remove question: ${q}`}
                  onPress={() => handleRemoveQuestion(i)}
                  style={styles.removeChip}
                  hitSlop={6}
                >
                  <Text style={styles.removeChipText}>×</Text>
                  <Text style={styles.removeChipLabel}>{q}</Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.section}>
              <Eyebrow tone="light">COMPLIMENTS YOU CAN GIVE</Eyebrow>
              <Text style={styles.sectionHint}>
                A nice thing to say after her answer. Pick one to say out loud.
              </Text>
              <LinePicker
                title="Pick a compliment"
                lines={draft.compliments}
                value={selectedCompliment}
                onSelect={setSelectedCompliment}
                onAdd={() => {
                  setEditingCompliments(draft.compliments);
                  setSelectedCompliment(null);
                }}
                reducedMotion={reducedMotion}
              />
              <View style={styles.addRow}>
                <TextInput
                  value={newCompliment}
                  onChangeText={setNewCompliment}
                  placeholder="Type a new compliment…"
                  maxLength={120}
                  returnKeyType="done"
                  style={styles.addInput}
                />
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Add compliment"
                  onPress={handleAddCompliment}
                  style={styles.addButton}
                >
                  <Text style={styles.addButtonText}>+</Text>
                </Pressable>
              </View>
              {editingCompliments.length > 0 && (
                <Text style={styles.listHint}>
                  {editingCompliments.length} custom compliment(s). Tap × to
                  remove.
                </Text>
              )}
              {editingCompliments.map((c, i) => (
                <Pressable
                  key={i}
                  accessibilityRole="button"
                  accessibilityLabel={`Remove compliment: ${c}`}
                  onPress={() => handleRemoveCompliment(i)}
                  style={styles.removeChip}
                  hitSlop={6}
                >
                  <Text style={styles.removeChipText}>×</Text>
                  <Text style={styles.removeChipLabel}>{c}</Text>
                </Pressable>
              ))}
            </View>

            <PrimaryButton
              label="Save my lines"
              onPress={handleSave}
            />

            <View style={styles.footer}>
              <TextLink label="Back" onPress={onBack} />
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
    maxHeight: '96%',
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
    marginBottom: 24,
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: colors.muted,
    maxWidth: 360,
  },
  field: {
    marginBottom: 16,
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
  section: {
    marginTop: 24,
    marginBottom: 14,
  },
  sectionHint: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 19,
    color: colors.muted,
    marginTop: 6,
    maxWidth: 360,
  },
  addRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
    marginBottom: 12,
  },
  addInput: {
    flex: 1,
    minHeight: 48,
    borderRadius: 16,
    borderWidth: 1.3,
    borderColor: 'rgba(124, 71, 47, 0.16)',
    backgroundColor: colors.cream,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: fonts.body,
    fontSize: 14.5,
    color: colors.ink,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.coral,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontFamily: fonts.bodyBold,
    fontSize: 22,
    color: colors.white,
  },
  listHint: {
    marginTop: 6,
    fontFamily: fonts.body,
    fontSize: 11.5,
    lineHeight: 17,
    color: colors.muted,
  },
  removeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 253, 248, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(124, 71, 47, 0.14)',
    marginBottom: 6,
  },
  removeChipText: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: colors.coralDeep,
  },
  removeChipLabel: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.inkSoft,
  },
  footer: {
    marginTop: 16,
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
