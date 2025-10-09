import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Product } from '../app/src/api/types';
import { Colors } from './constants/Colors';
import { useCart } from './context/CartContext';

export default function ModalProductScreen() {
  // 1. Recebe os parâmetros enviados pela rota
  const params = useLocalSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();

  // Se, por algum motivo, os parâmetros não chegarem, não renderiza nada.
  if (!params.id) {
    return <View />;
  }

  // 2. Monta um objeto de produto a partir dos parâmetros recebidos
  const product: Product = {
    id: parseInt(params.id as string),
    name: params.name as string,
    price: parseFloat(params.price as string),
    description: params.description as string,
    category: '', // A categoria não é necessária aqui
    image: params.image as string,
  };

  const handleAddToCart = () => {
    addToCart(product);
    router.back(); // 3. Fecha o modal após adicionar ao carrinho
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    flex: 1, // Ocupa o espaço restante
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: Colors.darkGray,
    lineHeight: 24,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});