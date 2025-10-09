import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types';

type CartListItemProps = {
  item: CartItem;
};

const CartListItem = ({ item }: CartListItemProps) => {
  const { addToCart, removeFromCart } = useCart();

  return (
    <View style={styles.container}>
      {/* Detalhes do Item */}
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
      </View>

      {/* Seletor de Quantidade */}
      <View style={styles.quantitySelector}>
        <Pressable onPress={() => removeFromCart(item.id)}>
          <FontAwesome name="minus-circle" size={24} color={Colors.primary} />
        </Pressable>

        <Text style={styles.quantityText}>{item.quantity}</Text>

        <Pressable onPress={() => addToCart(item)}>
          <FontAwesome name="plus-circle" size={24} color={Colors.primary} />
        </Pressable>
      </View>
      
      {/* Preço Total do Item */}
      <Text style={styles.totalPrice}>
        R$ {(item.price * item.quantity).toFixed(2)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textDark,
  },
  itemPrice: {
    fontSize: 14,
    color: Colors.darkGray,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 16,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    minWidth: 20,
    textAlign: 'center',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textDark,
    width: 80, // Largura fixa para alinhar os totais
    textAlign: 'right',
  },
});

export default CartListItem;