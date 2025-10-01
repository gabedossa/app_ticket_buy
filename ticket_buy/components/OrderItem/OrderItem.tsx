import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Text, View } from "react-native";

interface OrderItemProps {
  order: any;
  onUpdateStatus: (id: string, status: string) => void;
}

export default function OrderItem({ order, onUpdateStatus }: OrderItemProps) {
  return (
    <View style={{
      backgroundColor: "#FFF",
      borderRadius: 8,
      marginBottom: 12,
      padding: 12,
    }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Pedido #{order.id.slice(-6)}</Text>
        <Text style={{ color: "#6B7280" }}>{order.timestamp.toLocaleTimeString()}</Text>
      </View>
      <Text style={{ marginVertical: 4 }}>Total: R$ {order.total.toFixed(2)}</Text>
      <View style={{
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 6,
        backgroundColor: "#FFF",
      }}>
        <Picker
          selectedValue={order.status}
          onValueChange={(value) => onUpdateStatus(order.id, value)}
        >
          <Picker.Item label="Em preparo" value="em preparo" />
          <Picker.Item label="Pronto" value="pronto" />
          <Picker.Item label="Entregue" value="entregue" />
        </Picker>
      </View>
    </View>
  );
}