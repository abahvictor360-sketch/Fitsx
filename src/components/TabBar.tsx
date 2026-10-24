import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../theme/colors';

const ICONS: Record<string, keyof typeof Feather.glyphMap> = {
  index: 'home',
  search: 'search',
  favorites: 'heart',
  profile: 'user',
};

export function TabBar({ state, emitter, navigateToTab }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const onPress = () => {
            const event = emitter.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!focused && !event.defaultPrevented) navigateToTab(route.key);
          };

          if (route.name === 'shop') {
            return (
              <Pressable key={route.key} onPress={onPress} accessibilityLabel="Shop all shoes" style={styles.centerSlot}>
                <View style={[styles.centerBtn, focused && { backgroundColor: colors.accent }]}>
                  <MaterialCommunityIcons name="shoe-sneaker" size={30} color={focused ? colors.primaryDark : colors.white} />
                </View>
              </Pressable>
            );
          }

          return (
            <Pressable key={route.key} onPress={onPress} accessibilityLabel={route.name} style={styles.item}>
              <Feather name={ICONS[route.name] ?? 'circle'} size={22} color={focused ? colors.accent : '#C9D8D1'} />
              {focused && <View style={styles.dot} />}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: 16, paddingTop: 8 },
  bar: {
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.primaryDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  item: { flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' },
  dot: { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.accent, marginTop: 5 },
  centerSlot: { flex: 1, alignItems: 'center' },
  centerBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginTop: -34,
    backgroundColor: '#2E8B62',
    borderWidth: 5,
    borderColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F4D3A',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
});
