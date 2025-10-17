import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import AdminScreen from '../../(tabs)/admin';
import CartScreen from '../../(tabs)/cart';
import HomeScreen from '../../(tabs)/HomeScreen';

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

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4a90e2',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#4a90e2',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
      />
      <Tab.Screen 
        name="Carrinho" 
        component={CartScreen} 
      />
      <Tab.Screen 
        name="Admin" 
        component={AdminScreen} 
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
