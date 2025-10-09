import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface CategoryChipProps {
  category: { id: string; name: string };
  isActive: boolean;
  onPress: () => void;
}

export default function CategoryChip({ category, isActive, onPress }: CategoryChipProps) {
  return (
    <TouchableOpacity
      key={category.id}
      onPress={onPress}
      style={[
        {
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 20,
          backgroundColor: "#E5E7EB",
          marginRight: 10,
        },
        isActive && { backgroundColor: "#3B82F6" },
      ]}
    >
      <Text
        style={[
          { color: "#374151", fontWeight: "500" },
          isActive && { color: "#FFF" },
        ]}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}