import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { formatPrice, type Product } from '../data/products';
import { useShop } from '../store/ShopContext';
import { colors } from '../theme/colors';
import { font } from '../theme/fonts';
import { ShoeImage } from './ShoeImage';

type Props = { product: Product; width: number };

export function ProductCard({ product, width }: Props) {
  const { isFavorite, toggleFavorite, addToCart } = useShop();
  const fav = isFavorite(product.id);
  const variant = product.variants[0];
  const artW = width - 20;

  return (
    <Pressable
      onPress={() => router.push(`/product/${product.id}`)}
      style={({ pressed }) => [{ width }, pressed && { transform: [{ scale: 0.98 }] }]}
    >
      <LinearGradient colors={['#D3F1E1', '#EEF9F3', '#F8FCFA']} start={{ x: 0, y: 0 }} end={{ x: 0.4, y: 1 }} style={styles.card}>
        <Pressable
          accessibilityLabel={fav ? 'Remove from favorites' : 'Add to favorites'}
          hitSlop={10}
          onPress={() => toggleFavorite(product.id)}
          style={styles.heart}
        >
          <Feather name="heart" size={19} color={fav ? colors.danger : colors.text} />
        </Pressable>
        <View style={styles.art}>
          <ShoeImage source={variant.image} width={artW} height={artW * 0.72} style={styles.tilt} />
        </View>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {product.subtitle}
        </Text>
        <View style={styles.row}>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          <Pressable
            accessibilityLabel={`Add ${product.name} to cart`}
            onPress={() => addToCart(product.id, variant.id, product.sizes[Math.floor(product.sizes.length / 2)])}
            style={({ pressed }) => [styles.add, pressed && { opacity: 0.8 }]}
          >
            <Feather name="plus" size={20} color={colors.white} />
          </Pressable>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 26, padding: 14, paddingTop: 12, overflow: 'hidden' },
  heart: { position: 'absolute', top: 14, left: 14, zIndex: 2 },
  art: { alignItems: 'center', marginTop: 14, marginBottom: 6, marginHorizontal: -4 },
  tilt: { transform: [{ rotate: '-6deg' }] },
  name: { fontFamily: font.semibold, fontSize: 15, color: colors.text },
  subtitle: { fontFamily: font.regular, fontSize: 11.5, color: colors.textMuted, marginTop: 1 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 },
  price: { fontFamily: font.bold, fontSize: 17, color: colors.primary },
  add: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
