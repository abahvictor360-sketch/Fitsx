import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';

import { getProduct } from '../data/products';
import { colors } from '../theme/colors';
import { ShoeImage } from './ShoeImage';

const SLIDES = [
  { id: 'velocity-boost', title: 'Run Better.\nBe Stronger.', body: 'Explore Performance\nShoes', variant: 0, gradient: ['#0F4D3A', '#2E9C6A', '#7FE0B0'] },
  { id: 'cap-toe-oxford', title: 'Dress\nThe Part.', body: 'Handcrafted leather\nformal shoes', variant: 0, gradient: ['#1E3A2B', '#3E7A55', '#A8D8B9'] },
  { id: 'court-480', title: 'New Season.\nNew Kicks.', body: 'Fresh court classics\nin three colorways', variant: 1, gradient: ['#0A3A2B', '#14724D', '#3FD68C'] },
] as const;

export function HeroCarousel({ width }: { width: number }) {
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList>(null);
  const height = 170;

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / width);
    if (i !== index) setIndex(i);
  };

  return (
    <View>
      <FlatList
        ref={listRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        keyExtractor={(s) => s.id}
        renderItem={({ item }) => {
          const product = getProduct(item.id)!;
          return (
            <View style={{ width, height }}>
              <LinearGradient
                colors={item.gradient as unknown as [string, string, string]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.slide}
              >
                <View style={styles.copy}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.body}>{item.body}</Text>
                  <Pressable
                    onPress={() => router.push(`/product/${item.id}`)}
                    style={({ pressed }) => [styles.cta, pressed && { opacity: 0.85 }]}
                  >
                    <Text style={styles.ctaText}>Shop Now</Text>
                  </Pressable>
                </View>
                <View style={styles.art}>
                  <ShoeImage source={product.variants[item.variant].image} width={width * 0.5} height={height - 30} style={styles.tilt} />
                </View>
              </LinearGradient>
            </View>
          );
        }}
      />
      <View style={styles.dots}>
        {SLIDES.map((s, i) => (
          <View key={s.id} style={[styles.dot, i === index && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: { flex: 1, borderRadius: 26, padding: 18, flexDirection: 'row', overflow: 'hidden' },
  copy: { flex: 1, justifyContent: 'center', zIndex: 2 },
  title: { color: colors.white, fontSize: 24, fontWeight: '800', lineHeight: 28 },
  body: { color: '#DDF5E9', fontSize: 12, marginTop: 8, lineHeight: 16 },
  cta: {
    marginTop: 14,
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
  },
  ctaText: { color: colors.primary, fontWeight: '700', fontSize: 13 },
  art: { position: 'absolute', right: 6, top: 10 },
  tilt: { transform: [{ rotate: '-8deg' }] },
  dots: { position: 'absolute', bottom: 10, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', gap: 6 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.5)' },
  dotActive: { backgroundColor: colors.white, width: 16 },
});
