import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { PageHeader } from '../../components/PageHeader';
import { Screen } from '../../components/Screen';
import { useAuth } from '../../store/AuthContext';
import { useShop } from '../../store/ShopContext';
import { font } from '../../theme/fonts';
import { colors } from '../../theme/colors';

type Row = { icon: keyof typeof Feather.glyphMap; label: string; detail?: string; onPress?: () => void };

export default function ProfileScreen() {
  const { cartCount, favorites } = useShop();
  const { user, signOut } = useAuth();
  const initials = (user?.name ?? 'Guest')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
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
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.name} numberOfLines={1}>
              {user ? user.name : 'Welcome, guest'}
            </Text>
            <Text style={styles.email} numberOfLines={1}>
              {user ? user.email : 'Sign in to check out and track orders'}
            </Text>
          </View>
          {user && (
            <View style={styles.pill}>
              <Feather name="award" size={14} color={colors.primaryDark} />
              <Text style={styles.pillText}>Member</Text>
            </View>
          )}
        </View>

        {!user && (
          <View style={styles.authRow}>
            <Pressable style={[styles.authBtn, styles.authPrimary]} onPress={() => router.push({ pathname: '/login', params: { redirect: '/profile' } })}>
              <Text style={[styles.authText, { color: colors.white }]}>Sign In</Text>
            </Pressable>
            <Pressable style={styles.authBtn} onPress={() => router.push({ pathname: '/signup', params: { redirect: '/profile' } })}>
              <Text style={styles.authText}>Create Account</Text>
            </Pressable>
          </View>
        )}

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

        {user && (
          <Pressable
            onPress={() => {
              signOut();
              router.replace('/login');
            }}
            style={({ pressed }) => [styles.signOut, pressed && { opacity: 0.7 }]}
          >
            <Feather name="log-out" size={18} color={colors.danger} />
            <Text style={styles.signOutText}>Sign Out</Text>
          </Pressable>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingBottom: 130 },
  card: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: colors.primary, borderRadius: 24, padding: 18 },
  avatar: { width: 54, height: 54, borderRadius: 27, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: font.extrabold, fontSize: 18, color: colors.primaryDark },
  name: { color: colors.white, fontSize: 17, fontFamily: font.bold },
  email: { color: '#BFE6D2', fontFamily: font.regular, fontSize: 12, marginTop: 2 },
  pill: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.accentSoft, borderRadius: 14, paddingHorizontal: 10, paddingVertical: 5 },
  pillText: { fontSize: 12, fontFamily: font.bold, color: colors.primaryDark },
  list: { backgroundColor: colors.white, borderRadius: 22, marginTop: 18, paddingHorizontal: 16 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 16 },
  divider: { borderBottomWidth: 1, borderBottomColor: colors.border },
  rowIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: colors.mint, alignItems: 'center', justifyContent: 'center' },
  rowLabel: { flex: 1, fontSize: 15, fontFamily: font.semibold, color: colors.text },
  authRow: { flexDirection: 'row', gap: 12, marginTop: 14 },
  authBtn: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  authPrimary: { backgroundColor: colors.primary, borderColor: colors.primary },
  authText: { fontFamily: font.semibold, fontSize: 14, color: colors.primary },
  signOut: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 54,
    borderRadius: 18,
    backgroundColor: '#FDECEC',
    marginTop: 18,
  },
  signOutText: { fontFamily: font.semibold, fontSize: 15, color: colors.danger },
  rowDetail: { fontFamily: font.regular, fontSize: 12, color: colors.textMuted },
});
