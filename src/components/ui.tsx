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
  backArrow: {
    color: colors.ink,
    fontFamily: fonts.bodySemiBold,
    fontSize: 22,
    lineHeight: 24,
    marginTop: -2,
  },
  brand: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 9,
  },
  brandBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    minHeight: 44,
  },
  brandCentered: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 7,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
  },
  brandMark: {
    alignItems: 'center',
    backgroundColor: colors.pinkWash,
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  brandText: {
    color: colors.brownDeep,
    fontFamily: fonts.bodyBlack,
    fontSize: 10.5,
    letterSpacing: 1.9,
  },
  eyebrow: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.butterSoft,
    borderColor: 'rgba(165, 101, 69, 0.12)',
    borderRadius: 100,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 7,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  eyebrowCenter: {
    alignSelf: 'center',
  },
  eyebrowLight: {
    backgroundColor: 'rgba(255, 253, 248, 0.16)',
    borderColor: 'rgba(255, 253, 248, 0.24)',
  },
  eyebrowText: {
    color: colors.brownDeep,
    fontFamily: fonts.bodyBlack,
    fontSize: 10,
    letterSpacing: 1.45,
  },
  eyebrowTextLight: {
    color: colors.paper,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.coral,
    borderRadius: 100,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    minHeight: 60,
    paddingLeft: 26,
    paddingRight: 18,
  },
  primaryButtonArrow: {
    color: colors.white,
    fontFamily: fonts.bodySemiBold,
    fontSize: 22,
    lineHeight: 24,
    position: 'absolute',
    right: 24,
  },
  primaryButtonPressed: {
    backgroundColor: colors.coralDeep,
  },
  primaryButtonText: {
    color: colors.white,
    fontFamily: fonts.bodyBold,
    fontSize: 16.5,
    letterSpacing: -0.1,
  },
  roundButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 253, 248, 0.78)',
    borderColor: 'rgba(124, 71, 47, 0.14)',
    borderRadius: 21,
    borderWidth: 1,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  roundButtonPressed: {
    opacity: 0.65,
    transform: [{ scale: 0.96 }],
  },
  roundButtonSpacer: {
    height: 42,
    width: 42,
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 253, 248, 0.74)',
    borderColor: 'rgba(124, 71, 47, 0.2)',
    borderRadius: 100,
    borderWidth: 1.4,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    minHeight: 56,
    paddingHorizontal: 24,
  },
  secondaryButtonPressed: {
    backgroundColor: colors.paperDeep,
  },
  secondaryButtonText: {
    color: colors.ink,
    fontFamily: fonts.bodyBold,
    fontSize: 15,
  },
  sliderDot: {
    backgroundColor: colors.ink,
    borderRadius: 3,
    height: 6,
    position: 'absolute',
    top: -2.25,
    width: 6,
  },
  sliderLine: {
    backgroundColor: colors.ink,
    borderRadius: 2,
    height: 1.5,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  sliders: {
    height: 18,
    position: 'relative',
    width: 20,
  },
  textLink: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  textLinkText: {
    color: colors.inkSoft,
    fontFamily: fonts.bodySemiBold,
    fontSize: 13,
    lineHeight: 19,
    textDecorationColor: 'rgba(94, 73, 61, 0.32)',
    textDecorationLine: 'underline',
  },
});
