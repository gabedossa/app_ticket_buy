import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // 1. ADICIONADO: Importar o hook de navegação
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import Layout from "../src/component/layout";
import { useCart } from "../src/context/CartContext";
import { useOrders } from "../src/context/OrderContext";
import { CartItem } from "../src/types";

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

  const router = useRouter();

  const handleCheckout = async () => {
    try {
      await createOrder(items, total);
      setModalVisible(true);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível finalizar o pedido.");
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    clearCart();
    router.navigate("/(tabs)/menu");
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
          <TouchableOpacity onPress={() => router.push("/(tabs)/menu")}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
            <Text style={styles.BackText}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/cart")}
            style={styles.cartButton}
          >
            <View style={styles.counterBack}>
              <Text style={styles.serverStatus}>
                {itemCount > 0 ? `${itemCount}` : `0`}
              </Text>
            </View>
            <Text style={styles.carrinhoText}>Carrinho</Text>
          </TouchableOpacity>
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
        <TouchableOpacity onPress={() => router.push("/(tabs)/menu")}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
          <Text style={styles.BackText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/cart")}
          style={styles.cartButton}
        >
          <View style={styles.counterBack}>
            <Text style={styles.serverStatus}>
              {itemCount > 0 ? `${itemCount}` : `0`}
            </Text>
          </View>
          <Text style={styles.carrinhoText}>Carrinho</Text>
        </TouchableOpacity>
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
                  onPress={() =>
                    handleUpdateQuantity(item.id, item.quantity - 1)
                  }
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() =>
                    handleUpdateQuantity(item.id, item.quantity + 1)
                  }
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveItem(item.id)}
                >
                  <Text style={styles.removeButtonText}>×</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.itemTotal}>
                R$ {(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          )}
        />

        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
            <Text style={styles.itemsCount}>{itemCount} itens</Text>
          </View>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={handleCheckout}
          >
            <Text style={styles.checkoutButtonText}>Finalizar Pedido</Text>
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
                Escaneie o QR Code para pagar:
              </Text>
              <View style={styles.qrCodeContainer}>
                <QRCode
                  value={`valor_total=${total.toFixed(
                    2
                  )}&timestamp=${Date.now()}`}
                  size={220}
                  backgroundColor="white"
                  color="black"
                />
              </View>
              <Text style={styles.modalTotal}>
                Valor: R$ {total.toFixed(2)}
              </Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={handleCloseModal}
              >
                <Text style={styles.modalButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#c23b01ff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitleContainer: { flexDirection: "row", alignItems: "center" },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    marginLeft: 8,
  },
  cartButton: {
    width: 80,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#913800ff",
    borderRadius: 16,
  },
  serverStatus: {
    fontSize: 14,
    color: "#000",
    opacity: 0.95,
    fontWeight: "500",
  },
  admBtn: {
    width: 80,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d2b302ff",
    borderRadius: 16,
  },
  admText: { color: "#555" },
  container: { flex: 1, padding: 16 },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 18, color: "#666" },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    backgroundColor: "#f0f0f0",
  },
  itemInfo: {
    flex: 1,
    marginRight: 10,
  },
  itemName: { fontSize: 16, fontWeight: "600", color: "#333" },
  itemPrice: { fontSize: 14, color: "#666", marginTop: 4 },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterBack: {
    width: 18,
    height: 18,
    position: "absolute",
    top: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 700,
    backgroundColor: "rgba(255, 204, 0, 1)",
    borderRadius: 18,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#4a90e2",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  quantityText: { marginHorizontal: 10, fontSize: 16, fontWeight: "600" },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#e74c3c",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  carrinhoText: { color: "#FFF" },
  removeButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  itemTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
    minWidth: 70,
    textAlign: "right",
    marginLeft: 10,
  },
  BackText: {
    color: "#FFF",
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingTop: 16,
    marginTop: 16,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  totalText: { fontSize: 20, fontWeight: "bold", color: "#2c3e50" },
  itemsCount: { fontSize: 14, color: "#666" },
  checkoutButton: {
    backgroundColor: "#2ecc71",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 8,
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 16,
    color: "#475569",
    marginBottom: 20,
    textAlign: "center",
  },
  qrCodeContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
  },
  modalTotal: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 24,
  },
  modalCloseButton: {
    backgroundColor: "#4a90e2",
    paddingVertical: 14,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default CartScreen;
