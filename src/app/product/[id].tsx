import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconButton } from '../../components/IconButton';
import { Screen } from '../../components/Screen';
import { ShoeImage } from '../../components/ShoeImage';
import { formatPrice, getProduct } from '../../data/products';
import { useAppWidth } from '../../hooks';
import { useShop } from '../../store/ShopContext';
import { colors } from '../../theme/colors';

const PAD = 20;

function DotGrid() {
  return (
    <View style={styles.dotGrid} pointerEvents="none">
      {Array.from({ length: 48 }).map((_, i) => (
        <View key={i} style={styles.gridDot} />
      ))}
    </View>
  );
}

export default function ProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = getProduct(id);
  const width = useAppWidth();
  const insets = useSafeAreaInsets();
  const { addToCart, toggleFavorite, isFavorite, cartCount } = useShop();
  const [variantIdx, setVariantIdx] = useState(0);
  const [size, setSize] = useState<number | null>(null);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <Screen style={styles.center}>
        <Text style={styles.title}>Shoe not found</Text>
        <Text style={styles.link} onPress={() => router.replace('/')}>
          Back to home
        </Text>
      </Screen>
    );
  }

  const variant = product.variants[variantIdx];
  const fav = isFavorite(product.id);
  const fullStars = Math.round(product.rating);

  const goBack = () => (router.canGoBack() ? router.back() : router.replace('/'));
  const share = async () => {
    const message = `Check out the ${product.name} on Fitsx — ${formatPrice(product.price)}`;
    if (Platform.OS === 'web') {
      const nav = globalThis.navigator as Navigator | undefined;
      if (nav?.share) await nav.share({ title: product.name, text: message }).catch(() => {});
      return;
    }
    await Share.share({ message });
  };
  const onAdd = () => {
    if (size == null) return;
    addToCart(product.id, variant.id, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 + insets.bottom }} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <DotGrid />
          <View style={styles.header}>
            <IconButton label="Back" onPress={goBack}>
              <Feather name="chevron-left" size={22} color={colors.text} />
            </IconButton>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <IconButton label="Cart" badge={cartCount} onPress={() => router.push('/cart')}>
                <Feather name="shopping-bag" size={18} color={colors.text} />
              </IconButton>
              <IconButton label="Share" onPress={share}>
                <Feather name="share" size={18} color={colors.text} />
              </IconButton>
            </View>
          </View>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.subtitle}>{product.subtitle}</Text>
          </View>
          <View style={styles.heroArt}>
            <ShoeImage source={variant.image} width={width * 0.72} height={width * 0.6} />
          </View>
          <View style={styles.priceTag}>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.rowBetween}>
            <Text style={styles.h3}>Description</Text>
            <View style={styles.rating}>
              {Array.from({ length: 5 }).map((_, i) => (
                <MaterialCommunityIcons key={i} name="star" size={16} color={i < fullStars ? colors.star : colors.border} />
              ))}
              <Text style={styles.reviews}>({product.reviews})</Text>
            </View>
          </View>
          <Text style={styles.desc}>{product.description}</Text>

          <Text style={[styles.h3, styles.mt]}>
            Select Color <Text style={styles.muted}>· {variant.name}</Text>
          </Text>
          <View style={styles.colors}>
            {product.variants.map((v, i) => (
              <Pressable
                key={v.id}
                accessibilityLabel={v.name}
                onPress={() => setVariantIdx(i)}
                style={[styles.swatch, i === variantIdx && styles.swatchActive]}
              >
                <ShoeImage source={v.image} width={56} height={44} />
              </Pressable>
            ))}
          </View>

          <Text style={[styles.h3, styles.mt]}>Select Size (US)</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sizes}>
            {product.sizes.map((s) => {
              const active = s === size;
              return (
                <Pressable key={s} onPress={() => setSize(s)} style={[styles.size, active && styles.sizeActive]}>
                  <Text style={[styles.sizeText, active && { color: colors.white }]}>{s}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <Pressable
          accessibilityLabel={fav ? 'Remove from favorites' : 'Add to favorites'}
          onPress={() => toggleFavorite(product.id)}
          style={styles.favBtn}
        >
          <Feather name="heart" size={22} color={fav ? colors.danger : colors.text} />
        </Pressable>
        <Pressable
          onPress={onAdd}
          disabled={size == null}
          style={({ pressed }) => [styles.cartBtn, size == null && { opacity: 0.55 }, added && { backgroundColor: '#2E8B62' }, pressed && { opacity: 0.9 }]}
        >
          <Feather name={added ? 'check' : 'shopping-cart'} size={20} color={colors.white} />
          <Text style={styles.cartText}>{added ? 'Added to Cart' : size == null ? 'Select a Size' : 'Add to Cart'}</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center', gap: 12 },
  link: { color: colors.primary, fontWeight: '700' },
  hero: { backgroundColor: colors.mint, paddingBottom: 24, borderBottomLeftRadius: 32, borderBottomRightRadius: 32, overflow: 'hidden' },
  dotGrid: { position: 'absolute', right: 10, top: 70, width: 150, flexDirection: 'row', flexWrap: 'wrap', gap: 14, opacity: 0.5 },
  gridDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#9FD9BC' },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: PAD, paddingTop: 8 },
  titleBlock: { paddingHorizontal: PAD, marginTop: 18 },
  title: { fontSize: 28, fontWeight: '800', color: colors.text },
  subtitle: { fontSize: 14, color: colors.textMuted, marginTop: 4 },
  heroArt: { alignItems: 'flex-end', marginTop: 4, marginRight: 14, marginBottom: 30 },
  priceTag: {
    position: 'absolute',
    left: 0,
    bottom: 24,
    backgroundColor: colors.white,
    paddingVertical: 14,
    paddingLeft: PAD,
    paddingRight: 26,
    borderTopRightRadius: 22,
    borderBottomRightRadius: 22,
  },
  priceLabel: { fontSize: 12, color: colors.textMuted },
  price: { fontSize: 22, fontWeight: '800', color: colors.primary, marginTop: 2 },
  body: { paddingHorizontal: PAD, paddingTop: 20 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  h3: { fontSize: 15, fontWeight: '700', color: colors.text },
  muted: { fontWeight: '500', color: colors.textMuted },
  mt: { marginTop: 20 },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  reviews: { fontSize: 12, color: colors.textMuted, marginLeft: 4 },
  desc: { fontSize: 13, lineHeight: 20, color: colors.textMuted, marginTop: 8 },
  colors: { flexDirection: 'row', gap: 10, marginTop: 10 },
  swatch: {
    width: 70,
    height: 54,
    borderRadius: 14,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  swatchActive: { borderColor: colors.primary, backgroundColor: colors.white },
  sizes: { gap: 8, marginTop: 10, paddingRight: PAD },
  size: {
    minWidth: 46,
    height: 42,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  sizeText: { fontSize: 14, fontWeight: '600', color: colors.text },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: PAD,
    paddingTop: 12,
    backgroundColor: colors.background,
  },
  favBtn: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBtn: {
    flex: 1,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  cartText: { color: colors.white, fontSize: 16, fontWeight: '700' },
});
