import React, { useEffect, useRef } from 'react';
import { Animated, Platform, StyleSheet } from 'react-native';

export function ScreenTransition({
  children,
  transitionKey,
  reducedMotion = false,
}: {
  children: React.ReactNode;
  transitionKey: string;
  reducedMotion?: boolean;
}) {
  const shouldAnimate = !reducedMotion && Platform.OS !== 'web';
  const opacity = useRef(new Animated.Value(shouldAnimate ? 0 : 1)).current;
  const translateY = useRef(
    new Animated.Value(shouldAnimate ? 18 : 0),
  ).current;

  useEffect(() => {
    if (!shouldAnimate) {
      opacity.setValue(1);
      translateY.setValue(0);
      return;
    }

    opacity.setValue(0);
    translateY.setValue(18);

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 420,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        speed: 15,
        bounciness: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, shouldAnimate, transitionKey, translateY]);

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity, transform: [{ translateY }] },
      ]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
