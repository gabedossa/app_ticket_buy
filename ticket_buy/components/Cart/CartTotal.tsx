import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface CartTotalProps {
  total: number;
  onCheckout: () => void;
}

export default function CartTotal({ total, onCheckout }: CartTotalProps) {
  return (
    <View style={{ padding: 16, borderTopWidth: 1, borderTopColor: "#E5E7EB", backgroundColor: "#F9FAFB" }}>
      <View style={{ backgroundColor: "#FFF", borderRadius: 8, padding: 16 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Total:</Text>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>R$ {total.toFixed(2)}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onCheckout} style={{ backgroundColor: "#16A34A", padding: 16, borderRadius: 8, alignItems: "center", marginTop: 12 }}>
        <Text style={{ color: "#FFF", fontSize: 16, fontWeight: "bold" }}>Finalizar Pedido</Text>
      </TouchableOpacity>
    </View>
  );
}