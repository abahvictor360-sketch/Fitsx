import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import type { Category } from '../data/products';
import { colors } from '../theme/colors';

type IconDef = { set: 'feather' | 'mci'; name: string };

const ICONS: Record<Category, IconDef> = {
  Popular: { set: 'feather', name: 'zap' },
  Men: { set: 'feather', name: 'user' },
  Women: { set: 'mci', name: 'account-outline' },
  Formal: { set: 'mci', name: 'shoe-formal' },
  Boots: { set: 'mci', name: 'hiking' },
  New: { set: 'mci', name: 'decagram-outline' },
};

type Props = { items: Category[]; value: Category; onChange: (c: Category) => void };

export function CategoryTabs({ items, value, onChange }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {items.map((c) => {
        const active = c === value;
        const tint = active ? colors.white : colors.text;
        const icon = ICONS[c];
        return (
          <Pressable key={c} onPress={() => onChange(c)} style={[styles.item, active && styles.active]}>
            {icon.set === 'feather' ? (
              <Feather name={icon.name as keyof typeof Feather.glyphMap} size={22} color={tint} />
            ) : (
              <MaterialCommunityIcons name={icon.name as keyof typeof MaterialCommunityIcons.glyphMap} size={24} color={tint} />
            )}
            <Text style={[styles.label, { color: tint }]}>{c}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { gap: 6, paddingHorizontal: 20 },
  item: { width: 62, height: 66, borderRadius: 16, alignItems: 'center', justifyContent: 'center', gap: 6 },
  active: { backgroundColor: colors.primary },
  label: { fontSize: 11, fontWeight: '600' },
});
