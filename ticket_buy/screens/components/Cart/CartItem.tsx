import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface CartItemProps {
  item: any; // substitua por tipo real depois
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, qty: number) => void;
}

export default function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  return (
    <View style={{ backgroundColor: "#FFF", borderRadius: 8, marginBottom: 12, padding: 12 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={{ uri: item.product.image }} style={{ width: 64, height: 64, borderRadius: 8 }} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.product.name}</Text>
          <Text style={{ fontSize: 14, color: "#16A34A" }}>R$ {item.product.price.toFixed(2)}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
            style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: "#E5E7EB", justifyContent: "center", alignItems: "center" }}
          >
            <Text>-</Text>
          </TouchableOpacity>
          <Text style={{ marginHorizontal: 12, fontSize: 16, fontWeight: "500" }}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
            style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: "#E5E7EB", justifyContent: "center", alignItems: "center" }}
          >
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}