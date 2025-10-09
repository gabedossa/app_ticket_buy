import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { Colors } from '../constants/Colors';
import { useCart } from '../context/CartContext';

export default function TabsLayout() {
  const { itemCount } = useCart();

  return (
    <Tabs 
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: Colors.white,
      }}
    >
      {/* Aba do Cardápio */}
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Cardápio',
          tabBarIcon: ({ color }) => <FontAwesome name="cutlery" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Carrinho',
          tabBarIcon: ({ color }) => <FontAwesome name="shopping-cart" size={24} color={color} />,
          
          tabBarBadge: itemCount > 0 ? itemCount : undefined,
        }}
      />

      <Tabs.Screen
        name="admin"
        options={{
          title: 'Admin',
          tabBarIcon: ({ color }) => <FontAwesome name="user-secret" size={24} color={color} />,

          href: null,
        }}
      />
    </Tabs>
  );
}