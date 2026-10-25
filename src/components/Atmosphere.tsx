import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme';
import { Flower, Sparkle } from './ui';

export function Atmosphere() {
  return (
    <View
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={StyleSheet.absoluteFill}
    >
      <LinearGradient
        colors={['#FFF9EF', '#FFF0DF', '#FBE1D3']}
        locations={[0, 0.55, 1]}
        start={{ x: 0.15, y: 0 }}
        end={{ x: 0.85, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={[styles.blob, styles.blobTop]} />
      <View style={[styles.blob, styles.blobRight]} />
      <View style={[styles.blob, styles.blobBottom]} />

      <View style={styles.dotCluster}>
        <View style={[styles.dot, { backgroundColor: colors.coralSoft }]} />
        <View style={[styles.dot, styles.dotSmall]} />
        <View style={[styles.dot, styles.dotTiny]} />
      </View>

      <Flower
        size={54}
        color="rgba(255, 253, 248, 0.48)"
        center="rgba(246, 217, 146, 0.7)"
        style={styles.flowerTop}
      />
      <Sparkle size={22} color="rgba(217, 84, 65, 0.3)" style={styles.sparkLeft} />
      <Sparkle
        size={14}
        color="rgba(165, 101, 69, 0.3)"
        style={styles.sparkRight}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  blob: {
    position: 'absolute',
    backgroundColor: 'rgba(249, 200, 188, 0.34)',
  },
  blobTop: {
    width: 290,
    height: 290,
    borderRadius: 145,
    top: -155,
    left: -110,
  },
  blobRight: {
    width: 190,
    height: 190,
    borderRadius: 95,
    top: '29%',
    right: -115,
    backgroundColor: 'rgba(246, 217, 146, 0.27)',
  },
  blobBottom: {
    width: 340,
    height: 340,
    borderRadius: 170,
    bottom: -235,
    left: -80,
    backgroundColor: 'rgba(247, 182, 171, 0.22)',
  },
  dotCluster: {
    position: 'absolute',
    left: 25,
    bottom: 58,
    width: 27,
    height: 27,
  },
  dot: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    opacity: 0.7,
  },
  dotSmall: {
    left: 15,
    top: 8,
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.butter,
  },
  dotTiny: {
    left: 6,
    top: 18,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.caramel,
  },
  flowerTop: {
    position: 'absolute',
    right: -15,
    top: 88,
    transform: [{ rotate: '16deg' }],
  },
  sparkLeft: {
    position: 'absolute',
    left: 34,
    top: '31%',
    transform: [{ rotate: '-12deg' }],
  },
  sparkRight: {
    position: 'absolute',
    right: 36,
    top: '58%',
  },
});
