import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppWidth } from '../hooks';
import { colors } from '../theme/colors';
import { font } from '../theme/fonts';

const HERO_SHOE = require('../../assets/shoes/shoe-11.webp');

type Props = { title: string; subtitle: string; topRight?: ReactNode; topLeft?: ReactNode; compact?: boolean; children: ReactNode };

/** Mint hero with the brand and a floating shoe, over a white sheet holding the form. */
export function AuthLayout({ title, subtitle, topRight, topLeft, compact, children }: Props) {
  const width = useAppWidth();
  const insets = useSafeAreaInsets();
  const shoeW = width * (compact ? 0.5 : 0.62);

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        style={styles.flex}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <LinearGradient colors={['#D3F1E1', '#E9F7F0', '#DDF3E7']} style={[styles.hero, { paddingTop: insets.top + 8 }]}>
          <View style={styles.dotGrid} pointerEvents="none">
            {Array.from({ length: 48 }).map((_, i) => (
              <View key={i} style={styles.gridDot} />
            ))}
          </View>
          <View style={styles.topBar}>
            <View>{topLeft}</View>
            <View>{topRight}</View>
          </View>
          <View style={styles.heroRow} pointerEvents="none">
            <Text style={styles.brand}>
              fits<Text style={{ color: colors.accent }}>x</Text>
            </Text>
            <Image
              source={HERO_SHOE}
              resizeMode="contain"
              style={{ width: shoeW, height: shoeW * 0.78, transform: [{ rotate: '-14deg' }] }}
            />
          </View>
        </LinearGradient>

        <View style={[styles.sheet, { paddingBottom: insets.bottom + 24 }]}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          {children}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.white },
  hero: { paddingBottom: 46, overflow: 'hidden' },
  dotGrid: { position: 'absolute', right: 18, top: 70, width: 130, flexDirection: 'row', flexWrap: 'wrap', gap: 12, opacity: 0.55 },
  gridDot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: '#8ED3AF' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, minHeight: 44, zIndex: 2 },
  heroRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 24, paddingRight: 8 },
  brand: { fontFamily: font.extrabold, fontSize: 40, color: colors.primary, letterSpacing: 1 },
  sheet: {
    flex: 1,
    marginTop: -28,
    backgroundColor: colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 28,
  },
  title: { fontFamily: font.bold, fontSize: 26, color: colors.text },
  subtitle: { fontFamily: font.regular, fontSize: 14, color: colors.textMuted, marginTop: 2, marginBottom: 22 },
});
