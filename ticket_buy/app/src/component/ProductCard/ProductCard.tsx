import React from 'react';
import { Image, Text, View } from 'react-native';
import { Product } from '../../types';
import { style } from './ProductCardStyle';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <View style={style.card}>
      <Image 
        source={{ 
          uri: product.images?.[0] || `https://placehold.co/300x300?text=Produto` 
        }} 
        style={style.image} 
      />
      <View style={style.textContainer}>
        <Text style={style.name} numberOfLines={2}>{product.name}</Text>
        <Text style={style.price}>R$ {product.price.toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default ProductCard;