import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import { getProduct, type Product } from '../data/products';

export type CartItem = {
  key: string;
  productId: string;
  variantId: string;
  size: number;
  quantity: number;
};

type ShopState = {
  cart: CartItem[];
  favorites: string[];
  cartCount: number;
  subtotal: number;
  addToCart: (productId: string, variantId: string, size: number) => void;
  updateQuantity: (key: string, delta: number) => void;
  removeFromCart: (key: string) => void;
  clearCart: () => void;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
};

const ShopContext = createContext<ShopState | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const value = useMemo<ShopState>(() => {
    const priceOf = (item: CartItem) => (getProduct(item.productId) as Product).price;
    return {
      cart,
      favorites,
      cartCount: cart.reduce((n, i) => n + i.quantity, 0),
      subtotal: cart.reduce((n, i) => n + priceOf(i) * i.quantity, 0),
      addToCart: (productId, variantId, size) => {
        const key = `${productId}:${variantId}:${size}`;
        setCart((prev) => {
          const existing = prev.find((i) => i.key === key);
          if (existing) {
            return prev.map((i) => (i.key === key ? { ...i, quantity: i.quantity + 1 } : i));
          }
          return [...prev, { key, productId, variantId, size, quantity: 1 }];
        });
      },
      updateQuantity: (key, delta) =>
        setCart((prev) =>
          prev
            .map((i) => (i.key === key ? { ...i, quantity: i.quantity + delta } : i))
            .filter((i) => i.quantity > 0),
        ),
      removeFromCart: (key) => setCart((prev) => prev.filter((i) => i.key !== key)),
      clearCart: () => setCart([]),
      toggleFavorite: (productId) =>
        setFavorites((prev) =>
          prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
        ),
      isFavorite: (productId) => favorites.includes(productId),
    };
  }, [cart, favorites]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used inside ShopProvider');
  return ctx;
}
