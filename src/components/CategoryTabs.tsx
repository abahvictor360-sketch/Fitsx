import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Category } from '../data/products';
import { colors } from '../theme/colors';
import { font } from '../theme/fonts';

type IconDef = { set: 'feather' | 'mci'; name: string };

const ICONS: Record<Category, IconDef> = {
  Popular: { set: 'feather', name: 'zap' },
  Men: { set: 'feather', name: 'user' },
  Women: { set: 'mci', name: 'account-outline' },
  Trail: { set: 'mci', name: 'image-filter-hdr-outline' },
  Formal: { set: 'mci', name: 'shoe-formal' },
  New: { set: 'mci', name: 'decagram-outline' },
};

type Props = { items: Category[]; value: Category; onChange: (c: Category) => void };

export function CategoryTabs({ items, value, onChange }: Props) {
  return (
    <View style={styles.row}>
      {items.map((c) => {
        const active = c === value;
        const tint = active ? colors.white : colors.text;
        const icon = ICONS[c];
        return (
          <Pressable key={c} onPress={() => onChange(c)} style={[styles.item, active && styles.active]}>
            {icon.set === 'feather' ? (
              <Feather name={icon.name as keyof typeof Feather.glyphMap} size={22} color={tint} />
            ) : (
              <MaterialCommunityIcons name={icon.name as keyof typeof MaterialCommunityIcons.glyphMap} size={25} color={tint} />
            )}
            <Text style={[styles.label, { color: tint }]}>{c}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 4 },
  item: { flex: 1, maxWidth: 70, aspectRatio: 0.95, borderRadius: 18, alignItems: 'center', justifyContent: 'center', gap: 6 },
  active: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  label: { fontFamily: font.medium, fontSize: 11 },
});
