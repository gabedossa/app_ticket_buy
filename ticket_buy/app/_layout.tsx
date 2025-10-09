// app/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';
import { CartProvider } from './src/context/CartContext';
import { OrdersProvider } from './src/context/OrderContext';
import { ProductsProvider } from './src/context/ProductContext';

export default function RootLayout() {
  return (
    <ProductsProvider>
      <CartProvider>
        <OrdersProvider>
          <Stack>
            <Stack.Screen 
              name="(tabs)" 
              options={{ 
                headerShown: false 
              }} 
            />
          </Stack>
        </OrdersProvider>
      </CartProvider>
    </ProductsProvider>
  );
}