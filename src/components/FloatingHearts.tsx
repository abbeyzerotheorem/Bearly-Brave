import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { colors } from '../theme';

const HEARTS = [
  {
    top: '22%',
    left: '2%',
    size: 19,
    color: colors.coral,
    delay: 0,
    drift: -7,
  },
  {
    top: '34%',
    right: '1%',
    size: 14,
    color: colors.caramel,
    delay: 950,
    drift: 8,
  },
  {
    top: '57%',
    left: '-2%',
    size: 11,
    color: colors.blush,
    delay: 1750,
    drift: -5,
  },
  {
    top: '65%',
    right: '5%',
    size: 17,
    color: colors.coral,
    delay: 2600,
    drift: 6,
  },
] as const;

export function FloatingHearts({
  reducedMotion = false,
  style,
}: {
  reducedMotion?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const progress = useRef(
    HEARTS.map(() => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    if (reducedMotion) return;

    const loops = progress.map((value, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(HEARTS[index].delay),
          Animated.timing(value, {
            toValue: 1,
            duration: 2700,
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.delay(1100),
        ]),
      ),
    );

    loops.forEach((loop) => loop.start());
    return () => loops.forEach((loop) => loop.stop());
  }, [progress, reducedMotion]);

  return (
    <View
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[styles.container, style]}
    >
      {HEARTS.map((heart, index) => {
        const value = progress[index];
        const translateY = value.interpolate({
          inputRange: [0, 1],
          outputRange: [8, -38],
        });
        const translateX = value.interpolate({
          inputRange: [0, 1],
          outputRange: [0, heart.drift],
        });
        const opacity = value.interpolate({
          inputRange: [0, 0.12, 0.7, 1],
          outputRange: [0, 0.9, 0.8, 0],
        });
        const scale = value.interpolate({
          inputRange: [0, 0.4, 1],
          outputRange: [0.65, 1, 1.06],
        });

        return (
          <Animated.Text
            key={index}
            style={[
              styles.heart,
              {
                top: heart.top,
                left: 'left' in heart ? heart.left : undefined,
                right: 'right' in heart ? heart.right : undefined,
                color: heart.color,
                fontSize: heart.size,
                lineHeight: heart.size * 1.2,
                opacity,
                transform: [{ translateY }, { translateX }, { scale }],
              },
            ]}
          >
            ♥
          </Animated.Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  heart: {
    fontWeight: '700',
    position: 'absolute',
  },
});
