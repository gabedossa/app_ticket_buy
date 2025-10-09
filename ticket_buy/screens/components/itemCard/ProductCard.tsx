import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

const ProductCard = ({ product, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 6
  },
  name: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  price: {
    marginTop: 4,
    fontWeight: 'bold',
    color: '#333'
  }
});

export default ProductCard;