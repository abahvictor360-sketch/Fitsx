import { useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { PageHeader } from '../../components/PageHeader';
import { ProductGrid } from '../../components/ProductGrid';
import { Screen } from '../../components/Screen';
import { categories, products, type Category } from '../../data/products';
import { font } from '../../theme/fonts';
import { colors } from '../../theme/colors';

type Filter = 'All' | Category;

export default function ShopScreen() {
  const params = useLocalSearchParams<{ category?: string }>();
  // A chip the person tapped wins until a new category arrives via the URL (e.g. "View All" on Home).
  const [picked, setPicked] = useState<{ from?: string; filter: Filter } | null>(null);
  const fromUrl: Filter =
    params.category && (categories as string[]).includes(params.category) ? (params.category as Category) : 'All';
  const filter = picked && picked.from === params.category ? picked.filter : fromUrl;
  const setFilter = (f: Filter) => setPicked({ from: params.category, filter: f });

  const items = useMemo(
    () => (filter === 'All' ? products : products.filter((p) => p.categories.includes(filter))),
    [filter],
  );

  return (
    <Screen>
      <ProductGrid
        items={items}
        header={
          <View>
            <PageHeader title="Shop" subtitle={`${items.length} styles`} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
              {(['All', ...categories] as Filter[]).map((c) => (
                <Pressable key={c} onPress={() => setFilter(c)} style={[styles.chip, c === filter && styles.chipActive]}>
                  <Text style={[styles.chipText, c === filter && { color: colors.white }]}>{c}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  chips: { gap: 8, paddingBottom: 16 },
  chip: { paddingHorizontal: 16, paddingVertical: 9, borderRadius: 20, backgroundColor: colors.card },
  chipActive: { backgroundColor: colors.primary },
  chipText: { fontSize: 13, fontFamily: font.semibold, color: colors.text },
});
