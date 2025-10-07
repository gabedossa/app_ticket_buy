// app/screens/ProductFormScreen.tsx
import { Picker } from "@react-native-picker/picker";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { Product } from "../../app/type/types";
import { categories } from "../../constants/categories";
import { useProductForm } from "../hooks/ProductHook";

interface ProductFormScreenProps {
  route?: any;
  navigation: any;
  product?: Product;
  isEditing?: boolean;
  onBack?: () => void;
  onSaveSuccess?: (product: Product) => void;
}

export default function ProductFormScreen({ 
  route, 
  navigation, 
  product: propProduct,
  isEditing: propIsEditing,
  onBack: propOnBack,
  onSaveSuccess 
}: ProductFormScreenProps) {
  // Obtém parâmetros da navegação ou usa props
  const productFromRoute = route?.params?.product;
  const isEditingFromRoute = route?.params?.isEditing;
  
  const product = propProduct || productFromRoute;
  const isEditing = propIsEditing ?? isEditingFromRoute ?? false;

  const { 
    product: formProduct, 
    loading, 
    error,
    handleChange, 
    handleSave, 
    resetForm,
    setProduct
  } = useProductForm(product);

  // Atualiza o formulário quando o produto muda
  useEffect(() => {
    if (product) {
      setProduct(product);
    }
  }, [product]);

  const handleBack = () => {
    if (propOnBack) {
      propOnBack();
    } else {
      navigation.goBack();
    }
  };

  const handleSavePress = async () => {
    const savedProduct = await handleSave();
    
    if (savedProduct) {
      Alert.alert(
        'Sucesso!',
        `Produto ${isEditing ? 'atualizado' : 'criado'} com sucesso!`,
        [{ text: 'OK', onPress: () => {
          if (onSaveSuccess) {
            onSaveSuccess(savedProduct);
          }
          handleBack();
        }}]
      );
    } else if (error) {
      Alert.alert('Erro', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} disabled={loading}>
            <Text style={[styles.headerBack, loading && styles.disabled]}>
              ← Voltar
            </Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {isEditing ? "Editar Produto" : "Novo Produto"}
          </Text>
          <View style={{ width: 50 }} />
        </View>

        {error && (
          <View style={styles.errorCard}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={[styles.card, { padding: 16 }]}>
          <Text style={styles.label}>Nome *</Text>
          <TextInput
            style={styles.input}
            value={formProduct.name}
            onChangeText={(text) => handleChange("name", text)}
            placeholder="Digite o nome do produto"
            editable={!loading}
          />

          <Text style={styles.label}>Preço (R$) *</Text>
          <TextInput
            style={styles.input}
            value={formProduct.price ? String(formProduct.price) : ""}
            keyboardType="numeric"
            onChangeText={(text) =>
              handleChange("price", text ? parseFloat(text) : 0)
            }
            placeholder="0.00"
            editable={!loading}
          />

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            value={formProduct.description}
            multiline
            onChangeText={(text) => handleChange("description", text)}
            placeholder="Digite a descrição do produto"
            editable={!loading}
          />

          <Text style={styles.label}>URL da Imagem</Text>
          <TextInput
            style={styles.input}
            value={formProduct.image}
            onChangeText={(text) => handleChange("image", text)}
            placeholder="https://exemplo.com/imagem.jpg"
            editable={!loading}
          />

          <Text style={styles.label}>Categoria</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formProduct.category}
              onValueChange={(itemValue) => handleChange("category", itemValue)}
              enabled={!loading}
            >
              <Picker.Item label="Selecione uma categoria" value="" />
              {categories.map((cat) => (
                <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
              ))}
            </Picker>
          </View>

          <TouchableOpacity 
            onPress={handleSavePress} 
            style={[
              styles.primaryButton, 
              loading && styles.buttonDisabled
            ]}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.primaryButtonText}>
                {isEditing ? "Atualizar Produto" : "Salvar Produto"}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={resetForm}
            style={styles.secondaryButton}
            disabled={loading}
          >
            <Text style={styles.secondaryButtonText}>Limpar Formulário</Text>
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
  label: { 
    marginBottom: 4, 
    color: "#374151",
    fontWeight: "500"
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#FFF",
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 6,
    marginBottom: 16,
    backgroundColor: "#FFF",
  },
  primaryButton: {
    backgroundColor: "#3B82F6",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 12,
  },
  primaryButtonText: { 
    color: "#FFFFFF", 
    fontSize: 16, 
    fontWeight: "600" 
  },
  secondaryButton: {
    backgroundColor: "transparent",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  secondaryButtonText: { 
    color: "#374151", 
    fontSize: 16, 
    fontWeight: "500" 
  },
  buttonDisabled: {
    backgroundColor: "#9CA3AF",
  },
  disabled: {
    color: "#9CA3AF",
  },
  errorCard: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FECACA",
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: "#DC2626",
    fontSize: 14,
  },
});