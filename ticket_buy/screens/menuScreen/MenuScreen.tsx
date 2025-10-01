// app/screens/MenuScreen.tsx
import React from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import CategoryChip from "../../../components/menu/CategoryChip";
import ProductCard from "../components/menu/ProductCard";
import { categories } from "../constants/categories";

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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 16,
        paddingHorizontal: 16,
        backgroundColor: "#FFF",
      }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "#1F2937" }}>Ifood</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={onGoToAdmin}
            style={{
              backgroundColor: "#E5E7EB",
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 6,
            }}
          >
            <Text style={{ fontSize: 14 }}>Admin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onGoToCart}
            style={{ marginLeft: 16 }}
          >
            <Text style={{ fontSize: 24 }}>🛒</Text>
            {cart.length > 0 && (
              <View style={{
                position: "absolute",
                top: -4,
                right: -8,
                backgroundColor: "#EF4444",
                borderRadius: 10,
                width: 20,
                height: 20,
                justifyContent: "center",
                alignItems: "center",
              }}>
                <Text style={{ color: "#FFF", fontSize: 12, fontWeight: "bold" }}>
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
          <CategoryChip
            key={category.id}
            category={category}
            isActive={activeCategory === category.id}
            onPress={() => onCategoryChange(category.id)}
          />
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 8 }}>
        {products
          .filter((p) => p.category === activeCategory)
          .map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => onAddToCart(product)}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}