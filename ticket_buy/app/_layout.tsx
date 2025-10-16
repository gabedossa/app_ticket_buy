// app/_layout.tsx

import { Stack, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { AuthProvider, useAuth } from './src/context/AuthContext';

// Este componente gerencia a lógica de navegação
const RootNavigation = () => {
  const { authState } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Não faça nada enquanto o estado de autenticação estiver carregando
    if (authState.isLoading) {
      return;
    }

    // Quando o carregamento terminar, decida para onde redirecionar
    if (authState.isAuthenticated) {
      // Se autenticado, vá para a tela principal dentro das abas
      router.replace('/(tabs)/HomeScreen');
    } else {
      // Se não autenticado, vá para a tela de login
      router.replace('/login');
    }
  }, [authState.isAuthenticated, authState.isLoading, router]);

  // Enquanto o AuthContext verifica o token, mostre uma tela de carregamento
  if (authState.isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Quando o carregamento terminar, mostre o navegador principal
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
}

// O Layout Raiz do App
export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});