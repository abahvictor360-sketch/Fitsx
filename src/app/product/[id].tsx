import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Platform, Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconButton } from '../../components/IconButton';
import { Screen } from '../../components/Screen';
import { ShoeImage } from '../../components/ShoeImage';
import { formatPrice, getProduct } from '../../data/products';
import { useAppWidth } from '../../hooks';
import { useShop } from '../../store/ShopContext';
import { colors } from '../../theme/colors';
import { font } from '../../theme/fonts';

const PAD = 20;
const SIZE_GAP = 8;

function DotGrid() {
  return (
    <View style={styles.dotGrid} pointerEvents="none">
      {Array.from({ length: 63 }).map((_, i) => (
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
  const [needSize, setNeedSize] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toast] = useState(() => new Animated.Value(0));
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

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
  const sizeWidth = (width - PAD * 2 - SIZE_GAP * (product.sizes.length - 1)) / product.sizes.length;

  const goBack = () => (router.canGoBack() ? router.back() : router.replace('/'));
  const share = async () => {
    const message = `Check out the ${product.name} on fitsx — ${formatPrice(product.price)}`;
    if (Platform.OS === 'web') {
      const nav = globalThis.navigator as Navigator | undefined;
      if (nav?.share) await nav.share({ title: product.name, text: message }).catch(() => {});
      return;
    }
    await Share.share({ message });
  };
  const onAdd = () => {
    if (size == null) {
      setNeedSize(true);
      return;
    }
    addToCart(product.id, variant.id, size);
    clearTimeout(toastTimer.current);
    setToastVisible(true);
    Animated.spring(toast, { toValue: 1, useNativeDriver: Platform.OS !== 'web' }).start();
    toastTimer.current = setTimeout(
      () =>
        Animated.timing(toast, { toValue: 0, duration: 200, useNativeDriver: Platform.OS !== 'web' }).start(() =>
          setToastVisible(false),
        ),
      2600,
    );
  };

  return (
    <Screen style={{ backgroundColor: colors.white }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 110 + insets.bottom }} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#DDF3E7', '#E9F7F0', '#D9F1E4']} style={styles.hero}>
          <DotGrid />
          <View style={styles.header}>
            <IconButton label="Back" onPress={goBack}>
              <Feather name="chevron-left" size={22} color={colors.text} />
            </IconButton>
            <IconButton label="Share" onPress={share}>
              <Feather name="share" size={18} color={colors.text} />
            </IconButton>
          </View>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.subtitle}>{product.subtitle}</Text>
          </View>
          <View style={styles.heroArt}>
            <ShoeImage source={variant.image} width={width * 0.7} height={width * 0.52} style={styles.tilt} />
          </View>
          <View style={styles.priceTab}>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
          </View>
        </LinearGradient>

        <View style={styles.body}>
          <View style={styles.rowBetween}>
            <Text style={styles.h3}>Description</Text>
            <View style={styles.rating}>
              {Array.from({ length: 5 }).map((_, i) => (
                <MaterialCommunityIcons key={i} name="star" size={17} color={i < fullStars ? colors.star : colors.border} />
              ))}
              <Text style={styles.reviews}>({product.reviews})</Text>
            </View>
          </View>
          <Text style={styles.desc}>{product.description}</Text>

          <Text style={[styles.h3, styles.mt]}>Select Color</Text>
          <View style={styles.colors}>
            {product.variants.map((v, i) => (
              <Pressable
                key={v.id}
                accessibilityLabel={v.name}
                onPress={() => setVariantIdx(i)}
                style={[styles.swatch, i === variantIdx && styles.swatchActive]}
              >
                <ShoeImage source={v.image} width={54} height={40} />
              </Pressable>
            ))}
          </View>

          <View style={[styles.rowBetween, styles.mt]}>
            <Text style={styles.h3}>Select Size</Text>
            {needSize && size == null && <Text style={styles.warn}>Please pick a size</Text>}
          </View>
          <View style={styles.sizes}>
            {product.sizes.map((s) => {
              const active = s === size;
              return (
                <Pressable
                  key={s}
                  onPress={() => setSize(s)}
                  style={[styles.size, { width: sizeWidth }, active && styles.sizeActive]}
                >
                  <Text style={[styles.sizeText, active && { color: colors.white }]}>{s}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <Animated.View
        pointerEvents={toastVisible ? 'box-none' : 'none'}
        style={[
          styles.toastWrap,
          {
            bottom: 96 + Math.max(insets.bottom, 16),
            opacity: toast,
            transform: [{ translateY: toast.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
          },
        ]}
      >
        <View style={styles.toast}>
          <Feather name="check-circle" size={18} color={colors.accent} />
          <Text style={styles.toastText}>Added to cart ({cartCount})</Text>
          <Text style={styles.toastLink} onPress={() => router.push('/cart')}>
            View Cart
          </Text>
        </View>
      </Animated.View>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <Pressable
          accessibilityLabel={fav ? 'Remove from favorites' : 'Add to favorites'}
          onPress={() => toggleFavorite(product.id)}
          style={styles.favBtn}
        >
          <Feather name="heart" size={22} color={fav ? colors.danger : colors.text} />
        </Pressable>
        <Pressable onPress={onAdd} style={({ pressed }) => [styles.cartBtn, pressed && { opacity: 0.9 }]}>
          <Feather name="shopping-cart" size={20} color={colors.white} />
          <Text style={styles.cartText}>Add to Cart</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center', gap: 12 },
  link: { color: colors.primary, fontFamily: font.bold },
  hero: { paddingBottom: 34, overflow: 'hidden' },
  dotGrid: { position: 'absolute', right: 14, top: 110, width: 130, flexDirection: 'row', flexWrap: 'wrap', gap: 12, opacity: 0.55 },
  gridDot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: '#8ED3AF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: PAD, paddingTop: 8 },
  titleBlock: { paddingHorizontal: PAD, marginTop: 20 },
  title: { fontFamily: font.bold, fontSize: 28, lineHeight: 36, color: colors.text },
  subtitle: { fontFamily: font.regular, fontSize: 14, color: colors.textMuted },
  heroArt: { alignItems: 'flex-end', marginTop: -2, marginRight: 6 },
  tilt: { transform: [{ rotate: '-10deg' }] },
  priceTab: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    backgroundColor: colors.white,
    paddingTop: 16,
    paddingBottom: 14,
    paddingLeft: PAD,
    paddingRight: 34,
    borderTopRightRadius: 26,
  },
  priceLabel: { fontFamily: font.regular, fontSize: 12, color: colors.textMuted },
  price: { fontFamily: font.bold, fontSize: 22, color: colors.primary },
  body: {
    paddingHorizontal: PAD,
    paddingTop: 18,
    backgroundColor: colors.white,
  },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  h3: { fontFamily: font.semibold, fontSize: 15, color: colors.text },
  mt: { marginTop: 20 },
  warn: { fontFamily: font.medium, fontSize: 12, color: colors.danger },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 1 },
  reviews: { fontFamily: font.regular, fontSize: 12, color: colors.textMuted, marginLeft: 6 },
  desc: { fontFamily: font.regular, fontSize: 13, lineHeight: 21, color: colors.textMuted, marginTop: 6 },
  colors: { flexDirection: 'row', gap: 12, marginTop: 10 },
  swatch: {
    width: 70,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#EEF6F2',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  swatchActive: { borderColor: colors.primary, backgroundColor: colors.white },
  sizes: { flexDirection: 'row', gap: SIZE_GAP, marginTop: 10 },
  size: {
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  sizeText: { fontFamily: font.medium, fontSize: 13, color: colors.text },
  toastWrap: { position: 'absolute', left: PAD, right: PAD },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.primaryDark,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  toastText: { flex: 1, fontFamily: font.medium, fontSize: 13, color: colors.white },
  toastLink: { fontFamily: font.semibold, fontSize: 13, color: colors.accent },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: PAD,
    paddingTop: 12,
    backgroundColor: colors.white,
  },
  favBtn: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F4D3A',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
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
  cartText: { color: colors.white, fontFamily: font.semibold, fontSize: 16 },
});
