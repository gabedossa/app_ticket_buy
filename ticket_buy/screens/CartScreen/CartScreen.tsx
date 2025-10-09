import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CartScreen = ({ cart: any, onUpdateCart: any, onCheckout : any }) => {
  const updateQuantity = (productId, change) => {
    const updatedCart = cart.map(item => 
      item.id === productId 
        ? { ...item, quantity: Math.max(0, item.quantity + change) }
        : item
    ).filter(item => item.quantity > 0);
    
    onUpdateCart(updatedCart);
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho</Text>
      
      {cart.length === 0 ? (
        <Text>Seu carrinho está vazio.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text>R$ {item.price.toFixed(2)}</Text>
                </View>
                <View style={styles.quantityControls}>
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, -1)}
                  >
                    <Text>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, 1)}
                  >
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
          
          <View style={styles.footer}>
            <Text style={styles.total}>Total: R$ {getTotal().toFixed(2)}</Text>
            <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}>
              <Text style={styles.checkoutButtonText}>Finalizar Pedido</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  itemInfo: {
    flex: 1
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  quantityButton: {
    padding: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4
  },
  quantity: {
    marginHorizontal: 12,
    fontSize: 16
  },
  footer: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 16
  },
  checkoutButton: {
    backgroundColor: '#2ecc71',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center'
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default CartScreen;