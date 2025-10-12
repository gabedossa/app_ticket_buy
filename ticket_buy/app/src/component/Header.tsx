import { useRouter } from 'expo-router'; // ← Mudar para useRouter
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './Header/HeaderStyleSheet';

interface HeaderProps {
  screen?: string;
  title?: string;
  setScreen?: (screen: string) => void;
  showAdminButton?: boolean;
  showCartButton?: boolean;
  cartItemCount?: number;
  onAdminPress?: () => void;
  onCartPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  screen, 
  title = "Ticketeria", 
  setScreen, 
  showAdminButton = true, 
  showCartButton = true, 
  cartItemCount = 0,
  onAdminPress,
  onCartPress
}) => {
  const router = useRouter(); // ← Usar useRouter hook

  const handleAdminPress = () => {
    if (onAdminPress) {
      onAdminPress();
    } else if (setScreen) {
      setScreen('admin'); // ← Se usar setScreen, apenas o nome da tela
    } else {
      router.push('/(tabs)/admin'); // ← Caminho completo com barra no início
    }
  };

  const handleCartPress = () => {
    if (onCartPress) {
      onCartPress();
    } else if (setScreen) {
      setScreen('cart'); // ← Se usar setScreen, apenas o nome da tela
    } else {
      router.push('/(tabs)/cart'); // ← Caminho completo com barra no início
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerTitleContainer}>
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
              <Text style={styles.btnText}>Carrinho</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;