import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../context/AuthContext';
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
    <AuthProvider>
      <SafeAreaProvider>
        <ClusterThemeProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="profile/[username]" options={{ title: 'Profile' }} />
            <Stack.Screen name="achievements" />
            <Stack.Screen name="settings" />
            <Stack.Screen name="leaderboards" />
            <Stack.Screen name="login" />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ClusterThemeProvider>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
