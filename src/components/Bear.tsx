import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts } from '../theme';
import { boopHaptic } from '../haptics';
import { Flower } from './ui';

export type BearMood =
  | 'wave'
  | 'cheer'
  | 'gentle'
  | 'shy'
  | 'excited'
  | 'inLove'
  | 'nervous'
  | 'speaking';

type BearProps = {
  size?: number;
  mood?: BearMood;
  onBoop?: () => void;
  reducedMotion?: boolean;
  speaking?: boolean;
};

const CANVAS_WIDTH = 240;
const CANVAS_HEIGHT = 280;

export function Bear({
  size = 236,
  mood = 'wave',
  onBoop,
  reducedMotion = false,
  speaking = false,
}: BearProps) {
  const bob = useRef(new Animated.Value(0)).current;
  const breathe = useRef(new Animated.Value(0)).current;
  const wave = useRef(new Animated.Value(0)).current;
  const blink = useRef(new Animated.Value(1)).current;
  const earWiggle = useRef(new Animated.Value(0)).current;
  const poke = useRef(new Animated.Value(1)).current;
  const headTilt = useRef(new Animated.Value(0)).current;
  const mouth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (reducedMotion) {
      bob.setValue(0);
      breathe.setValue(0);
      wave.setValue(0.35);
      blink.setValue(1);
      earWiggle.setValue(0);
      headTilt.setValue(0);
      mouth.setValue(0);
      return;
    }

    const bobLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(bob, {
          toValue: 1,
          duration: mood === 'cheer' || mood === 'excited' ? 420 : 1700,
          useNativeDriver: true,
        }),
        Animated.timing(bob, {
          toValue: 0,
          duration: mood === 'cheer' || mood === 'excited' ? 420 : 1700,
          useNativeDriver: true,
        }),
      ]),
    );

    const breatheLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(breathe, {
          toValue: 1,
          duration: mood === 'excited' ? 1200 : 2100,
          useNativeDriver: true,
        }),
        Animated.timing(breathe, {
          toValue: 0,
          duration: mood === 'excited' ? 1200 : 2100,
          useNativeDriver: true,
        }),
      ]),
    );

    const waveLoop = Animated.loop(
      Animated.sequence([
        Animated.delay(mood === 'cheer' ? 300 : 1500),
        Animated.timing(wave, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(wave, {
          toValue: 0.08,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(wave, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(wave, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.delay(mood === 'cheer' ? 500 : 2200),
      ]),
    );

    const blinkLoop = Animated.loop(
      Animated.sequence([
        Animated.delay(2600),
        Animated.timing(blink, {
          toValue: 0.08,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.delay(90),
        Animated.timing(blink, {
          toValue: 1,
          duration: 105,
          useNativeDriver: true,
        }),
        Animated.delay(1800),
      ]),
    );

    const earLoop = Animated.loop(
      Animated.sequence([
        Animated.delay(1200),
        Animated.timing(earWiggle, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(earWiggle, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.delay(3200),
      ]),
    );

    const tiltLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(headTilt, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(headTilt, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]),
    );

    const speakLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(mouth, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(mouth, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(mouth, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(mouth, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.delay(700),
      ]),
    );

    bobLoop.start();
    breatheLoop.start();
    blinkLoop.start();
    earLoop.start();
    if (mood !== 'gentle' && mood !== 'shy') waveLoop.start();
    if (mood === 'shy' || mood === 'nervous') tiltLoop.start();
    if (speaking && mood === 'speaking') speakLoop.start();

    return () => {
      bobLoop.stop();
      breatheLoop.stop();
      blinkLoop.stop();
      earLoop.stop();
      waveLoop.stop();
      tiltLoop.stop();
      speakLoop.stop();
    };
  }, [
    blink,
    bob,
    breathe,
    earWiggle,
    headTilt,
    mood,
    mouth,
    reducedMotion,
    speaking,
    wave,
  ]);

  const handleBoop = () => {
    if (!onBoop) return;
    boopHaptic();
    onBoop();
    if (reducedMotion) return;

    poke.stopAnimation();
    Animated.sequence([
      Animated.spring(poke, {
        toValue: 1.045,
        speed: 40,
        bounciness: 4,
        useNativeDriver: true,
      }),
      Animated.spring(poke, {
        toValue: 1,
        speed: 20,
        bounciness: 8,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const scale = size / CANVAS_WIDTH;
  const height = size * (CANVAS_HEIGHT / CANVAS_WIDTH);

  const bobY = bob.interpolate({
    inputRange: [0, 1],
    outputRange: [1.5, mood === 'cheer' ? -14 : -5],
  });
  const tilt = bob.interpolate({
    inputRange: [0, 1],
    outputRange: ['-1.1deg', mood === 'cheer' ? '2.4deg' : '1.1deg'],
  });
  const breathScale = breathe.interpolate({
    inputRange: [0, 1],
    outputRange: [1, mood === 'excited' ? 1.02 : 1.012],
  });
  const waveRotate = wave.interpolate({
    inputRange: [0, 1],
    outputRange: ['4deg', '21deg'],
  });
  const earRotate = earWiggle.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-7deg'],
  });
  const headTiltRotate = headTilt.interpolate({
    inputRange: [0, 1],
    outputRange: ['-6deg', '6deg'],
  });
  const mouthOpen = mouth.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 6],
  });
  const mouthHeight = mouth.interpolate({
    inputRange: [0, 1],
    outputRange: [14, 20],
  });

  const isCheer = mood === 'cheer';
  const isGentle = mood === 'gentle';
  const isShy = mood === 'shy';
  const isExcited = mood === 'excited';
  const isInLove = mood === 'inLove';
  const isNervous = mood === 'nervous';
  const isSpeaking = mood === 'speaking';

  return (
    <Pressable
      accessibilityRole={onBoop ? 'button' : undefined}
      accessibilityLabel={onBoop ? 'Boop the bear' : 'Bear'}
      accessibilityHint={
        onBoop ? 'The bear has a few encouraging things to say' : undefined
      }
      disabled={!onBoop}
      onPress={handleBoop}
      hitSlop={onBoop ? 12 : 0}
      style={({ pressed }) => [
        { width: size, height },
        onBoop && pressed ? { opacity: 0.98 } : undefined,
      ]}
    >
      <Animated.View
        style={{
          width: size,
          height,
          transform: [{ scale: poke }],
        }}
      >
        <Animated.View
          style={[
            styles.canvas,
            {
              transformOrigin: 'top left',
              transform: [
                { scale },
                { translateY: bobY },
                { rotate: tilt },
                ...(isShy || isNervous ? [{ rotate: headTiltRotate }] : []),
                { scale: breathScale },
              ],
            },
          ]}
        >
          <View style={styles.groundShadow} />

          <Animated.View
            style={[
              styles.ear,
              styles.earLeft,
              { transform: [{ rotate: earRotate }] },
            ]}
          >
            <View style={styles.earInner} />
          </Animated.View>
          <Animated.View
            style={[
              styles.ear,
              styles.earRight,
              { transform: [{ rotate: earRotate }] },
            ]}
          >
            <View style={styles.earInner} />
          </Animated.View>

          <Flower
            size={30}
            color={colors.paper}
            center={colors.butter}
            style={styles.daisy}
          />

          <View style={styles.feet}>
            <View style={[styles.foot, { left: 52 }]} />
            <View style={[styles.foot, { right: 52 }]} />
          </View>

          <View style={styles.body}>
            <LinearGradient
              colors={['#BC7A54', '#9C593B']}
              start={{ x: 0.25, y: 0 }}
              end={{ x: 0.8, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.belly} />
          </View>

          {!isCheer && !isExcited ? (
            <>
              <View style={[styles.restingArm, styles.restingArmLeft]}>
                <LinearGradient
                  colors={['#B3704B', '#965437']}
                  style={StyleSheet.absoluteFill}
                />
              </View>
              {isGentle || isShy || isInLove ? (
                <View style={[styles.restingArm, styles.restingArmRight]}>
                  <LinearGradient
                    colors={['#B3704B', '#965437']}
                    style={StyleSheet.absoluteFill}
                  />
                </View>
              ) : null}
            </>
          ) : (
            <>
              <View style={[styles.cheerArm, styles.cheerArmLeft]}>
                <View style={styles.cheerArmShape} />
                <View style={styles.cheerPaw}>
                  <View style={styles.pawPad} />
                </View>
              </View>
              <View style={styles.cheerArmRight}>
                <View style={styles.cheerArmShape} />
                <View style={styles.cheerPaw}>
                  <View style={styles.pawPad} />
                </View>
              </View>
            </>
          )}

          <View style={styles.head}>
            <LinearGradient
              colors={['#BF7D55', '#9F5C3E']}
              start={{ x: 0.2, y: 0.05 }}
              end={{ x: 0.85, y: 0.95 }}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.headHighlight} />

            <View style={styles.face}>
              {isCheer || isExcited ? (
                <>
                  <View style={[styles.happyEye, { left: 43 }]} />
                  <View style={[styles.happyEye, { right: 43 }]} />
                </>
              ) : (
                <>
                  <Animated.View
                    style={[
                      styles.eye,
                      { left: 45, transform: [{ scaleY: blink }] },
                    ]}
                  >
                    <View style={styles.eyeGlint} />
                  </Animated.View>
                  <Animated.View
                    style={[
                      styles.eye,
                      { right: 45, transform: [{ scaleY: blink }] },
                    ]}
                  >
                    <View style={styles.eyeGlint} />
                  </Animated.View>
                  {(isShy || isGentle || isNervous) && (
                    <>
                      <View style={[styles.softBrow, { left: 42 }]} />
                      <View
                        style={[
                          styles.softBrow,
                          styles.softBrowRight,
                          { right: 42 },
                        ]}
                      />
                    </>
                  )}
                </>
              )}

              <View style={[styles.blush, { left: 19 }]} />
              <View style={[styles.blush, { right: 19 }]} />

              <View style={styles.muzzle}>
                <LinearGradient
                  colors={['#FCEAD3', '#F3D1AE']}
                  start={{ x: 0.4, y: 0 }}
                  end={{ x: 0.6, y: 1 }}
                  style={StyleSheet.absoluteFill}
                />
              </View>

              <View style={styles.nose}>
                <View style={styles.noseGlint} />
              </View>

              {isCheer || isExcited ? (
                <View style={styles.openMouth}>
                  <View style={styles.tongue} />
                </View>
              ) : isSpeaking ? (
                <Animated.View
                  style={[
                    styles.speakingMouth,
                    { height: mouthHeight },
                  ]}
                />
              ) : (
                <View style={styles.smile} />
              )}

              {isInLove && (
                <View style={styles.loveEyes}>
                  <Text style={styles.loveEyeText}>♥</Text>
                  <Text style={styles.loveEyeText}>♥</Text>
                </View>
              )}
            </View>
          </View>

          {mood === 'wave' ? (
            <Animated.View
              style={[
                styles.waveArm,
                {
                  transformOrigin: '50% 100%',
                  transform: [{ rotate: waveRotate }],
                },
              ]}
            >
              <LinearGradient
                colors={['#BE7B55', '#975638']}
                start={{ x: 0.2, y: 0 }}
                end={{ x: 0.8, y: 1 }}
                style={styles.waveArmShape}
              />
              <View style={styles.wavePaw}>
                <View style={styles.wavePad} />
                <View style={[styles.toe, { left: 11, top: 7 }]} />
                <View style={[styles.toe, { right: 11, top: 7 }]} />
                <View style={[styles.toe, { left: 19, top: 1 }]} />
              </View>
            </Animated.View>
          ) : null}

          {isGentle || isInLove ? (
            <View style={styles.heldHeart}>
              <Text style={styles.heldHeartText}>♥</Text>
            </View>
          ) : null}
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  canvas: {
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  groundShadow: {
    position: 'absolute',
    bottom: 1,
    left: 54,
    width: 134,
    height: 17,
    borderRadius: 100,
    backgroundColor: 'rgba(123, 70, 46, 0.14)',
    transform: [{ scaleY: 0.55 }],
  },
  ear: {
    position: 'absolute',
    top: 9,
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#A56141',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#65351F',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 2,
  },
  earLeft: {
    left: 24,
  },
  earRight: {
    right: 24,
  },
  earInner: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#E7A98B',
    opacity: 0.92,
  },
  daisy: {
    position: 'absolute',
    left: 14,
    top: -4,
    transform: [{ rotate: '-14deg' }],
    zIndex: 4,
  },
  feet: {
    position: 'absolute',
    bottom: 1,
    left: 0,
    right: 0,
    height: 42,
  },
  foot: {
    position: 'absolute',
    bottom: 0,
    width: 62,
    height: 36,
    borderRadius: 30,
    backgroundColor: '#8C4C32',
  },
  body: {
    position: 'absolute',
    bottom: 14,
    alignSelf: 'center',
    width: 172,
    height: 162,
    borderRadius: 84,
    overflow: 'hidden',
    shadowColor: '#63331F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.17,
    shadowRadius: 10,
    elevation: 4,
  },
  belly: {
    position: 'absolute',
    bottom: 4,
    alignSelf: 'center',
    width: 98,
    height: 112,
    borderRadius: 55,
    backgroundColor: '#F8DFC2',
    opacity: 0.92,
  },
  restingArm: {
    position: 'absolute',
    bottom: 66,
    width: 44,
    height: 88,
    borderRadius: 28,
    overflow: 'hidden',
    zIndex: 3,
  },
  restingArmLeft: {
    left: 20,
    transform: [{ rotate: '17deg' }],
  },
  restingArmRight: {
    right: 20,
    transform: [{ rotate: '-17deg' }],
  },
  cheerArm: {
    position: 'absolute',
    top: 2,
    width: 50,
    height: 198,
    zIndex: 1,
    alignItems: 'center',
    transformOrigin: '50% 100%',
  },
  cheerArmLeft: {
    left: 12,
    transform: [{ rotate: '-12deg' }],
  },
  cheerArmRight: {
    position: 'absolute',
    top: 2,
    right: 12,
    width: 50,
    height: 198,
    zIndex: 1,
    alignItems: 'center',
    transformOrigin: '50% 100%',
    transform: [{ rotate: '12deg' }],
  },
  cheerPaw: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: '#B3704B',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -3,
    zIndex: 2,
  },
  cheerArmShape: {
    position: 'absolute',
    top: 43,
    width: 38,
    height: 148,
    borderRadius: 22,
    backgroundColor: '#A56141',
    zIndex: 1,
  },
  pawPad: {
    width: 21,
    height: 18,
    borderRadius: 12,
    backgroundColor: '#E8B495',
    marginTop: 4,
  },
  head: {
    position: 'absolute',
    top: 17,
    alignSelf: 'center',
    width: 191,
    height: 168,
    borderRadius: 96,
    overflow: 'hidden',
    zIndex: 5,
    shadowColor: '#5D2F1E',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  headHighlight: {
    position: 'absolute',
    top: 18,
    left: 36,
    width: 74,
    height: 47,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 248, 240, 0.16)',
    transform: [{ rotate: '-18deg' }],
  },
  face: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  eye: {
    position: 'absolute',
    top: 54,
    width: 16,
    height: 22,
    borderRadius: 10,
    backgroundColor: '#342016',
  },
  eyeGlint: {
    position: 'absolute',
    top: 3,
    left: 3,
    width: 5,
    height: 7,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.86)',
    transform: [{ rotate: '14deg' }],
  },
  happyEye: {
    position: 'absolute',
    top: 57,
    width: 22,
    height: 13,
    borderTopWidth: 4,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderColor: '#342016',
  },
  softBrow: {
    position: 'absolute',
    top: 41,
    width: 18,
    height: 8,
    borderTopWidth: 3,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderColor: 'rgba(75, 42, 30, 0.52)',
    transform: [{ rotate: '-8deg' }],
  },
  softBrowRight: {
    transform: [{ rotate: '8deg' }],
  },
  blush: {
    position: 'absolute',
    top: 98,
    width: 31,
    height: 17,
    borderRadius: 12,
    backgroundColor: '#EF9788',
    opacity: 0.5,
  },
  muzzle: {
    position: 'absolute',
    top: 82,
    alignSelf: 'center',
    width: 91,
    height: 73,
    borderRadius: 46,
    overflow: 'hidden',
  },
  nose: {
    position: 'absolute',
    top: 90,
    alignSelf: 'center',
    width: 29,
    height: 20,
    borderRadius: 13,
    backgroundColor: '#4B2B1E',
  },
  noseGlint: {
    position: 'absolute',
    top: 4,
    left: 6,
    width: 9,
    height: 4,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.35)',
    transform: [{ rotate: '-8deg' }],
  },
  smile: {
    position: 'absolute',
    top: 112,
    alignSelf: 'center',
    width: 30,
    height: 15,
    borderBottomWidth: 3,
    borderLeftWidth: 2.5,
    borderRightWidth: 2.5,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    borderColor: '#5D3626',
  },
  openMouth: {
    position: 'absolute',
    top: 111,
    alignSelf: 'center',
    width: 31,
    height: 22,
    borderRadius: 15,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    backgroundColor: '#4B2B1E',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  tongue: {
    width: 22,
    height: 11,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#E58478',
  },
  speakingMouth: {
    position: 'absolute',
    top: 112,
    alignSelf: 'center',
    width: 30,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    backgroundColor: '#4B2B1E',
    overflow: 'hidden',
  },
  waveArm: {
    position: 'absolute',
    top: 87,
    right: 10,
    width: 64,
    height: 140,
    zIndex: 7,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  waveArmShape: {
    position: 'absolute',
    top: 29,
    right: 13,
    width: 42,
    height: 99,
    borderRadius: 24,
    overflow: 'hidden',
  },
  wavePaw: {
    width: 51,
    height: 49,
    borderRadius: 26,
    backgroundColor: '#B3704B',
    marginTop: 1,
    marginRight: 8,
    shadowColor: '#6B3822',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 4,
    elevation: 3,
  },
  wavePad: {
    position: 'absolute',
    left: 14,
    bottom: 8,
    width: 23,
    height: 19,
    borderRadius: 12,
    backgroundColor: '#E8B495',
  },
  toe: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E8B495',
  },
  heldHeart: {
    position: 'absolute',
    bottom: 35,
    alignSelf: 'center',
    width: 55,
    height: 50,
    borderRadius: 27,
    backgroundColor: colors.paper,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 8,
    shadowColor: '#6B3822',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  heldHeartText: {
    fontFamily: fonts.bodyBold,
    fontSize: 31,
    lineHeight: 35,
    color: colors.coral,
    marginTop: -1,
  },
  loveEyes: {
    position: 'absolute',
    top: 52,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 14,
  },
  loveEyeText: {
    fontSize: 20,
    lineHeight: 22,
    color: colors.coral,
  },
});
