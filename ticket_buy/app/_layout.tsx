// app/_layout.tsx

import { Stack } from 'expo-router';
import React from 'react';
import { CartProvider } from './src/context/CartContext';
import { OrdersProvider } from './src/context/OrderContext';
import { ProductsProvider } from './src/context/ProductContext';

// Centraliza todos os providers para manter o código limpo
const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProductsProvider>
      <OrdersProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </OrdersProvider>
    </ProductsProvider>
  );
};

export default function RootLayout() {
  return (
    <AppProviders>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </AppProviders>
  );
}