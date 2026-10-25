import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { colors } from '../theme';

const PIECES = [
  { x: 0.08, size: 15, delay: 0, drift: 24, kind: 'heart', color: colors.coral },
  { x: 0.18, size: 9, delay: 90, drift: -16, kind: 'dot', color: colors.butter },
  { x: 0.28, size: 18, delay: 30, drift: 18, kind: 'heart', color: colors.blush },
  { x: 0.36, size: 8, delay: 180, drift: -22, kind: 'dot', color: colors.caramel },
  { x: 0.44, size: 13, delay: 10, drift: 30, kind: 'spark', color: colors.butter },
  { x: 0.52, size: 16, delay: 130, drift: -18, kind: 'heart', color: colors.coral },
  { x: 0.61, size: 8, delay: 60, drift: 20, kind: 'dot', color: colors.coral },
  { x: 0.69, size: 14, delay: 230, drift: -28, kind: 'spark', color: colors.paper },
  { x: 0.77, size: 18, delay: 40, drift: 22, kind: 'heart', color: colors.caramel },
  { x: 0.85, size: 9, delay: 150, drift: -20, kind: 'dot', color: colors.butter },
  { x: 0.93, size: 13, delay: 20, drift: 16, kind: 'heart', color: colors.coral },
  { x: 0.13, size: 12, delay: 280, drift: 32, kind: 'spark', color: colors.paper },
  { x: 0.32, size: 7, delay: 240, drift: -24, kind: 'dot', color: colors.blush },
  { x: 0.57, size: 11, delay: 300, drift: 26, kind: 'spark', color: colors.butter },
  { x: 0.73, size: 9, delay: 200, drift: -14, kind: 'dot', color: colors.coral },
  { x: 0.89, size: 20, delay: 100, drift: -30, kind: 'heart', color: colors.pinkWash },
  { x: 0.49, size: 10, delay: 360, drift: 18, kind: 'dot', color: colors.butter },
  { x: 0.22, size: 16, delay: 320, drift: -18, kind: 'heart', color: colors.coralSoft },
] as const;

export function Confetti({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const { height } = useWindowDimensions();
  const progress = useRef(PIECES.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    if (reducedMotion) return;

    const animations = progress.map((value, index) => {
      const piece = PIECES[index];
      return Animated.timing(value, {
        toValue: 1,
        duration: 2700 + (index % 5) * 180,
        delay: piece.delay,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      });
    });

    animations.forEach((animation) => animation.start());
    return () => animations.forEach((animation) => animation.stop());
  }, [progress, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <View
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={StyleSheet.absoluteFill}
    >
      {PIECES.map((piece, index) => {
        const value = progress[index];
        const translateY = value.interpolate({
          inputRange: [0, 1],
          outputRange: [-50, height + 70],
        });
        const translateX = value.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, piece.drift, piece.drift * -0.35],
        });
        const rotate = value.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', `${index % 2 === 0 ? 260 : -300}deg`],
        });
        const opacity = value.interpolate({
          inputRange: [0, 0.08, 0.82, 1],
          outputRange: [0, 1, 0.9, 0],
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.piece,
              {
                left: `${piece.x * 100}%`,
                opacity,
                transform: [{ translateY }, { translateX }, { rotate }],
              },
            ]}
          >
            {piece.kind === 'dot' ? (
              <View
                style={{
                  width: piece.size,
                  height: piece.size,
                  borderRadius: piece.size / 2,
                  backgroundColor: piece.color,
                }}
              />
            ) : (
              <Text
                style={{
                  color: piece.color,
                  fontSize: piece.size,
                  lineHeight: piece.size * 1.1,
                }}
              >
                {piece.kind === 'heart' ? '♥' : '✦'}
              </Text>
            )}
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  piece: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
  },
});
