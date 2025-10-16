// app/(tabs)/_layout.tsx

import { Tabs } from 'expo-router';
import React from 'react';
// Importe os provedores aqui
import { CartProvider } from '../src/context/CartContext';
import { OrdersProvider } from '../src/context/OrderContext';
import { ProductsProvider } from '../src/context/ProductContext';
// ... outros imports de ícones, etc.

export default function TabsLayout() {
  return (
    // ✅ Envolva o layout das abas com os provedores de dados
    <ProductsProvider>
      <OrdersProvider>
        <CartProvider>
          <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
              name="HomeScreen"
              // ... opções da sua aba
            />
            <Tabs.Screen
              name="CartScreen"
              // ... opções da sua aba
            />
             <Tabs.Screen
              name="OrdersScreen"
              // ... opções da sua aba
            />
            {/* ... outras abas */}
          </Tabs>
        </CartProvider>
      </OrdersProvider>
    </ProductsProvider>
  );
}