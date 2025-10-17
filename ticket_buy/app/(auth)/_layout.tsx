// app/(tabs)/_layout.tsx

import { Tabs } from 'expo-router';
import React from 'react';
import { CartProvider } from '../../src/context/CartContext';
import { OrdersProvider } from '../../src/context/OrderContext';
import { ProductsProvider } from '../../src/context/ProductContext';


export default function TabsLayout() {
  return (
    <ProductsProvider>
      <OrdersProvider>
        <CartProvider>
          <Tabs 
            screenOptions={{ 
              headerShown: false, 
            }}
          >
            <Tabs.Screen
              name="HomeScreen"
              options={{
                title: 'Início',
              }}
            />
            <Tabs.Screen
              name="OrdersScreen" 
              options={{
                title: 'Meus Pedidos',
              }}
            />
            <Tabs.Screen
              name="cart" 
              options={{
                title: 'Carrinho',

              }}
            />
          </Tabs>
        </CartProvider>
      </OrdersProvider>
    </ProductsProvider>
  );
}