// app/screens/AdminScreen.tsx
import { Picker } from "@react-native-picker/picker";
import React from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface AdminScreenProps {
  orders: any[];
  products: any[];
  onBack: () => void;
  onCreateProduct: () => void;
  onEditProduct: (product: any) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateOrderStatus: (id: string, status: string) => void;
}

export default function AdminScreen({
  orders,
  products,
  onBack,
  onCreateProduct,
  onEditProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
}: AdminScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack}>
            <Text style={styles.headerBack}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Administração</Text>
          <View style={{ width: 50 }} />
        </View>

        <TouchableOpacity
          onPress={onCreateProduct}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>+ Novo Produto</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pedidos</Text>
          {orders.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum pedido recebido</Text>
          ) : (
            orders.map((order) => (
              <View key={order.id} style={styles.card}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.productName}>
                    Pedido #{order.id.slice(-6)}
                  </Text>
                  <Text style={styles.mutedText}>
                    {order.timestamp.toLocaleTimeString()}
                  </Text>
                </View>
                <Text style={{ marginVertical: 4 }}>
                  Total: R$ {order.total.toFixed(2)}
                </Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={order.status}
                    onValueChange={(itemValue) =>
                      onUpdateOrderStatus(order.id, itemValue)
                    }
                  >
                    <Picker.Item label="Em preparo" value="em preparo" />
                    <Picker.Item label="Pronto" value="pronto" />
                    <Picker.Item label="Entregue" value="entregue" />
                  </Picker>
                </View>
              </View>
            ))
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Produtos</Text>
          {products.map((product) => (
            <View key={product.id} style={styles.card}>
              <Image
                source={{ uri: product.image }}
                style={styles.adminProductImage}
              />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>
                R$ {product.price.toFixed(2)}
              </Text>
              <View style={styles.adminActions}>
                <TouchableOpacity onPress={() => onEditProduct(product)}>
                  <Text style={styles.linkText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      "Confirmar",
                      "Deseja realmente remover este produto?",
                      [
                        { text: "Cancelar", style: "cancel" },
                        {
                          text: "Remover",
                          style: "destructive",
                          onPress: () => onDeleteProduct(product.id),
                        },
                      ]
                    );
                  }}
                >
                  <Text style={[styles.linkText, { color: "#DC2626" }]}>
                    Remover
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
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
  primaryButton: {
    backgroundColor: "#3B82F6",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 12,
  },
  primaryButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "500" },
  section: { marginVertical: 16 },
  sectionTitle: { fontSize: 20, fontWeight: "600", marginBottom: 12 },
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
  adminProductImage: {
    width: "100%",
    height: 128,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: { fontSize: 16, fontWeight: "bold", color: "#1F2937" },
  productPrice: { fontSize: 14, color: "#16A34A" },
  adminActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
  },
  linkText: { color: "#3B82F6", fontSize: 14 },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 6,
    backgroundColor: "#FFF",
  },
  mutedText: { color: "#6B7280" },
});
