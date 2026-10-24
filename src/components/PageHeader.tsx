import { StyleSheet, Text, View } from 'react-native';

import { font } from '../theme/fonts';
import { colors } from '../theme/colors';

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingTop: 12, paddingBottom: 16 },
  title: { fontSize: 26, fontFamily: font.bold, color: colors.text },
  subtitle: { fontFamily: font.regular, fontSize: 13, color: colors.textMuted, marginTop: 4 },
});
