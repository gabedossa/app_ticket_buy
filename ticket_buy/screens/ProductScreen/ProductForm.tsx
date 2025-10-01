// app/screens/ProductFormScreen.tsx
import { Picker } from "@react-native-picker/picker";
import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { categories } from "../../constants/categories";

interface ProductFormScreenProps {
  product: any;
  isEditing: boolean;
  onBack: () => void;
  onSave: () => void;
  onChange: (field: string, value: any) => void;
}

export default function ProductFormScreen({
  product,
  isEditing,
  onBack,
  onSave,
  onChange,
}: ProductFormScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack}>
            <Text style={styles.headerBack}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {isEditing ? "Editar Produto" : "Novo Produto"}
          </Text>
          <View style={{ width: 50 }} />
        </View>

        <View style={[styles.card, { padding: 16 }]}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={product.name}
            onChangeText={(text) => onChange("name", text)}
          />
          <Text style={styles.label}>Preço (R$)</Text>
          <TextInput
            style={styles.input}
            value={String(product.price || "")}
            keyboardType="numeric"
            onChangeText={(text) =>
              onChange("price", parseFloat(text) || 0)
            }
          />
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            value={product.description}
            multiline
            onChangeText={(text) => onChange("description", text)}
          />
          <Text style={styles.label}>URL da Imagem</Text>
          <TextInput
            style={styles.input}
            value={product.image}
            onChangeText={(text) => onChange("image", text)}
          />
          <Text style={styles.label}>Categoria</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={product.category}
              onValueChange={(itemValue) => onChange("category", itemValue)}
            >
              {categories.map((cat) => (
                <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
              ))}
            </Picker>
          </View>
          <TouchableOpacity onPress={onSave} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>
              {isEditing ? "Atualizar" : "Salvar Produto"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingHorizontal: 16,
    backgroundColor: "#FFF",
  },
  headerBack: { color: "#3B82F6", fontSize: 16, fontWeight: "500", width: 50 },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#1F2937" },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  label: { marginBottom: 4, color: "#374151" },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    backgroundColor: "#FFF",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 6,
    marginBottom: 12,
    backgroundColor: "#FFF",
  },
  primaryButton: {
    backgroundColor: "#3B82F6",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  primaryButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "500" },
});