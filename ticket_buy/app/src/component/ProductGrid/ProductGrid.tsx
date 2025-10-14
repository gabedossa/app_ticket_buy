import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Product } from '../../types';
import ProductCard from '../ProductCard/ProductCard';

type ProductGridProps = {
  products: Product[];
  onProductPress: (product: Product) => void;
};

const ProductGrid = ({ products, onProductPress }: ProductGridProps) => {
  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCardContainer}
      onPress={() => onProductPress(item)}
      disabled={!item.name}
    >
      <ProductCard product={item} />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderProduct}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      contentContainerStyle={styles.productsGrid}
      columnWrapperStyle={styles.columnWrapper}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum produto encontrado</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  productsGrid: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  columnWrapper: {
    gap: 12,
  },
  productCardContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default ProductGrid;