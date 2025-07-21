import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../context/AuthContext';
import { StorageProvider } from '../context/StorageContext';
import { ClusterThemeProvider } from '../context/ThemeContext';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <StorageProvider>
      <AuthProvider>
        <SafeAreaProvider>
          <ClusterThemeProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: true }} />
              <Stack.Screen name="login" />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </ClusterThemeProvider>
        </SafeAreaProvider>
      </AuthProvider>
    </StorageProvider>
  );
}
