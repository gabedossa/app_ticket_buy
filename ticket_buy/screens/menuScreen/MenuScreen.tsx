// app/screens/MenuScreen.tsx
import { categories } from "@/constants/categories";
import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface MenuScreenProps {
  products: any[];
  cart: any[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  onAddToCart: (product: any) => void;
  onGoToCart: () => void;
  onGoToAdmin: () => void;
}

export default function MenuScreen({
  products,
  cart,
  activeCategory,
  onCategoryChange,
  onAddToCart,
  onGoToCart,
  onGoToAdmin,
}: MenuScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { paddingHorizontal: 16, paddingTop: 16 }]}>
        <Text style={styles.headerTitle}>Ifood</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={onGoToAdmin} style={styles.adminButton}>
            <Text style={styles.adminButtonText}>Admin</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onGoToCart} style={{ marginLeft: 16 }}>
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

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => onCategoryChange(category.id)}
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
                  onPress={() => onAddToCart(item)}
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
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
    backgroundColor: "#FFF",
  },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#1F2937" },
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
});