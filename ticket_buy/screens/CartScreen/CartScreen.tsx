// app/screens/CartScreen.tsx
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

interface CartScreenProps {
  cart: any[];
  onBack: () => void;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  onCheckout: () => void;
  getTotal: () => number;
}

export default function CartScreen({
  cart,
  onBack,
  onRemove,
  onUpdateQuantity,
  onCheckout,
  getTotal,
}: CartScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.headerBack}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Carrinho</Text>
        <View style={{ width: 50 }} />
      </View>

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.product.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={{ uri: item.product.image }}
                    style={styles.cartItemImage}
                  />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.productName}>{item.product.name}</Text>
                    <Text style={styles.productPrice}>
                      R$ {item.product.price.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        onUpdateQuantity(item.product.id, item.quantity - 1)
                      }
                      style={styles.quantityButton}
                    >
                      <Text>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        onUpdateQuantity(item.product.id, item.quantity + 1)
                      }
                      style={styles.quantityButton}
                    >
                      <Text>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            contentContainerStyle={{ padding: 16 }}
          />

          <View style={styles.totalContainer}>
            <View style={[styles.card, { padding: 16 }]}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalValue}>
                  R$ {getTotal().toFixed(2)}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={onCheckout} style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Finalizar Pedido</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: "#FFF",
  },
  headerBack: { color: "#3B82F6", fontSize: 16, fontWeight: "500", width: 50 },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#1F2937" },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { color: "#6B7280", fontSize: 16 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cartItemImage: { width: 64, height: 64, borderRadius: 8 },
  productName: { fontSize: 16, fontWeight: "500", color: "#111827" },
  productPrice: { color: "#6B7280", fontSize: 16, marginTop: 4 },
  quantityContainer: { flexDirection: "row", alignItems: "center" },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: { marginHorizontal: 12, fontSize: 16, fontWeight: "500" },
  totalContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
  },
  totalLabel: { fontSize: 18, fontWeight: "bold" },
  totalValue: { fontSize: 18, fontWeight: "bold" },
  checkoutButton: {
    backgroundColor: "#16A34A",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  checkoutButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
});