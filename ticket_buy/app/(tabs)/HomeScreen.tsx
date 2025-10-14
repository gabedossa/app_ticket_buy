import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Header from "../src/component/Header/Header";
import ModalProduct from "../src/component/modalProduct/ModalProduct";
import ProductCard from "../src/component/ProductCard/ProductCard";
import { useCart } from "../src/context/CartContext";
import { ProductService } from "../src/service/ProductService";
import { Product, ProductCategory, normalizeProduct } from "../src/types";

const HomeScreen = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | 'all'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { addToCart, itemCount } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const productsData = await ProductService.getProducts();

        // Usar a função de normalização para garantir consistência
        const formattedProducts: Product[] = productsData.map((p: any) => normalizeProduct(p));

        setProducts(formattedProducts);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // DEBUG
  console.log("🔵 Selected Product:", selectedProduct?.name);
  console.log("🔵 Modal Visible:", !!selectedProduct);

  const filteredProducts =
    categoryFilter === 'all'
      ? products
      : products.filter((product) => product.tipo === categoryFilter);

  // Extrair categorias únicas dos produtos
  const categories: (ProductCategory | 'all')[] = [
    'all',
    ...Array.from(new Set(products.map((product) => product.tipo))) as ProductCategory[]
  ];

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => {
        setSelectedProduct(item);
      }}
    >
      <ProductCard product={item} />
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
      <Header
        cartItemCount={itemCount}
        title="Ticketeria"
        showAdminButton={true}
        showCartButton={true}
        onAdminPress={() => router.push('/admin')}
        onCartPress={() => router.push('/cart')}
      />

      {/* Filtros de Categoria */}
      <View style={styles.categoriesSection}>
        <ScrollView 
          horizontal 
          contentContainerStyle={styles.categories}
          showsHorizontalScrollIndicator={false}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryBtn,
                categoryFilter === category && styles.categoryBtnActive,
              ]}
              onPress={() => setCategoryFilter(category)}
            >
              <Text
                style={[
                  styles.categoryBtnText,
                  categoryFilter === category && styles.categoryBtnTextActive,
                ]}
              >
                {category === 'all' ? 'Todos' : 
                 category === 'lanches' ? 'Lanches' :
                 category === 'bebidas' ? 'Bebidas' :
                 category === 'sobremesas' ? 'Sobremesas' : category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Lista de Produtos */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productsGrid}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum produto encontrado</Text>
          </View>
        )}
      />

      {/* Modal do Produto */}
      <ModalProduct
        visible={!!selectedProduct}
        product={selectedProduct}
        onClose={() => {
          console.log("🔴 Fechando modal");
          setSelectedProduct(null);
        }}
        onAddToCart={(product) => {
          addToCart(product);
          setSelectedProduct(null);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  categoriesSection: {
    backgroundColor: "white",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  categories: {
    paddingHorizontal: 16,
  },
  categoryBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    marginRight: 10,
  },
  categoryBtnActive: {
    backgroundColor: "#961e00ff",
  },
  categoryBtnText: {
    color: "#333",
    fontWeight: "500",
    fontSize: 14,
    textTransform: "capitalize",
  },
  categoryBtnTextActive: {
    color: "white",
  },
  productsGrid: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  columnWrapper: {
    gap: 12,
  },
  productCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  loadingText: {
    marginTop: 16,
    color: "#666",
    fontSize: 16,
  },
});

export default HomeScreen;