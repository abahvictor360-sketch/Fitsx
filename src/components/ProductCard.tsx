import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { formatPrice, type Product } from '../data/products';
import { useShop } from '../store/ShopContext';
import { colors } from '../theme/colors';
import { ShoeImage } from './ShoeImage';

type Props = { product: Product; width: number };

export function ProductCard({ product, width }: Props) {
  const { isFavorite, toggleFavorite, addToCart } = useShop();
  const fav = isFavorite(product.id);
  const variant = product.variants[0];

  return (
    <Pressable
      onPress={() => router.push(`/product/${product.id}`)}
      style={({ pressed }) => [styles.card, { width }, pressed && { transform: [{ scale: 0.98 }] }]}
    >
      <Pressable
        accessibilityLabel={fav ? 'Remove from favorites' : 'Add to favorites'}
        hitSlop={10}
        onPress={() => toggleFavorite(product.id)}
        style={styles.heart}
      >
        <Feather name="heart" size={18} color={fav ? colors.danger : colors.primary} />
      </Pressable>
      <View style={styles.art}>
        <ShoeImage source={variant.image} width={width - 28} height={(width - 28) * 0.78} />
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
          <Feather name="plus" size={18} color={colors.white} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 14,
    overflow: 'hidden',
  },
  heart: { position: 'absolute', top: 14, left: 14, zIndex: 2 },
  art: { alignItems: 'center', marginTop: 20, marginBottom: 8 },
  name: { fontSize: 16, fontWeight: '700', color: colors.text },
  subtitle: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 },
  price: { fontSize: 17, fontWeight: '800', color: colors.primary },
  add: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
