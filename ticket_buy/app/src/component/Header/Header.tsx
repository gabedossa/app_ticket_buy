// app/components/MenuHeader.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './HeaderStyleSheet';

interface MenuHeaderProps {
  screen?: string;
  title?: string;
  setScreen?: (screen: string) => void;
  showAdminButton?: boolean;
  showCartButton?: boolean;
  cartItemCount?: number;
  onAdminPress?: () => void;
  onCartPress?: () => void;
}

export const MenuHeader: React.FC<MenuHeaderProps> = ({
  title = "Ticketeria",
  cartItemCount = 0,
  showAdminButton = true,
  showCartButton = true,
  onAdminPress,
  onCartPress
}) => {
  const router = useRouter();

  const handleAdminPress = () => {
    if (onAdminPress) {
      onAdminPress();
    } else {
      router.push('/(tabs)/admin');
    }
  };

  const handleCartPress = () => {
    if (onCartPress) {
      onCartPress();
    } else {
      router.push('/(tabs)/cart');
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerTitleContainer}>
        <Ionicons name="fast-food" size={24} color="#fff" />
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      
      <View style={styles.headerActions}>
        {showAdminButton && (
          <TouchableOpacity onPress={handleAdminPress}>
            <View style={styles.ButtonStyle}>
              <Text style={styles.btnText}>Adm</Text>
            </View>
          </TouchableOpacity>
        )}
        
        {showCartButton && (
          <TouchableOpacity onPress={handleCartPress} style={styles.ButtonStyle}>
            <View style={styles.cartContent}>
              {cartItemCount > 0 && (
                <View style={styles.counterBack}>
                  <Text style={styles.counterText}>{cartItemCount}</Text>
                </View>
              )}
              <Text style={styles.carrinhoText}>Carrinho</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default MenuHeader;