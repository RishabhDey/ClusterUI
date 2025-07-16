import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function ProfileTab() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/profile/me'); // Always open your own profile
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator />
      <Text>Loading your profile...</Text>
    </View>
  );
}
