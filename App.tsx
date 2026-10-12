import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { ThemeProvider, useTheme } from './src/store/ThemeContext';
import { UserProvider } from './src/store/UserContext';
import { MatchProvider } from './src/store/MatchContext';
import { AuthProvider } from './src/store/AuthContext';
import { RoomProvider } from './src/store/RoomContext';
import { MultiplayerProvider } from './src/store/MultiplayerContext';
import { ConnectionIndicator } from './src/components/common/ConnectionIndicator';
import { RootNavigator } from './src/navigation/RootNavigator';

function AppContent() {
  const { theme, isDark, fontsLoaded } = useTheme();

  const appNavTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      primary: theme.primary,
      background: theme.background,
      card: theme.card,
      text: theme.textPrimary,
      border: theme.surfaceBorder,
      notification: theme.accent,
    },
  };

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.background, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer theme={appNavTheme}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ConnectionIndicator />
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <UserProvider>
            <RoomProvider>
              <MultiplayerProvider>
                <MatchProvider>
                  <AppContent />
                </MatchProvider>
              </MultiplayerProvider>
            </RoomProvider>
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
