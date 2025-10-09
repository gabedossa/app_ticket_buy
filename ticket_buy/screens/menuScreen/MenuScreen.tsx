import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard from '../components/ProductCard';

const MenuScreen = ({ 
  products, 
  selectedCategory, 
  onCategoryChange, 
  onProductSelect 
}) => {
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <View style={styles.container}>
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />
      
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <ProductCard 
            product={item} 
            onPress={() => onProductSelect(item)}
          />
        )}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  grid: {
    paddingBottom: 16
  }
});

export default MenuScreen;