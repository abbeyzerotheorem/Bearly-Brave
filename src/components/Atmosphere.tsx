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
    backgroundColor: 'rgba(249, 200, 188, 0.34)',
    position: 'absolute',
  },
  blobBottom: {
    backgroundColor: 'rgba(247, 182, 171, 0.22)',
    borderRadius: 170,
    bottom: -235,
    height: 340,
    left: -80,
    width: 340,
  },
  blobRight: {
    backgroundColor: 'rgba(246, 217, 146, 0.27)',
    borderRadius: 95,
    height: 190,
    right: -115,
    top: '29%',
    width: 190,
  },
  blobTop: {
    borderRadius: 145,
    height: 290,
    left: -110,
    top: -155,
    width: 290,
  },
  dot: {
    borderRadius: 4,
    height: 8,
    left: 0,
    opacity: 0.7,
    position: 'absolute',
    top: 0,
    width: 8,
  },
  dotCluster: {
    bottom: 58,
    height: 27,
    left: 25,
    position: 'absolute',
    width: 27,
  },
  dotSmall: {
    backgroundColor: colors.butter,
    borderRadius: 3,
    height: 5,
    left: 15,
    top: 8,
    width: 5,
  },
  dotTiny: {
    backgroundColor: colors.caramel,
    borderRadius: 2,
    height: 4,
    left: 6,
    top: 18,
    width: 4,
  },
  flowerTop: {
    position: 'absolute',
    right: -15,
    top: 88,
    transform: [{ rotate: '16deg' }],
  },
  sparkLeft: {
    left: 34,
    position: 'absolute',
    top: '31%',
    transform: [{ rotate: '-12deg' }],
  },
  sparkRight: {
    position: 'absolute',
    right: 36,
    top: '58%',
  },
});
