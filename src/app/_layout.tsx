import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AnimatedSplash } from '../components/AnimatedSplash';
import { MAX_APP_WIDTH } from '../hooks';
import { AuthProvider } from '../store/AuthContext';
import { ShopProvider } from '../store/ShopContext';
import { colors } from '../theme/colors';
import { fontAssets } from '../theme/fonts';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fontAssets);
  const [introDone, setIntroDone] = useState(false);
  const ready = fontsLoaded || !!fontError;
  const finishIntro = useCallback(() => setIntroDone(true), []);

  useEffect(() => {
    if (ready) SplashScreen.hideAsync().catch(() => {});
  }, [ready]);

  if (!ready) return null;

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ShopProvider>
          <StatusBar style={introDone ? 'dark' : 'light'} />
          <View style={styles.outer}>
            <View style={styles.app}>
              <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="product/[id]" />
                <Stack.Screen name="cart" />
                <Stack.Screen name="login" options={{ animation: 'fade' }} />
                <Stack.Screen name="signup" options={{ animation: 'fade' }} />
              </Stack>
              {!introDone && <AnimatedSplash onFinish={finishIntro} />}
            </View>
          </View>
        </ShopProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  outer: { flex: 1, backgroundColor: Platform.OS === 'web' ? colors.mint : colors.background, alignItems: 'center' },
  app: { flex: 1, width: '100%', maxWidth: MAX_APP_WIDTH, backgroundColor: colors.background, overflow: 'hidden' },
});
