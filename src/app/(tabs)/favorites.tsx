import { EmptyState } from '../../components/EmptyState';
import { PageHeader } from '../../components/PageHeader';
import { ProductGrid } from '../../components/ProductGrid';
import { Screen } from '../../components/Screen';
import { products } from '../../data/products';
import { useShop } from '../../store/ShopContext';

export default function FavoritesScreen() {
  const { favorites } = useShop();
  const items = products.filter((p) => favorites.includes(p.id));

  return (
    <Screen>
      <ProductGrid
        items={items}
        header={<PageHeader title="Favorites" subtitle={`${items.length} saved`} />}
        empty={<EmptyState icon="heart" title="No favorites yet" body="Tap the heart on any shoe to save it here." />}
      />
    </Screen>
  );
}
