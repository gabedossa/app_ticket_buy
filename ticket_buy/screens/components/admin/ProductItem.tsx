import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface ProductItemProps {
  product: any;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProductItem({ product, onEdit, onDelete }: ProductItemProps) {
  return (
    <View style={{
      backgroundColor: "#FFF",
      borderRadius: 8,
      marginBottom: 12,
      padding: 12,
    }}>
      <Image source={{ uri: product.image }} style={{ width: "100%", height: 128, borderRadius: 8, marginBottom: 8 }} />
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>{product.name}</Text>
      <Text style={{ fontSize: 14, color: "#16A34A" }}>R$ {product.price.toFixed(2)}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 12 }}>
        <TouchableOpacity onPress={onEdit}>
          <Text style={{ color: "#3B82F6", fontSize: 14 }}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Text style={{ color: "#DC2626", fontSize: 14 }}>Remover</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}