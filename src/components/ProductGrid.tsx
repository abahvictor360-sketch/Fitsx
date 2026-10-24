import type { ReactElement } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import type { Product } from '../data/products';
import { useAppWidth } from '../hooks';
import { ProductCard } from './ProductCard';

const PAD = 20;
const GAP = 14;

type Props = { items: Product[]; header?: ReactElement; empty?: ReactElement };

export function ProductGrid({ items, header, empty }: Props) {
  const width = useAppWidth();
  const cardWidth = (width - PAD * 2 - GAP) / 2;
  return (
    <FlatList
      data={items}
      numColumns={2}
      keyExtractor={(p) => p.id}
      columnWrapperStyle={{ gap: GAP }}
      contentContainerStyle={styles.content}
      ListHeaderComponent={header}
      ListEmptyComponent={empty}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <ProductCard product={item} width={cardWidth} />}
    />
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: PAD, paddingBottom: 130, gap: GAP },
});
