import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { PageHeader } from '../../components/PageHeader';
import { Screen } from '../../components/Screen';
import { useShop } from '../../store/ShopContext';
import { colors } from '../../theme/colors';

type Row = { icon: keyof typeof Feather.glyphMap; label: string; detail?: string; onPress?: () => void };

export default function ProfileScreen() {
  const { cartCount, favorites } = useShop();
  const rows: Row[] = [
    { icon: 'shopping-bag', label: 'My Cart', detail: `${cartCount} items`, onPress: () => router.push('/cart') },
    { icon: 'heart', label: 'Favorites', detail: `${favorites.length} saved`, onPress: () => router.push('/favorites') },
    { icon: 'package', label: 'Orders', detail: 'No orders yet' },
    { icon: 'map-pin', label: 'Shipping Address' },
    { icon: 'credit-card', label: 'Payment Methods' },
    { icon: 'bell', label: 'Notifications' },
    { icon: 'help-circle', label: 'Help & Support' },
  ];

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <PageHeader title="Profile" />
        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>FX</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>Fitsx Runner</Text>
            <Text style={styles.email}>Member since 2026</Text>
          </View>
          <View style={styles.pill}>
            <Feather name="award" size={14} color={colors.primaryDark} />
            <Text style={styles.pillText}>Gold</Text>
          </View>
        </View>

        <View style={styles.list}>
          {rows.map((r, i) => (
            <Pressable
              key={r.label}
              onPress={r.onPress}
              style={({ pressed }) => [styles.row, i < rows.length - 1 && styles.divider, pressed && { opacity: 0.6 }]}
            >
              <View style={styles.rowIcon}>
                <Feather name={r.icon} size={18} color={colors.primary} />
              </View>
              <Text style={styles.rowLabel}>{r.label}</Text>
              {r.detail && <Text style={styles.rowDetail}>{r.detail}</Text>}
              <Feather name="chevron-right" size={18} color={colors.textMuted} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingBottom: 130 },
  card: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: colors.primary, borderRadius: 24, padding: 18 },
  avatar: { width: 54, height: 54, borderRadius: 27, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontWeight: '900', fontSize: 18, color: colors.primaryDark },
  name: { color: colors.white, fontSize: 17, fontWeight: '800' },
  email: { color: '#BFE6D2', fontSize: 12, marginTop: 2 },
  pill: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.accentSoft, borderRadius: 14, paddingHorizontal: 10, paddingVertical: 5 },
  pillText: { fontSize: 12, fontWeight: '700', color: colors.primaryDark },
  list: { backgroundColor: colors.white, borderRadius: 22, marginTop: 18, paddingHorizontal: 16 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 16 },
  divider: { borderBottomWidth: 1, borderBottomColor: colors.border },
  rowIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: colors.mint, alignItems: 'center', justifyContent: 'center' },
  rowLabel: { flex: 1, fontSize: 15, fontWeight: '600', color: colors.text },
  rowDetail: { fontSize: 12, color: colors.textMuted },
});
