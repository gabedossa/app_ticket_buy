import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../src/component/Header/Header";
import Layout from "../../src/component/layout";
import { Colors } from "../../src/constants/Colors";
import { useCart } from "../../src/context/CartContext";
import { useOrders } from "../../src/context/OrderContext";
import { CartItem } from "../../src/types/Tipos";

const CartScreen = () => {
  const {
    items,
    removeItemFromCart,
    updateQuantity,
    clearCart,
    total,
    itemCount,
  } = useCart();
  const { createOrder } = useOrders();

  const [isModalVisible, setModalVisible] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const router = useRouter();

  const handleCheckout = async () => {
    if (items.length === 0) {
      Alert.alert("Carrinho Vazio", "Adicione itens ao carrinho antes de finalizar.");
      return;
    }
    
    setIsCheckingOut(true); // Ativa o loading
    try {

      await createOrder(items);
      setModalVisible(true);
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Não foi possível finalizar o pedido.");
    } finally {
      setIsCheckingOut(false); 
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    clearCart();
    router.push("/(tabs)/admin");
  };

  const handleRemoveItem = (productId: string | number) => {
    removeItemFromCart(productId);
  };

  const handleUpdateQuantity = (
    productId: string | number,
    quantity: number
  ) => {
    updateQuantity(productId, quantity);
  };

  if (itemCount === 0) {
    return (
      <Layout>
        <View style={styles.header}>
          <Header />
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <View style={styles.header}>
        <Header />
      </View>

      <View style={styles.container}>
        <FlatList
          data={items}
          keyExtractor={(item: CartItem) => item.id.toString()}
          renderItem={({ item }: { item: CartItem }) => (
            <View style={styles.cartItem}>
              <Image
                source={{
                  uri:
                    item.images && item.images.length > 0
                      ? item.images[0]
                      : "https://via.placeholder.com/60",
                }}
                style={styles.itemImage}
              />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
              </View>
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.itemTotal}>
                R$ {(item.price * item.quantity).toFixed(2)}
              </Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveItem(item.id)}
              >
                <Text style={styles.removeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 150 }}
        />

        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
            <Text style={styles.itemsCount}>{itemCount} itens</Text>
          </View>

          <TouchableOpacity
            style={[styles.checkoutButton, isCheckingOut && styles.checkoutButtonDisabled]}
            onPress={handleCheckout}
            disabled={isCheckingOut}
          >
            {isCheckingOut ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.checkoutButtonText}>Finalizar Pedido</Text>
            )}
          </TouchableOpacity>
        </View>

        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Pedido Realizado!</Text>
              <Text style={styles.modalDescription}>
                Acompanhe o status na tela de Admin.
              </Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={handleCloseModal}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: Colors.primary,
  },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 18, color: "#666" },
  cartItem: { flexDirection: "row", alignItems: "center", padding: 16, backgroundColor: "white", borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  itemImage: { width: 50, height: 50, borderRadius: 8, marginRight: 16 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: "600", color: "#333" },
  itemPrice: { fontSize: 14, color: "#666", marginTop: 4 },
  quantityControls: { flexDirection: "row", alignItems: "center", marginHorizontal: 16 },
  quantityButton: { width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.lightGray, justifyContent: "center", alignItems: "center" },
  quantityButtonText: { color: Colors.primary, fontSize: 18, fontWeight: "bold" },
  quantityText: { marginHorizontal: 12, fontSize: 16, fontWeight: "600" },
  itemTotal: { fontSize: 16, fontWeight: "bold", minWidth: 80, textAlign: "right" },
  removeButton: { width: 32, height: 32, borderRadius: 16, justifyContent: "center", alignItems: "center", marginLeft: 8 },
  removeButtonText: { color: "red", fontSize: 22, fontWeight: "bold" },
  footer: { borderTopWidth: 1, borderTopColor: "#e0e0e0", padding: 16, backgroundColor: 'white', position: 'absolute', bottom: 0, left: 0, right: 0 },
  totalContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  totalText: { fontSize: 20, fontWeight: "bold", color: "#2c3e50" },
  itemsCount: { fontSize: 14, color: "#666" },
  checkoutButton: { backgroundColor: Colors.secondary, padding: 16, borderRadius: 8, alignItems: "center" },
  checkoutButtonDisabled: { backgroundColor: Colors.gray }, // Estilo para botão desabilitado
  checkoutButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.7)", justifyContent: "center", alignItems: "center", paddingHorizontal: 20 },
  modalContent: { backgroundColor: "white", padding: 24, borderRadius: 16, width: "100%", alignItems: "center" },
  modalTitle: { fontSize: 24, fontWeight: "bold", color: "#1e293b", marginBottom: 8, textAlign: "center" },
  modalDescription: { fontSize: 16, color: "#475569", marginBottom: 20, textAlign: "center" },
  modalCloseButton: { backgroundColor: Colors.primary, paddingVertical: 14, borderRadius: 8, width: "100%", alignItems: "center" },
  modalButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default CartScreen;