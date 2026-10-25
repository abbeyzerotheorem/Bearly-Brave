import React, { useCallback, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Speech from 'expo-speech';
import { colors, fonts } from '../theme';
import { tapHaptic } from '../haptics';

type SpeechButtonProps = {
  text: string;
  onSpeakStart?: () => void;
  onSpeakEnd?: () => void;
  disabled?: boolean;
  label?: string;
};

export function SpeechButton({
  text,
  onSpeakStart,
  onSpeakEnd,
  disabled = false,
  label = 'Speak this out loud',
}: SpeechButtonProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const pulse = useRef(new Animated.Value(0)).current;

  const speak = useCallback(async () => {
    if (disabled || isSpeaking) return;
    tapHaptic();
    setIsSpeaking(true);
    onSpeakStart?.();

    try {
      await Speech.speak(text, {
        language: 'en-US',
        pitch: 1,
        rate: 0.95,
        volume: 1,
        onStart: () => {
          if (!reducedMotionRef.current) {
            Animated.loop(
              Animated.sequence([
                Animated.timing(pulse, {
                  toValue: 1,
                  duration: 900,
                  useNativeDriver: true,
                }),
                Animated.timing(pulse, {
                  toValue: 0,
                  duration: 900,
                  useNativeDriver: true,
                }),
              ])
            ).start();
          }
        },
        onDone: () => {
          pulse.stopAnimation();
          pulse.setValue(0);
          setIsSpeaking(false);
          onSpeakEnd?.();
        },
        onError: () => {
          pulse.stopAnimation();
          pulse.setValue(0);
          setIsSpeaking(false);
          onSpeakEnd?.();
        },
        onStopped: () => {
          pulse.stopAnimation();
          pulse.setValue(0);
          setIsSpeaking(false);
          onSpeakEnd?.();
        },
      });
    } catch {
      setIsSpeaking(false);
      onSpeakEnd?.();
    }
  }, [text, disabled, isSpeaking, onSpeakStart, onSpeakEnd]);

  const reducedMotionRef = useRef(false);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={
        disabled
          ? 'Nothing to say yet'
          : 'The phone will speak this line out loud'
      }
      disabled={disabled || isSpeaking}
      onPress={speak}
      hitSlop={10}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.buttonDisabled,
        isSpeaking && styles.buttonSpeaking,
        pressed && !isSpeaking && styles.buttonPressed,
      ]}
    >
      <Animated.View
        style={[
          styles.pulseRing,
          {
            transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.15] }) }],
            opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.5, 0.9] }),
          },
        ]}
      />
      <View style={styles.iconRow}>
        <Text style={styles.speakGlyph}>{isSpeaking ? '🔊' : '🗣️'}</Text>
        <Text style={styles.buttonText}>
          {isSpeaking ? 'Speaking…' : 'Say it out loud'}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 60,
    borderRadius: 100,
    backgroundColor: colors.lavenderSoft,
    borderWidth: 1.4,
    borderColor: 'rgba(165, 101, 69, 0.18)',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  buttonDisabled: {
    backgroundColor: 'rgba(245, 240, 235, 0.6)',
    borderColor: 'rgba(165, 101, 69, 0.1)',
  },
  buttonSpeaking: {
    backgroundColor: colors.lavender,
    borderColor: colors.lavender,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  pulseRing: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 100,
    backgroundColor: colors.lavender,
    opacity: 0.35,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  speakGlyph: {
    fontSize: 18,
    lineHeight: 20,
  },
  buttonText: {
    fontFamily: fonts.bodyBold,
    fontSize: 15.5,
    color: colors.ink,
  },
});
