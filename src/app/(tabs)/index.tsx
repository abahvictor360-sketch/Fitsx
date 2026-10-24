import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

import { CategoryTabs } from '../../components/CategoryTabs';
import { HeroCarousel } from '../../components/HeroCarousel';
import { IconButton } from '../../components/IconButton';
import { ProductCard } from '../../components/ProductCard';
import { Screen } from '../../components/Screen';
import { homeCategories, products, type Category } from '../../data/products';
import { useAppWidth } from '../../hooks';
import { useShop } from '../../store/ShopContext';
import { colors } from '../../theme/colors';
import { font } from '../../theme/fonts';

const PAD = 20;
const GAP = 14;

export default function HomeScreen() {
  const width = useAppWidth();
  const { cartCount } = useShop();
  const [category, setCategory] = useState<Category>('Popular');
  const picks = useMemo(() => products.filter((p) => p.categories.includes(category)), [category]);
  const newArrivals = useMemo(() => products.filter((p) => p.categories.includes('New')), []);
  const cardWidth = Math.round(width * 0.5);

  const renderRow = (items: typeof products) => (
    <FlatList
      data={items}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(p) => p.id}
      snapToInterval={cardWidth + GAP}
      decelerationRate="fast"
      contentContainerStyle={styles.hList}
      renderItem={({ item }) => <ProductCard product={item} width={cardWidth} />}
      ListEmptyComponent={<Text style={styles.empty}>No shoes in this category yet.</Text>}
    />
  );

  return (
    <Screen>
      <LinearGradient colors={['#E6F6EE', colors.background]} style={StyleSheet.absoluteFill} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <IconButton label="Menu" onPress={() => router.push('/profile')}>
            <Feather name="menu" size={20} color={colors.text} />
          </IconButton>
          {cartCount > 0 && (
            <IconButton label="Cart" badge={cartCount} onPress={() => router.push('/cart')}>
              <Feather name="shopping-bag" size={19} color={colors.text} />
            </IconButton>
          )}
        </View>

        <View style={styles.section}>
          <HeroCarousel width={width - PAD * 2} />
        </View>

        <View style={styles.section}>
          <CategoryTabs items={homeCategories} value={category} onChange={setCategory} />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Picks</Text>
          <Text style={styles.viewAll} onPress={() => router.push({ pathname: '/shop', params: { category } })}>
            View All
          </Text>
        </View>
        {renderRow(picks)}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>New Arrivals</Text>
          <Text style={styles.viewAll} onPress={() => router.push({ pathname: '/shop', params: { category: 'New' } })}>
            View All
          </Text>
        </View>
        {renderRow(newArrivals)}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 8, paddingBottom: 140 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: PAD, minHeight: 44 },
  section: { paddingHorizontal: PAD, marginTop: 18 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: PAD,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: { fontFamily: font.semibold, fontSize: 18, color: colors.text },
  viewAll: { fontFamily: font.medium, fontSize: 13, color: colors.text },
  hList: { paddingHorizontal: PAD, gap: GAP },
  empty: { fontFamily: font.regular, color: colors.textMuted, paddingVertical: 20 },
});
