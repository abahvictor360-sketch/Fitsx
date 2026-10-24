import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { font } from '../theme/fonts';
import { colors } from '../theme/colors';

type Props = { icon: keyof typeof Feather.glyphMap; title: string; body: string };

export function EmptyState({ icon, title, body }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.icon}>
        <Feather name={icon} size={28} color={colors.primary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', paddingVertical: 60, paddingHorizontal: 30 },
  icon: { width: 72, height: 72, borderRadius: 36, backgroundColor: colors.mint, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 18, fontFamily: font.bold, color: colors.text, marginTop: 16 },
  body: { fontFamily: font.regular, fontSize: 13, color: colors.textMuted, marginTop: 6, textAlign: 'center', lineHeight: 19 },
});
