import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import Colors from '@/constants/colors';

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // We're not adding custom fonts as per instructions
  });

  useEffect(() => { 
    if (error) {
      console.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.dark.background,
          },
          headerTintColor: Colors.dark.text,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: Colors.dark.background,
          },
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="workout/[id]" 
          options={{ 
            headerShown: true,
            title: "",
            animation: 'slide_from_right',
          }} 
        />
        <Stack.Screen 
          name="workout/active" 
          options={{ 
            headerShown: false,
            animation: 'slide_from_bottom',
            presentation: 'modal',
          }} 
        />
        <Stack.Screen 
          name="workout/create" 
          options={{ 
            headerShown: true,
            title: "",
            animation: 'slide_from_right',
          }} 
        />
      </Stack>
    </>
  );
}