import React, { useCallback, useEffect, useState } from 'react';
import {
  AccessibilityInfo,
  BackHandler,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { Fraunces_600SemiBold } from '@expo-google-fonts/fraunces/600SemiBold';
import { Fraunces_600SemiBold_Italic } from '@expo-google-fonts/fraunces/600SemiBold_Italic';
import { Fraunces_700Bold } from '@expo-google-fonts/fraunces/700Bold';
import { Manrope_400Regular } from '@expo-google-fonts/manrope/400Regular';
import { Manrope_500Medium } from '@expo-google-fonts/manrope/500Medium';
import { Manrope_600SemiBold } from '@expo-google-fonts/manrope/600SemiBold';
import { Manrope_700Bold } from '@expo-google-fonts/manrope/700Bold';
import { Manrope_800ExtraBold } from '@expo-google-fonts/manrope/800ExtraBold';

import { Atmosphere } from './src/components/Atmosphere';
import { Bear } from './src/components/Bear';
import { ScreenTransition } from './src/components/ScreenTransition';
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { StoryScreen } from './src/screens/StoryScreen';
import { QuestionScreen } from './src/screens/QuestionScreen';
import { HandoffScreen } from './src/screens/HandoffScreen';
import { ResponseScreen } from './src/screens/ResponseScreen';
import { SetupScreen } from './src/screens/SetupScreen';
import {
  loadProfile,
  saveProfile,
  type Profile,
  EMPTY_PROFILE,
} from './src/storage';
import {
  successHaptic,
  tapHaptic,
  useReducedMotion,
} from './src/haptics';
import { colors, fonts } from './src/theme';

type Role = 'owner' | 'guest';

type Screen =
  | 'welcome'
  | 'story'
  | 'question'
  | 'handoff'
  | 'response'
  | 'setup';

const SCREEN_LABELS: Record<Screen, string> = {
  welcome:
    'Hi. I’m the bear. Who’s holding the phone — the human asking, or the person being asked?',
  story: 'The situation. He hasn’t got the words today.',
  question: 'The question. Would you like to get coffee?',
  handoff: 'Hand the phone back to the owner.',
  response: "The owner's turn. Pick a line and say it out loud.",
  setup: 'Set up your name and the lines you want to say.',
};

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Fraunces_600SemiBold,
    Fraunces_600SemiBold_Italic,
    Fraunces_700Bold,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });
  const [profile, setProfile] = useState<Profile>(EMPTY_PROFILE);
  const [hydrated, setHydrated] = useState(false);
  const [screen, setScreen] = useState<Screen>('welcome');
  const [role, setRole] = useState<Role | null>(null);
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null);
  const reducedMotion = useReducedMotion();

  const ready = (fontsLoaded || Boolean(fontError)) && hydrated;

  useEffect(() => {
    let mounted = true;
    loadProfile().then((stored) => {
      if (!mounted) return;
      setProfile(stored);
      setHydrated(true);
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(() => {
      AccessibilityInfo.announceForAccessibility(SCREEN_LABELS[screen]);
    }, 500);
    return () => clearTimeout(timer);
  }, [ready, screen]);

  const goTo = useCallback((next: Screen) => {
    setScreen(next);
  }, []);

  const handleRolePick = useCallback((r: Role) => {
    tapHaptic();
    setRole(r);
    if (r === 'owner') {
      goTo('setup');
    } else {
      goTo('question');
    }
  }, [goTo]);

  const handleYes = useCallback(() => {
    successHaptic();
    setAnswer('yes');
    goTo('handoff');
  }, [goTo]);

  const handleNo = useCallback(() => {
    tapHaptic();
    setAnswer('no');
    goTo('handoff');
  }, [goTo]);

  const handleGiveBack = useCallback(() => {
    tapHaptic();
    goTo('response');
  }, [goTo]);

  const handleRestart = useCallback(() => {
    tapHaptic();
    setRole(null);
    setAnswer(null);
    goTo('welcome');
  }, [goTo]);

  const handleSaveProfile = useCallback(async (next: Profile) => {
    setProfile(next);
    try {
      await saveProfile(next);
    } catch {
      // The in-memory profile still works for this session.
    }
    goTo('welcome');
  }, []);

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (screen === 'welcome') return false;
        if (screen === 'setup') {
          goTo('welcome');
          return true;
        }
        if (screen === 'question') {
          setScreen('welcome');
          return true;
        }
        goTo('welcome');
        return true;
      },
    );

    return () => subscription.remove();
  }, [screen, goTo]);

  if (!ready) {
    return (
      <View style={styles.loadingRoot}>
        <StatusBar style="dark" />
        <View style={styles.loadingMark}>
          <Bear size={150} mood="wave" reducedMotion />
        </View>
        <Text style={styles.loadingTitle}>Bear with me…</Text>
        <Text style={styles.loadingCaption}>
          A very small question is loading.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <View style={styles.root}>
        <StatusBar style="dark" />
        <Atmosphere />
        <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
          <ScreenTransition transitionKey={screen} reducedMotion={reducedMotion}>
            {screen === 'welcome' ? (
              <WelcomeScreen
                onStart={handleRolePick}
                onSettings={() => {
                  tapHaptic();
                  goTo('setup');
                }}
                reducedMotion={reducedMotion}
              />
            ) : null}
            {screen === 'story' ? (
              <StoryScreen
                onBack={() => goTo('welcome')}
                onContinue={() => goTo('question')}
                reducedMotion={reducedMotion}
              />
            ) : null}
            {screen === 'question' ? (
              <QuestionScreen
                name={profile.name}
                onBack={() => goTo('welcome')}
                onYes={handleYes}
                onNo={handleNo}
                reducedMotion={reducedMotion}
              />
            ) : null}
            {screen === 'handoff' ? (
              <HandoffScreen
                name={profile.name}
                answer={answer!}
                onGiveBack={handleGiveBack}
                reducedMotion={reducedMotion}
              />
            ) : null}
            {screen === 'response' ? (
              <ResponseScreen
                profile={profile}
                answer={answer!}
                onRestart={handleRestart}
                reducedMotion={reducedMotion}
              />
            ) : null}
            {screen === 'setup' ? (
              <SetupScreen
                profile={profile}
                onSave={handleSaveProfile}
                onBack={() => goTo('welcome')}
                reducedMotion={reducedMotion}
              />
            ) : null}
          </ScreenTransition>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.cream,
    overflow: 'hidden',
  },
  safe: {
    flex: 1,
  },
  loadingRoot: {
    flex: 1,
    backgroundColor: colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  loadingMark: {
    width: 162,
    height: 190,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingTitle: {
    fontFamily: fonts.display,
    fontSize: 30,
    lineHeight: 36,
    color: colors.ink,
    marginTop: 2,
  },
  loadingCaption: {
    fontFamily: fonts.body,
    fontSize: 12.5,
    lineHeight: 19,
    color: colors.muted,
    marginTop: 7,
    textAlign: 'center',
  },
});
