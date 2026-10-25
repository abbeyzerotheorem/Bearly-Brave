import React, { useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { colors, fonts, shadow } from '../theme';
import { tapHaptic } from '../haptics';

type PawProps = {
  size?: number;
  color?: string;
};

export function PawMark({ size = 20, color = colors.coral }: PawProps) {
  const pad = size * 0.46;
  const toe = size * 0.25;
  return (
    <View
      accessible={false}
      style={{ width: size, height: size * 0.9, position: 'relative' }}
    >
      <View
        style={{
          position: 'absolute',
          left: size * 0.27,
          bottom: 0,
          width: pad,
          height: pad * 0.86,
          borderRadius: pad,
          backgroundColor: color,
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: 0,
          top: size * 0.05,
          width: toe,
          height: toe,
          borderRadius: toe,
          backgroundColor: color,
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: size * 0.36,
          top: 0,
          width: toe,
          height: toe,
          borderRadius: toe,
          backgroundColor: color,
        }}
      />
      <View
        style={{
          position: 'absolute',
          right: 0,
          top: size * 0.08,
          width: toe,
          height: toe,
          borderRadius: toe,
          backgroundColor: color,
        }}
      />
    </View>
  );
}

export function Heart({
  size = 16,
  color = colors.coral,
  style,
}: {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Text
      accessible={false}
      style={[
        {
          color,
          fontSize: size,
          lineHeight: size * 1.1,
          fontFamily: fonts.bodyBold,
        },
        style,
      ]}
    >
      ♥
    </Text>
  );
}

export function Sparkle({
  size = 18,
  color = colors.butter,
  style,
}: {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Text
      accessible={false}
      style={[
        {
          color,
          fontSize: size,
          lineHeight: size * 1.2,
          fontFamily: fonts.displaySoft,
        },
        style,
      ]}
    >
      ✦
    </Text>
  );
}

export function Flower({
  size = 42,
  color = colors.paper,
  center = colors.butter,
  style,
}: {
  size?: number;
  color?: string;
  center?: string;
  style?: StyleProp<ViewStyle>;
}) {
  const petal = size * 0.42;
  const petalStyle = {
    position: 'absolute' as const,
    width: petal,
    height: petal,
    borderRadius: petal,
    backgroundColor: color,
  };
  return (
    <View
      accessible={false}
      style={[{ width: size, height: size, position: 'relative' }, style]}
    >
      <View style={[petalStyle, { left: size * 0.29, top: 0 }]} />
      <View style={[petalStyle, { right: 0, top: size * 0.29 }]} />
      <View style={[petalStyle, { left: size * 0.29, bottom: 0 }]} />
      <View style={[petalStyle, { left: 0, top: size * 0.29 }]} />
      <View
        style={{
          position: 'absolute',
          left: size * 0.35,
          top: size * 0.35,
          width: size * 0.3,
          height: size * 0.3,
          borderRadius: size * 0.3,
          backgroundColor: center,
        }}
      />
    </View>
  );
}

export function CoffeeCupIcon({
  size = 42,
  color = colors.coral,
}: {
  size?: number;
  color?: string;
}) {
  const rim = Math.max(2, size * 0.07);
  return (
    <View
      accessible={false}
      style={{ width: size, height: size, position: 'relative' }}
    >
      <View
        style={{
          position: 'absolute',
          left: size * 0.04,
          bottom: size * 0.05,
          width: size * 0.74,
          height: size * 0.09,
          borderRadius: size,
          backgroundColor: color,
          opacity: 0.45,
        }}
      />
      <View
        style={{
          position: 'absolute',
          right: size * 0.03,
          top: size * 0.37,
          width: size * 0.26,
          height: size * 0.24,
          borderWidth: rim,
          borderColor: color,
          borderTopRightRadius: size * 0.16,
          borderBottomRightRadius: size * 0.16,
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: size * 0.08,
          top: size * 0.3,
          width: size * 0.6,
          height: size * 0.46,
          backgroundColor: color,
          borderBottomLeftRadius: size * 0.16,
          borderBottomRightRadius: size * 0.16,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: size * 0.1,
            backgroundColor: 'rgba(255, 253, 248, 0.45)',
          }}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          left: size * 0.22,
          top: size * 0.08,
          width: size * 0.055,
          height: size * 0.17,
          borderRadius: size,
          backgroundColor: color,
          opacity: 0.5,
          transform: [{ rotate: '8deg' }],
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: size * 0.4,
          top: size * 0.02,
          width: size * 0.055,
          height: size * 0.21,
          borderRadius: size,
          backgroundColor: color,
          opacity: 0.35,
          transform: [{ rotate: '-8deg' }],
        }}
      />
    </View>
  );
}

export function SlidersIcon() {
  return (
    <View accessible={false} style={styles.sliders}>
      <View style={[styles.sliderLine, { top: 0 }]}>
        <View style={[styles.sliderDot, { left: 3 }]} />
      </View>
      <View style={[styles.sliderLine, { top: 7 }]}>
        <View style={[styles.sliderDot, { right: 3 }]} />
      </View>
      <View style={[styles.sliderLine, { top: 14 }]}>
        <View style={[styles.sliderDot, { left: 6 }]} />
      </View>
    </View>
  );
}

export function BrandBar({
  onSettings,
  onBack,
}: {
  onSettings?: () => void;
  onBack?: () => void;
}) {
  return (
    <View style={styles.brandBar}>
      {onBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={10}
          onPress={() => {
            tapHaptic();
            onBack();
          }}
          style={({ pressed }) => [
            styles.roundButton,
            pressed && styles.roundButtonPressed,
          ]}
        >
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
      ) : (
        <View style={styles.brand}>
          <View style={styles.brandMark}>
            <PawMark size={18} color={colors.coral} />
          </View>
          <Text style={styles.brandText}>BEAR WITH ME</Text>
        </View>
      )}

      {onBack ? (
        <View style={styles.brandCentered}>
          <PawMark size={14} color={colors.coral} />
          <Text style={styles.brandText}>BEAR WITH ME</Text>
        </View>
      ) : null}

      {onSettings ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Set up your details"
          accessibilityHint="For the person who owns this phone"
          hitSlop={10}
          onPress={() => {
            tapHaptic();
            onSettings();
          }}
          style={({ pressed }) => [
            styles.roundButton,
            pressed && styles.roundButtonPressed,
          ]}
        >
          <SlidersIcon />
        </Pressable>
      ) : (
        <View style={styles.roundButtonSpacer} />
      )}
    </View>
  );
}

export function Eyebrow({
  children,
  tone = 'default',
  center = false,
}: {
  children: React.ReactNode;
  tone?: 'default' | 'light';
  center?: boolean;
}) {
  return (
    <View
      style={[
        styles.eyebrow,
        center ? styles.eyebrowCenter : undefined,
        tone === 'light' ? styles.eyebrowLight : undefined,
      ]}
    >
      <Sparkle
        size={12}
        color={tone === 'light' ? colors.butter : colors.coral}
      />
      <Text
        style={[
          styles.eyebrowText,
          tone === 'light' ? styles.eyebrowTextLight : undefined,
        ]}
      >
        {children}
      </Text>
    </View>
  );
}

type ButtonProps = {
  label: string;
  onPress: () => void;
  icon?: React.ReactNode;
  accessibilityHint?: string;
  style?: StyleProp<ViewStyle>;
};

function usePressScale() {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.975,
      useNativeDriver: true,
      speed: 34,
      bounciness: 0,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 7,
    }).start();
  };

  return { scale, pressIn, pressOut };
}

export function PrimaryButton({
  label,
  onPress,
  icon,
  accessibilityHint,
  style,
}: ButtonProps) {
  const { scale, pressIn, pressOut } = usePressScale();

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityHint={accessibilityHint}
        onPressIn={pressIn}
        onPressOut={pressOut}
        onPress={() => {
          tapHaptic();
          onPress();
        }}
        style={({ pressed }) => [
          styles.primaryButton,
          shadow.button,
          pressed && styles.primaryButtonPressed,
        ]}
      >
        <Text style={styles.primaryButtonText}>{label}</Text>
        {icon ?? <Text style={styles.primaryButtonArrow}>→</Text>}
      </Pressable>
    </Animated.View>
  );
}

export function SecondaryButton({
  label,
  onPress,
  icon,
  accessibilityHint,
  style,
}: ButtonProps) {
  const { scale, pressIn, pressOut } = usePressScale();

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityHint={accessibilityHint}
        onPressIn={pressIn}
        onPressOut={pressOut}
        onPress={() => {
          tapHaptic();
          onPress();
        }}
        style={({ pressed }) => [
          styles.secondaryButton,
          pressed && styles.secondaryButtonPressed,
        ]}
      >
        <Text style={styles.secondaryButtonText}>{label}</Text>
        {icon}
      </Pressable>
    </Animated.View>
  );
}

export function TextLink({
  label,
  onPress,
  style,
}: {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={label}
      hitSlop={10}
      onPress={() => {
        tapHaptic();
        onPress();
      }}
      style={({ pressed }) => [
        styles.textLink,
        style,
        pressed && { opacity: 0.55 },
      ]}
    >
      <Text style={styles.textLinkText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  sliders: {
    width: 20,
    height: 18,
    position: 'relative',
  },
  sliderLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1.5,
    borderRadius: 2,
    backgroundColor: colors.ink,
  },
  sliderDot: {
    position: 'absolute',
    top: -2.25,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.ink,
  },
  brandBar: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  brandCentered: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
  },
  brandMark: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.pinkWash,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    fontFamily: fonts.bodyBlack,
    fontSize: 10.5,
    letterSpacing: 1.9,
    color: colors.brownDeep,
  },
  roundButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255, 253, 248, 0.78)',
    borderWidth: 1,
    borderColor: 'rgba(124, 71, 47, 0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundButtonPressed: {
    opacity: 0.65,
    transform: [{ scale: 0.96 }],
  },
  roundButtonSpacer: {
    width: 42,
    height: 42,
  },
  backArrow: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 22,
    lineHeight: 24,
    color: colors.ink,
    marginTop: -2,
  },
  eyebrow: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: colors.butterSoft,
    borderRadius: 100,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(165, 101, 69, 0.12)',
  },
  eyebrowLight: {
    backgroundColor: 'rgba(255, 253, 248, 0.16)',
    borderColor: 'rgba(255, 253, 248, 0.24)',
  },
  eyebrowCenter: {
    alignSelf: 'center',
  },
  eyebrowText: {
    fontFamily: fonts.bodyBlack,
    fontSize: 10,
    letterSpacing: 1.45,
    color: colors.brownDeep,
  },
  eyebrowTextLight: {
    color: colors.paper,
  },
  primaryButton: {
    minHeight: 60,
    borderRadius: 100,
    backgroundColor: colors.coral,
    paddingLeft: 26,
    paddingRight: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  primaryButtonPressed: {
    backgroundColor: colors.coralDeep,
  },
  primaryButtonText: {
    fontFamily: fonts.bodyBold,
    fontSize: 16.5,
    letterSpacing: -0.1,
    color: colors.white,
  },
  primaryButtonArrow: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 22,
    lineHeight: 24,
    color: colors.white,
    position: 'absolute',
    right: 24,
  },
  secondaryButton: {
    minHeight: 56,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 253, 248, 0.74)',
    borderWidth: 1.4,
    borderColor: 'rgba(124, 71, 47, 0.2)',
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryButtonPressed: {
    backgroundColor: colors.paperDeep,
  },
  secondaryButtonText: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: colors.ink,
  },
  textLink: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  textLinkText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 13,
    lineHeight: 19,
    color: colors.inkSoft,
    textDecorationLine: 'underline',
    textDecorationColor: 'rgba(94, 73, 61, 0.32)',
  },
});
