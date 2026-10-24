import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import { Animated, Easing, Image, Platform, StyleSheet, Text, View } from 'react-native';

import { useAppWidth } from '../hooks';
import { colors } from '../theme/colors';
import { font } from '../theme/fonts';

const native = Platform.OS !== 'web';
const HERO_SHOE = require('../../assets/shoes/shoe-11.webp');

/** Branded intro shown once on launch, picking up where the native splash leaves off. */
export function AnimatedSplash({ onFinish }: { onFinish: () => void }) {
  const width = useAppWidth();
  const logo = useRef(new Animated.Value(0)).current;
  const shoe = useRef(new Animated.Value(0)).current;
  const text = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;
  const exit = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logo, { toValue: 1, friction: 6, tension: 60, useNativeDriver: native }),
        Animated.timing(shoe, { toValue: 1, duration: 750, easing: Easing.out(Easing.back(1.4)), useNativeDriver: native }),
      ]),
      Animated.parallel([
        Animated.timing(text, { toValue: 1, duration: 450, useNativeDriver: native }),
        Animated.timing(progress, { toValue: 1, duration: 1100, easing: Easing.inOut(Easing.quad), useNativeDriver: false }),
      ]),
      Animated.timing(exit, { toValue: 0, duration: 350, useNativeDriver: native }),
    ]).start(onFinish);
  }, [exit, logo, onFinish, progress, shoe, text]);

  const shoeSize = Math.min(width * 0.82, 360);

  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.root, { opacity: exit }]}>
      <LinearGradient colors={['#0A3A2B', '#0F4D3A', '#1E7A55']} style={StyleSheet.absoluteFill} />
      <View style={[styles.ring, { width: width * 1.3, height: width * 1.3, borderRadius: width * 0.65, top: -width * 0.35, right: -width * 0.55 }]} />
      <View style={[styles.ring, { width: width, height: width, borderRadius: width / 2, bottom: -width * 0.3, left: -width * 0.5 }]} />

      <Animated.View
        style={[
          styles.logo,
          { opacity: logo, transform: [{ scale: logo.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1] }) }] },
        ]}
      >
        <MaterialCommunityIcons name="shoe-sneaker" size={44} color={colors.primaryDark} />
      </Animated.View>

      <Animated.View
        style={{
          opacity: shoe,
          transform: [
            { translateX: shoe.interpolate({ inputRange: [0, 1], outputRange: [width * 0.6, 0] }) },
            { rotate: shoe.interpolate({ inputRange: [0, 1], outputRange: ['20deg', '-12deg'] }) },
          ],
        }}
      >
        <Image source={HERO_SHOE} style={{ width: shoeSize, height: shoeSize * 0.8 }} resizeMode="contain" />
      </Animated.View>

      <Animated.View
        style={{
          alignItems: 'center',
          opacity: text,
          transform: [{ translateY: text.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }],
        }}
      >
        <Text style={styles.brand}>
          FITS<Text style={{ color: colors.accent }}>X</Text>
        </Text>
        <Text style={styles.tagline}>Run Better. Be Stronger.</Text>
      </Animated.View>

      <View style={styles.track}>
        <Animated.View
          style={[styles.bar, { width: progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }]}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: { alignItems: 'center', justifyContent: 'center', zIndex: 100, overflow: 'hidden' },
  ring: { position: 'absolute', borderWidth: 1.5, borderColor: 'rgba(63, 214, 140, 0.18)' },
  logo: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  brand: { fontFamily: font.extrabold, fontSize: 44, letterSpacing: 6, color: colors.white, marginTop: 8 },
  tagline: { fontFamily: font.medium, fontSize: 15, color: '#BFE6D2', marginTop: 2 },
  track: {
    position: 'absolute',
    bottom: 70,
    width: 120,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.15)',
    overflow: 'hidden',
  },
  bar: { height: '100%', borderRadius: 2, backgroundColor: colors.accent },
});
