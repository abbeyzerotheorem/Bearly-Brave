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
};

export function SetupScreen({
  profile,
  onSave,
  onBack,
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

  // Sync local draft/selection from the profile prop whenever it changes
  // (e.g. after saving). This is an intentional prop → local state sync.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDraft(profile);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedQuestion(
      profile.questions?.[0] || null
    );
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
  addButton: {
    alignItems: 'center',
    backgroundColor: colors.coral,
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  addButtonText: {
    color: colors.white,
    fontFamily: fonts.bodyBold,
    fontSize: 22,
  },
  addInput: {
    backgroundColor: colors.cream,
    borderColor: 'rgba(124, 71, 47, 0.16)',
    borderRadius: 16,
    borderWidth: 1.3,
    color: colors.ink,
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 14.5,
    minHeight: 48,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  addRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
    marginTop: 10,
  },
  backdrop: {
    backgroundColor: 'rgba(44, 28, 21, 0.42)',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: colors.paperDeep,
    borderRadius: 19,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  closeGlyph: {
    color: colors.inkSoft,
    fontFamily: fonts.body,
    fontSize: 24,
    lineHeight: 26,
    marginTop: -2,
  },
  content: {
    paddingBottom: 20,
    paddingHorizontal: screenPadding,
    paddingTop: 18,
  },
  field: {
    marginBottom: 16,
  },
  footer: {
    alignItems: 'center',
    gap: 4,
    marginTop: 16,
  },
  handle: {
    alignSelf: 'center',
    backgroundColor: 'rgba(124, 71, 47, 0.2)',
    borderRadius: 2,
    height: 4,
    marginBottom: 2,
    marginTop: 10,
    width: 40,
  },
  input: {
    backgroundColor: colors.cream,
    borderColor: 'rgba(124, 71, 47, 0.18)',
    borderRadius: 17,
    borderWidth: 1.3,
    color: colors.ink,
    fontFamily: fonts.body,
    fontSize: 16,
    minHeight: 54,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  intro: {
    color: colors.muted,
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 24,
    marginTop: 12,
    maxWidth: 360,
  },
  label: {
    color: colors.inkSoft,
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    letterSpacing: 0.25,
    marginBottom: 7,
    marginLeft: 4,
  },
  listHint: {
    color: colors.muted,
    fontFamily: fonts.body,
    fontSize: 11.5,
    lineHeight: 17,
    marginTop: 6,
  },
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  privacy: {
    color: colors.muted,
    fontFamily: fonts.body,
    fontSize: 11.5,
    lineHeight: 17,
  },
  privacyDot: {
    backgroundColor: colors.sage,
    borderRadius: 3,
    height: 5,
    width: 5,
  },
  privacyRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    marginTop: 2,
  },
  removeChip: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 253, 248, 0.5)',
    borderColor: 'rgba(124, 71, 47, 0.14)',
    borderRadius: 100,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 6,
    marginBottom: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  removeChipLabel: {
    color: colors.inkSoft,
    fontFamily: fonts.body,
    fontSize: 13,
  },
  removeChipText: {
    color: colors.coralDeep,
    fontFamily: fonts.bodyBold,
    fontSize: 14,
  },
  safeSheet: {
    flexGrow: 0,
  },
  section: {
    marginBottom: 14,
    marginTop: 24,
  },
  sectionHint: {
    color: colors.muted,
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
    maxWidth: 360,
  },
  sheet: {
    backgroundColor: colors.paper,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    maxHeight: '96%',
  },
  title: {
    color: colors.ink,
    fontFamily: fonts.display,
    fontSize: 34,
    letterSpacing: -0.7,
    lineHeight: 38,
  },
  titleCopy: {
    flex: 1,
    gap: 12,
  },
  titleRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
});
