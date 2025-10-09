import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
// Hook para receber os parâmetros
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from './src/constants/Colors';
import { useCart } from './src/context/CartContext';
import { Product } from './src/types/index';

export default function ModalProductScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();

  if (!params.id) {
    return null;
  }

  const product: Product = {
    id: parseInt(params.id as string),
    name: params.name as string,
    price: parseFloat(params.price as string),
    description: params.description as string,
    category: '', 
    image: params.image as string,
  };

  const handleAddToCart = () => {
    addToCart(product);
    router.back(); // Fecha o modal
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>

      <Pressable style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
      </Pressable>
    </View>
  );
}

// (Os estilos para o modal vão aqui...)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  image: { width: '100%', height: 250 },
  content: { flex: 1, padding: 20 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  price: { fontSize: 20, color: Colors.primary, fontWeight: '700', marginBottom: 16 },
  description: { fontSize: 16, color: Colors.darkGray, lineHeight: 24 },
  button: { backgroundColor: Colors.primary, padding: 16, margin: 20, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 18, fontWeight: '600' }
});