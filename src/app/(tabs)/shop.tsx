import { useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
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
  const [filter, setFilter] = useState<Filter>('All');

  useEffect(() => {
    if (params.category && (categories as string[]).includes(params.category)) setFilter(params.category as Category);
  }, [params.category]);

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
