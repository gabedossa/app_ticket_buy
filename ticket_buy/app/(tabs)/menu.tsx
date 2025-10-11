import { useRouter } from 'expo-router';
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg from "react-native-svg";

import { useCart } from '../src/context/CartContext';
import { ProductService } from "../src/service/ProductService";
import { Product } from '../src/types';

const Menu = () => {
  const router = useRouter(); 
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { addToCart, itemCount } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const productsData = await ProductService.getProducts();

        const formattedProducts: Product[] = productsData.map((p: any) => ({
          id: p.idProduto,
          name: p.home || p.nome,
          price: p.preco,
          category: p.tipo,
          description: p.descricao || `Delicioso ${p.nome || "produto"}...`,
          images: p.imagens, 
        }));
        
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleAddToCart = (product: Product | null) => {
    if (!product) return;
    addToCart(product);
    setSelectedProduct(null);
  };


  const filteredProducts =
    categoryFilter === "all"
      ? products
      : products.filter((product) => product.category === categoryFilter);
  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];
  
  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.productCard} onPress={() => setSelectedProduct(item)}>
      <Image
        source={{ uri: item.images?.[0] || `https://placehold.co/300x300?text=${item.name?.charAt(0)}` }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#4a90e2" />
        <Text style={styles.loadingText}>Carregando produtos...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Svg height="24" width="24">{/* ... seu ícone SVG ... */}</Svg>
          <Text style={styles.headerTitle}>Ticketeria</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/(tabs)/admin')} >
            <View style={styles.admBtn}><Text style={styles.admText}>Adm</Text></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(tabs)/cart')} style={styles.cartButton}>
          <View style={styles.counterBack}>
            {/* --- 5. DADO GLOBAL NA UI --- */}
            {/* O contador agora vem de 'itemCount' do contexto. */}
            <Text style={styles.serverStatus}>{itemCount > 0 ? `${itemCount}` : `0`}</Text>
          </View>
          <Text style={styles.carrinhoText}>Carrinho</Text>
        </TouchableOpacity>
      </View>

      {/* --- 6. RENDERIZAÇÃO SIMPLIFICADA --- */}
      {/* Removemos a lógica de 'screen === "menu"' e renderizamos sempre o menu. */}
      <>
        <View>
          <ScrollView horizontal contentContainerStyle={styles.categories}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[styles.categoryBtn, categoryFilter === category && styles.categoryBtnActive]}
                onPress={() => setCategoryFilter(category)}
              >
                <Text style={[styles.categoryBtnText, categoryFilter === category && styles.categoryBtnTextActive]}>
                  {category === "all" ? "Todos" : category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          // Usando 'item.id' do nosso tipo padronizado
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.productsGrid}
          columnWrapperStyle={{ gap: 12 }}
          ListEmptyComponent={() => <View style={styles.centerContent}><Text>Nenhum produto encontrado.</Text></View>}
        />
      </>
      
      {/* MODAL */}
      <Modal visible={!!selectedProduct} transparent={true} animationType="fade" onRequestClose={() => setSelectedProduct(null)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Image source={{ uri: selectedProduct?.images?.[0] || '...' }} style={styles.modalImage} />
            <Text style={styles.modalTitle}>{selectedProduct?.name}</Text>
            <Text style={styles.modalDescription}>{selectedProduct?.description}</Text>
            <View style={styles.modalFooter}>
              <Text style={styles.modalPrice}>R$ {selectedProduct?.price.toFixed(2)}</Text>
              <TouchableOpacity style={styles.modalButton} onPress={() => handleAddToCart(selectedProduct)}>
                <Text style={styles.modalButtonText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedProduct(null)}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* --- REMOVIDO: O CheckoutModal foi deletado daqui. */}
    </SafeAreaView>
  );
};

// Cole aqui o seu StyleSheet original completo da tela de Menu.
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f0f2f5" },
    fullScreen: { flex: 1 },
    centerContent: { flex: 1, justifyContent: "center", alignItems: "center" },
    header: { backgroundColor: "#c23b01ff", paddingVertical: 12, paddingHorizontal: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    headerTitleContainer: { flexDirection: "row", alignItems: "center" },
    headerTitle: { fontSize: 20, fontWeight: "600", color: "white", marginLeft: 8 },
    admBtn: { width: 80, height: 40, alignItems: "center", justifyContent: "center", backgroundColor: "#d2b302ff", borderRadius: 16 },
    admText: { color: "#555" },
    backButton: { marginLeft: -8 },
    counterBack: { width: 18, height: 18, position: "absolute", top: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", fontWeight: 700, backgroundColor: "rgba(255, 204, 0, 1)", borderRadius: 18 },
    carrinhoText: { color: "#FFF" },
    cartButton: { width: 80, height: 40, alignItems: "center", justifyContent: "center", backgroundColor: "#913800ff", borderRadius: 16 },
    serverStatus: { fontSize: 14, color: "#000", opacity: 0.95, fontWeight: "500" },
    categories: { paddingVertical: 12, paddingHorizontal: 16 },
    categoryBtn: { paddingVertical: 8, paddingHorizontal: 16, backgroundColor: "#e0e0e0", borderRadius: 20, marginRight: 10 },
    categoryBtnActive: { backgroundColor: "#961e00ff" },
    categoryBtnText: { color: "#333", fontWeight: "500" },
    categoryBtnTextActive: { color: "white" },
    productsGrid: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 20 },
    productCard: { flex: 1, backgroundColor: "white", borderRadius: 12, overflow: "hidden", marginBottom: 12, elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41 },
    productImage: { width: "100%", height: 120 },
    productInfo: { padding: 12, alignItems: "center" },
    productName: { fontSize: 16, fontWeight: "600", color: "#333" },
    productPrice: { fontSize: 16, fontWeight: "bold", color: "#2c3e50", marginTop: 4 },
    loadingText: { marginTop: 16, color: "#666", fontSize: 16 },
    modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", alignItems: "center", padding: 20 },
    modalContent: { backgroundColor: "white", borderRadius: 16, width: "100%", padding: 24, elevation: 5, alignItems: "center" },
    modalImage: { width: "100%", height: 180, borderRadius: 12, marginBottom: 16 },
    modalTitle: { fontSize: 22, fontWeight: "bold", color: "#751700ff", marginBottom: 8, textAlign: "center" },
    modalDescription: { fontSize: 16, color: "#420d00ff", lineHeight: 24, marginBottom: 20, textAlign: "center" },
    modalFooter: { flexDirection: "row", justifyContent: "space-between", backgroundColor: "#EEE", alignItems: "center", marginTop: 16, width: "100%" },
    modalPrice: { fontSize: 20, marginLeft: 8, fontWeight: "bold", color: "#751700ff" },
    modalButton: { paddingVertical: 12, paddingHorizontal: 24, backgroundColor: "#961e00ff", borderRadius: 8 },
    modalButtonText: { color: "white", fontSize: 16, fontWeight: "600" },
    closeButton: { width: 34, height: 34, display: "flex", borderRadius: 32, alignItems: "center", backgroundColor: "#961e00ff", position: "absolute", top: 10, right: 15 },
    closeButtonText: { fontSize: 22, color: "#FFF" }
});

export default Menu;