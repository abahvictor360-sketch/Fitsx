import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { MAX_APP_WIDTH } from '../hooks';
import { ShopProvider } from '../store/ShopContext';
import { colors } from '../theme/colors';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ShopProvider>
        <StatusBar style="dark" />
        <View style={styles.outer}>
          <View style={styles.app}>
            <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="product/[id]" />
              <Stack.Screen name="cart" />
            </Stack>
          </View>
        </View>
      </ShopProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  outer: { flex: 1, backgroundColor: Platform.OS === 'web' ? colors.mint : colors.background, alignItems: 'center' },
  app: { flex: 1, width: '100%', maxWidth: MAX_APP_WIDTH, backgroundColor: colors.background, overflow: 'hidden' },
});
