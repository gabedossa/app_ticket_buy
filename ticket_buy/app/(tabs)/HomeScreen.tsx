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
import ModalProduct from "../src/component/ModalProduct/ModalProduct";
import ProductCard from "../src/component/ProductCard/ProductCard";
import { useCart } from "../src/context/CartContext";
import { ProductService } from "../src/service/ProductService";
import { Product, ProductCategory } from "../src/types";
import { normalizeProduct } from "../src/util/ProductUtils";

const HomeScreen = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | "all">(
    "all"
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { addToCart, itemCount } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const productsData = await ProductService.getProducts();

        const formattedProducts: Product[] = productsData
          .map(normalizeProduct) // Agora a função é usada corretamente
          .filter((p) => p.id != null && p.name);

        setProducts(formattedProducts);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const filteredProducts =
    categoryFilter === "all"
      ? products
      : products.filter((product) => product.tipo === categoryFilter);

  const uniqueCategories = Array.from(
    new Set(products.map((p) => p.tipo).filter((t) => t !== undefined))
  ) as ProductCategory[];

  const categories: (ProductCategory | "all")[] = ["all", ...uniqueCategories];

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => setSelectedProduct(item)}
      disabled={!item.name}
    >
      <ProductCard product={item} />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#961e00ff" />
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
        onAdminPress={() => router.push("/admin")}
        onCartPress={() => router.push("/cart")}
      />
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
                {category === "all"
                  ? "Todos"
                  : category === "lanches"
                  ? "Lanches"
                  : category === "bebidas"
                  ? "Bebidas"
                  : category === "sobremesas"
                  ? "Sobremesas"
                  : category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => String(item.id)}
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

      <ModalProduct
        visible={!!selectedProduct}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(product: Product) => {
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
