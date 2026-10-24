import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

import { CategoryTabs } from '../../components/CategoryTabs';
import { HeroCarousel } from '../../components/HeroCarousel';
import { IconButton } from '../../components/IconButton';
import { ProductCard } from '../../components/ProductCard';
import { Screen } from '../../components/Screen';
import { categories, products, type Category } from '../../data/products';
import { useAppWidth } from '../../hooks';
import { useShop } from '../../store/ShopContext';
import { colors } from '../../theme/colors';

const PAD = 20;

export default function HomeScreen() {
  const width = useAppWidth();
  const { cartCount } = useShop();
  const [category, setCategory] = useState<Category>('Popular');
  const picks = useMemo(() => products.filter((p) => p.categories.includes(category)), [category]);
  const newArrivals = useMemo(() => products.filter((p) => p.categories.includes('New')), []);
  const cardWidth = Math.min(180, (width - PAD * 2) * 0.52);

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <IconButton label="Menu" onPress={() => router.push('/profile')}>
            <Feather name="menu" size={20} color={colors.text} />
          </IconButton>
          <Text style={styles.brand}>
            FITS<Text style={{ color: colors.accent }}>X</Text>
          </Text>
          <IconButton label="Cart" badge={cartCount} onPress={() => router.push('/cart')}>
            <Feather name="shopping-bag" size={20} color={colors.text} />
          </IconButton>
        </View>

        <View style={styles.section}>
          <HeroCarousel width={width - PAD * 2} />
        </View>

        <View style={styles.categories}>
          <CategoryTabs items={categories} value={category} onChange={setCategory} />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Picks</Text>
          <Text style={styles.viewAll} onPress={() => router.push({ pathname: '/shop', params: { category } })}>
            View All
          </Text>
        </View>
        <FlatList
          data={picks}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(p) => p.id}
          contentContainerStyle={styles.hList}
          renderItem={({ item }) => <ProductCard product={item} width={cardWidth} />}
          ListEmptyComponent={<Text style={styles.empty}>No shoes in this category yet.</Text>}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>New Arrivals</Text>
          <Text style={styles.viewAll} onPress={() => router.push({ pathname: '/shop', params: { category: 'New' } })}>
            View All
          </Text>
        </View>
        <FlatList
          data={newArrivals}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(p) => p.id}
          contentContainerStyle={styles.hList}
          renderItem={({ item }) => <ProductCard product={item} width={cardWidth} />}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 8, paddingBottom: 130 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: PAD },
  brand: { fontSize: 20, fontWeight: '900', letterSpacing: 2, color: colors.primary },
  section: { paddingHorizontal: PAD, marginTop: 18 },
  categories: { marginTop: 18 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: PAD,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 19, fontWeight: '800', color: colors.text },
  viewAll: { fontSize: 13, fontWeight: '600', color: colors.primary },
  hList: { paddingHorizontal: PAD, gap: 14 },
  empty: { color: colors.textMuted, paddingVertical: 20 },
});
