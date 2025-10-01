import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Productos } from "../mocks/data/dataMock";
import { CartItem, Order, OrderStatus, Product } from "../mocks/types/types";

const categories = [
  { id: "lanches", name: "Lanches" },
  { id: "bebidas", name: "Bebidas" },
  { id: "sobremesas", name: "Sobremesas" },
] as const;

type CategoryId = (typeof categories)[number]["id"];

export default function App() {
  // Estados
  const [products, setProducts] = useState<Product[]>(Productos);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentView, setCurrentView] = useState<
    "menu" | "cart" | "admin" | "productForm"
  >("menu");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    description: "",
    image: "",
    category: "lanches",
  });
  const [activeCategory, setActiveCategory] = useState<CategoryId>("lanches");

  // Funções do carrinho
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getTotal = () => {
    return cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  };

  // Checkout
  const handleCheckout = () => {
    if (cart.length === 0) return;
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      items: [...cart],
      total: getTotal(),
      status: "em preparo",
      timestamp: new Date(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setCurrentView("menu");
    Alert.alert("Pedido Realizado!", "Seu pedido foi enviado para a cozinha.");
  };

  // Funções de Admin
  const saveProduct = () => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? { ...newProduct, id: editingProduct.id }
            : p
        )
      );
      Alert.alert("Sucesso", "Produto atualizado!");
    } else {
      const productToAdd: Product = { ...newProduct, id: `prod-${Date.now()}` };
      setProducts((prev) => [productToAdd, ...prev]);
      Alert.alert("Sucesso", "Novo produto adicionado!");
    }
    setEditingProduct(null);
    setNewProduct({
      name: "",
      price: 0,
      description: "",
      image: "",
      category: "lanches",
    });
    setCurrentView("admin");
  };

  const deleteProduct = (id: string) => {
    Alert.alert("Confirmar", "Deseja realmente remover este produto?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: () => {
          setProducts((prev) => prev.filter((p) => p.id !== id));
        },
      },
    ]);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
  };

  // Renderização das Telas
  const renderCart = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setCurrentView("menu")}>
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
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      style={styles.quantityButton}
                    >
                      <Text>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
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
            <TouchableOpacity
              onPress={handleCheckout}
              style={styles.checkoutButton}
            >
              <Text style={styles.checkoutButtonText}>Finalizar Pedido</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );

  const renderAdmin = () => (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setCurrentView("menu")}>
            <Text style={styles.headerBack}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Administração</Text>
          <View style={{ width: 50 }} />
        </View>

        <TouchableOpacity
          onPress={() => {
            setEditingProduct(null);
            setNewProduct({
              name: "",
              price: 0,
              description: "",
              image: "",
              category: "lanches",
            });
            setCurrentView("productForm");
          }}
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
                      updateOrderStatus(order.id, itemValue)
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
                <TouchableOpacity
                  onPress={() => {
                    setEditingProduct(product);
                    setNewProduct(product);
                    setCurrentView("productForm");
                  }}
                >
                  <Text style={styles.linkText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteProduct(product.id)}>
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

  const renderProductForm = () => (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setCurrentView("admin")}>
            <Text style={styles.headerBack}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {editingProduct ? "Editar Produto" : "Novo Produto"}
          </Text>
          <View style={{ width: 50 }} />
        </View>

        <View style={[styles.card, { padding: 16 }]}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={newProduct.name}
            onChangeText={(text) =>
              setNewProduct({ ...newProduct, name: text })
            }
          />
          <Text style={styles.label}>Preço (R$)</Text>
          <TextInput
            style={styles.input}
            value={String(newProduct.price || "")}
            keyboardType="numeric"
            onChangeText={(text) =>
              setNewProduct({ ...newProduct, price: parseFloat(text) || 0 })
            }
          />
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            value={newProduct.description}
            multiline
            onChangeText={(text) =>
              setNewProduct({ ...newProduct, description: text })
            }
          />
          <Text style={styles.label}>URL da Imagem</Text>
          <TextInput
            style={styles.input}
            value={newProduct.image}
            onChangeText={(text) =>
              setNewProduct({ ...newProduct, image: text })
            }
          />
          <Text style={styles.label}>Categoria</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={newProduct.category}
              onValueChange={(itemValue) =>
                setNewProduct({
                  ...newProduct,
                  category: itemValue as CategoryId,
                })
              }
            >
              {categories.map((cat) => (
                <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
              ))}
            </Picker>
          </View>
          <TouchableOpacity onPress={saveProduct} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>
              {editingProduct ? "Atualizar" : "Salvar Produto"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  const renderMenu = () => (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { paddingHorizontal: 16, paddingTop: 16 }]}>
        <Text style={styles.headerTitle}>Ifood</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => setCurrentView("admin")}
            style={styles.adminButton}
          >
            <Text style={styles.adminButtonText}>Admin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCurrentView("cart")}
            style={{ marginLeft: 16 }}
          >
            <Text style={{ fontSize: 24 }}>🛒</Text>
            {cart.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => setActiveCategory(category.id)}
              style={[
                styles.categoryChip,
                activeCategory === category.id && styles.categoryChipActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  activeCategory === category.id &&
                    styles.categoryChipTextActive,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={products.filter((p) => p.category === activeCategory)}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 8 }}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={{ padding: 12 }}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productDescription} numberOfLines={2}>
                {item.description}
              </Text>
              <View style={styles.productFooter}>
                <Text style={styles.productPrice}>
                  R$ {item.price.toFixed(2)}
                </Text>
                <TouchableOpacity
                  onPress={() => addToCart(item)}
                  style={styles.addButton}
                >
                  <Text style={styles.addButtonText}>Adicionar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );

  // Seletor de View Principal
  switch (currentView) {
    case "cart":
      return renderCart();
    case "admin":
      return renderAdmin();
    case "productForm":
      return renderProductForm();
    case "menu":
    default:
      return renderMenu();
  }
}

// Estilos
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
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#1F2937" },
  headerBack: { color: "#3B82F6", fontSize: 16, fontWeight: "500", width: 50 },
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
  },
  checkoutButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
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
  adminProductImage: {
    width: "100%",
    height: 128,
    borderRadius: 8,
    marginBottom: 8,
  },
  adminActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
  },
  linkText: { color: "#3B82F6", fontSize: 14 },
  label: { marginBottom: 4, color: "#374151" },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    backgroundColor: "#FFF",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 6,
    marginBottom: 12,
    backgroundColor: "#FFF",
  },
  adminButton: {
    backgroundColor: "#E5E7EB",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  adminButtonText: { fontSize: 14 },
  cartBadge: {
    position: "absolute",
    top: -4,
    right: -8,
    backgroundColor: "#EF4444",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: { color: "#FFFFFF", fontSize: 12, fontWeight: "bold" },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    marginRight: 10,
  },
  categoryChipActive: { backgroundColor: "#3B82F6" },
  categoryChipText: { color: "#374151", fontWeight: "500" },
  categoryChipTextActive: { color: "#FFFFFF" },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  productImage: {
    width: "100%",
    height: 140,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  productName: { fontSize: 16, fontWeight: "bold", color: "#1F2937" },
  productDescription: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
    height: 30,
  },
  productFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  productPrice: { fontSize: 16, fontWeight: "bold", color: "#16A34A" },
  addButton: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: { color: "#FFFFFF", fontSize: 12, fontWeight: "500" },
  mutedText: { color: "#6B7280" },
});
