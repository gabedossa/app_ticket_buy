import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import AdminScreen from '../../(tabs)/admin';
import CartScreen from '../../(tabs)/cart';
import MenuScreen from '../../(tabs)/menu';

import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Cardápio') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'Carrinho') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Admin') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else {
            iconName = 'ellipse';
          }

          // Você pode retornar qualquer componente aqui!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4a90e2', // Cor da aba ativa
        tabBarInactiveTintColor: 'gray',   // Cor da aba inativa
        headerStyle: {
          backgroundColor: '#4a90e2', // Cor do cabeçalho
        },
        headerTintColor: '#fff', // Cor do texto do cabeçalho
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Cardápio" 
        component={MenuScreen} 
      />
      <Tab.Screen 
        name="Carrinho" 
        component={CartScreen} 
        // Aqui você pode adicionar um "badge" com a contagem de itens
        // options={{ tabBarBadge: 3 }} 
      />
      <Tab.Screen 
        name="Admin" 
        component={AdminScreen} 
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
