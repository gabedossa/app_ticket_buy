import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface ProductCardProps {
  product: any;
  onAddToCart: () => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <View style={{
      flex: 1,
      margin: 8,
      backgroundColor: "#FFF",
      borderRadius: 8,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    }}>
      <Image source={{ uri: product.image }} style={{ width: "100%", height: 140, borderTopLeftRadius: 8, borderTopRightRadius: 8 }} />
      <View style={{ padding: 12 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#1F2937" }}>{product.name}</Text>
        <Text style={{ fontSize: 12, color: "#6B7280", marginTop: 4, height: 30 }} numberOfLines={2}>
          {product.description}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#16A34A" }}>
            R$ {product.price.toFixed(2)}
          </Text>
          <TouchableOpacity
            onPress={onAddToCart}
            style={{
              backgroundColor: "#3B82F6",
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "#FFF", fontSize: 12, fontWeight: "500" }}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}