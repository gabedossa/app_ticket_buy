import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import CartListItem from '../component/cartListItem';
import { Colors } from '../constants/Colors';
import { useCart } from '../context/CartContext';

export default function CartScreen() {
  const { items, total } = useCart();
  const router = useRouter();
  const handleCheckout = () => {
    if (items.length === 0) return;

    router.push({
      pathname: '/modal',
      params: { total: total.toFixed(2) },
    });
  };

  return (
    <View style={styles.container}>
      {/* 2. Verifica se o carrinho está vazio */}
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
        </View>
      ) : (
        <>
          {/* 3. Lista os itens do carrinho */}
          <FlatList
            data={items}
            renderItem={({ item }) => <CartListItem item={item} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
          />

          {/* 4. Rodapé com o total e botão de finalizar */}
          <View style={styles.footer}>
            <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
            <Pressable style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutButtonText}>Finalizar Pedido</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: Colors.darkGray,
    fontWeight: '500',
  },
  listContainer: {
    padding: 16,
    backgroundColor: Colors.white,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textDark,
    textAlign: 'right',
    marginBottom: 12,
  },
  checkoutButton: {
    backgroundColor: Colors.success,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});