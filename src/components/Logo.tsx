import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import { font } from '../theme/fonts';

/** Brand mark: sneaker badge + "fitsx" wordmark, scaled from `size` (badge diameter). */
export function Logo({ size = 34 }: { size?: number }) {
  return (
    <View style={styles.row} accessibilityRole="header" accessibilityLabel="fitsx">
      <View style={[styles.badge, { width: size, height: size, borderRadius: size / 2 }]}>
        <MaterialCommunityIcons name="shoe-sneaker" size={size * 0.62} color={colors.primaryDark} />
      </View>
      <Text style={[styles.word, { fontSize: size * 0.76 }]}>
        fits<Text style={{ color: colors.accent }}>x</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  badge: { backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  word: { fontFamily: font.extrabold, color: colors.primary, letterSpacing: 0.5, includeFontPadding: false },
});
