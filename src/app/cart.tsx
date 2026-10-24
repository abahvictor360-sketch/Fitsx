import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EmptyState } from '../components/EmptyState';
import { IconButton } from '../components/IconButton';
import { Screen } from '../components/Screen';
import { ShoeImage } from '../components/ShoeImage';
import { formatPrice, getProduct } from '../data/products';
import { useShop } from '../store/ShopContext';
import { font } from '../theme/fonts';
import { colors } from '../theme/colors';

const SHIPPING_FREE_OVER = 150;
const SHIPPING_FEE = 9.99;

export default function CartScreen() {
  const insets = useSafeAreaInsets();
  const { cart, subtotal, updateQuantity, removeFromCart, clearCart } = useShop();
  const [ordered, setOrdered] = useState(false);
  const shipping = subtotal === 0 || subtotal >= SHIPPING_FREE_OVER ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  const goBack = () => (router.canGoBack() ? router.back() : router.replace('/'));
  const checkout = () => {
    clearCart();
    setOrdered(true);
  };

  return (
    <Screen>
      <View style={styles.header}>
        <IconButton label="Back" onPress={goBack}>
          <Feather name="chevron-left" size={22} color={colors.text} />
        </IconButton>
        <Text style={styles.title}>My Cart</Text>
        <View style={{ width: 44 }} />
      </View>

      {ordered ? (
        <View style={styles.flexCenter}>
          <EmptyState icon="check-circle" title="Order placed!" body="Thanks for shopping with Fitsx. Your new kicks are on the way." />
          <Pressable style={[styles.checkout, { alignSelf: 'stretch', marginHorizontal: 20 }]} onPress={() => router.replace('/')}>
            <Text style={styles.checkoutText}>Continue Shopping</Text>
          </Pressable>
        </View>
      ) : cart.length === 0 ? (
        <View style={styles.flexCenter}>
          <EmptyState icon="shopping-bag" title="Your cart is empty" body="Find a pair you love and add it to your cart." />
          <Pressable style={[styles.checkout, { alignSelf: 'stretch', marginHorizontal: 20 }]} onPress={() => router.replace('/shop')}>
            <Text style={styles.checkoutText}>Browse Shoes</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <ScrollView contentContainerStyle={[styles.list, { paddingBottom: 260 + insets.bottom }]}>
            {cart.map((item) => {
              const product = getProduct(item.productId)!;
              const variant = product.variants.find((v) => v.id === item.variantId) ?? product.variants[0];
              return (
                <View key={item.key} style={styles.item}>
                  <Pressable style={styles.thumb} onPress={() => router.push(`/product/${product.id}`)}>
                    <ShoeImage source={variant.image} width={80} height={70} />
                  </Pressable>
                  <View style={{ flex: 1 }}>
                    <View style={styles.itemTop}>
                      <Text style={styles.itemName} numberOfLines={1}>
                        {product.name}
                      </Text>
                      <Pressable hitSlop={8} onPress={() => removeFromCart(item.key)} accessibilityLabel="Remove">
                        <Feather name="trash-2" size={16} color={colors.textMuted} />
                      </Pressable>
                    </View>
                    <Text style={styles.itemMeta}>
                      {variant.name} · US {item.size}
                    </Text>
                    <View style={styles.itemBottom}>
                      <Text style={styles.itemPrice}>{formatPrice(product.price * item.quantity)}</Text>
                      <View style={styles.qty}>
                        <Pressable style={styles.qtyBtn} onPress={() => updateQuantity(item.key, -1)} accessibilityLabel="Decrease">
                          <Feather name="minus" size={14} color={colors.primary} />
                        </Pressable>
                        <Text style={styles.qtyText}>{item.quantity}</Text>
                        <Pressable
                          style={[styles.qtyBtn, { backgroundColor: colors.primary }]}
                          onPress={() => updateQuantity(item.key, 1)}
                          accessibilityLabel="Increase"
                        >
                          <Feather name="plus" size={14} color={colors.white} />
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>

          <View style={[styles.summary, { paddingBottom: Math.max(insets.bottom, 16) }]}>
            <View style={styles.sumRow}>
              <Text style={styles.sumLabel}>Subtotal</Text>
              <Text style={styles.sumValue}>{formatPrice(subtotal)}</Text>
            </View>
            <View style={styles.sumRow}>
              <Text style={styles.sumLabel}>Shipping</Text>
              <Text style={styles.sumValue}>{shipping === 0 ? 'Free' : formatPrice(shipping)}</Text>
            </View>
            <View style={[styles.sumRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatPrice(total)}</Text>
            </View>
            <Pressable style={({ pressed }) => [styles.checkout, pressed && { opacity: 0.9 }]} onPress={checkout}>
              <Text style={styles.checkoutText}>Checkout</Text>
              <Feather name="arrow-right" size={18} color={colors.white} />
            </Pressable>
          </View>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 8 },
  title: { fontSize: 18, fontFamily: font.bold, color: colors.text },
  flexCenter: { flex: 1, justifyContent: 'center' },
  list: { padding: 20, gap: 14 },
  item: { flexDirection: 'row', gap: 14, backgroundColor: colors.white, borderRadius: 20, padding: 12 },
  thumb: { width: 96, height: 84, borderRadius: 16, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center' },
  itemTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  itemName: { flex: 1, fontSize: 15, fontFamily: font.bold, color: colors.text },
  itemMeta: { fontFamily: font.regular, fontSize: 12, color: colors.textMuted, marginTop: 3 },
  itemBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  itemPrice: { fontSize: 16, fontFamily: font.bold, color: colors.primary },
  qty: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  qtyBtn: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.mint, alignItems: 'center', justifyContent: 'center' },
  qtyText: { fontSize: 14, fontFamily: font.bold, color: colors.text, minWidth: 14, textAlign: 'center' },
  summary: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 20,
    shadowColor: '#0F4D3A',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -6 },
    elevation: 12,
  },
  sumRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  sumLabel: { fontFamily: font.regular, fontSize: 14, color: colors.textMuted },
  sumValue: { fontSize: 14, fontFamily: font.semibold, color: colors.text },
  totalRow: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 12, marginTop: 4 },
  totalLabel: { fontSize: 16, fontFamily: font.bold, color: colors.text },
  totalValue: { fontSize: 18, fontFamily: font.bold, color: colors.primary },
  checkout: {
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  checkoutText: { color: colors.white, fontSize: 16, fontFamily: font.bold },
});
