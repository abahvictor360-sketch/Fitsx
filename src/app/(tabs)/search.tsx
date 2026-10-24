import { Feather } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { EmptyState } from '../../components/EmptyState';
import { PageHeader } from '../../components/PageHeader';
import { ProductGrid } from '../../components/ProductGrid';
import { Screen } from '../../components/Screen';
import { products } from '../../data/products';
import { font } from '../../theme/fonts';
import { colors } from '../../theme/colors';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) =>
      [p.name, p.subtitle, ...p.categories, ...p.variants.map((v) => v.name)].some((s) => s.toLowerCase().includes(q)),
    );
  }, [query]);

  return (
    <Screen>
      <ProductGrid
        items={results}
        header={
          <View>
            <PageHeader title="Search" subtitle="Find your next pair" />
            <View style={styles.search}>
              <Feather name="search" size={18} color={colors.textMuted} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search shoes, colors, categories…"
                placeholderTextColor={colors.textMuted}
                style={styles.input}
                autoCorrect={false}
                returnKeyType="search"
              />
              {!!query && <Feather name="x" size={18} color={colors.textMuted} onPress={() => setQuery('')} />}
            </View>
          </View>
        }
        empty={<EmptyState icon="search" title="No matches" body={`We couldn't find anything for "${query}".`} />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  input: { flex: 1, fontFamily: font.regular, fontSize: 15, color: colors.text, height: '100%' },
});
