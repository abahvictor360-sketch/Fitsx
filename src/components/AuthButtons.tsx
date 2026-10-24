import { FontAwesome } from '@expo/vector-icons';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import { font } from '../theme/fonts';

export function PrimaryButton({ label, onPress, loading }: { label: string; onPress: () => void; loading?: boolean }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      accessibilityRole="button"
      style={({ pressed }) => [styles.primary, (pressed || loading) && { opacity: 0.85 }]}
    >
      {loading ? <ActivityIndicator color={colors.white} /> : <Text style={styles.primaryText}>{label}</Text>}
    </Pressable>
  );
}

export function SocialButtons({ onPress, disabled }: { onPress: (p: 'google' | 'apple') => void; disabled?: boolean }) {
  return (
    <>
      <View style={styles.dividerRow}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>or continue with</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.socialRow}>
        <Pressable disabled={disabled} onPress={() => onPress('google')} style={({ pressed }) => [styles.social, pressed && { opacity: 0.7 }]}>
          <FontAwesome name="google" size={19} color="#DB4437" />
          <Text style={styles.socialText}>Google</Text>
        </Pressable>
        <Pressable disabled={disabled} onPress={() => onPress('apple')} style={({ pressed }) => [styles.social, pressed && { opacity: 0.7 }]}>
          <FontAwesome name="apple" size={21} color={colors.text} />
          <Text style={styles.socialText}>Apple</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  primary: {
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: colors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  primaryText: { fontFamily: font.semibold, fontSize: 16, color: colors.white },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 22 },
  line: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: { fontFamily: font.regular, fontSize: 12, color: colors.textMuted },
  socialRow: { flexDirection: 'row', gap: 12 },
  social: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: colors.white,
  },
  socialText: { fontFamily: font.medium, fontSize: 14, color: colors.text },
});
