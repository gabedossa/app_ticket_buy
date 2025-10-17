import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { ProductCategory } from '../../types';

type CategoryFilterProps = {
  categories: (ProductCategory | 'all')[];
  selectedCategory: ProductCategory | 'all';
  onSelectCategory: (category: ProductCategory | 'all') => void;
};

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  const getCategoryName = (category: string) => {
    switch (category) {
      case 'all': return 'Todos';
      case 'lanches': return 'Lanches';
      case 'bebidas': return 'Bebidas';
      case 'sobremesas': return 'Sobremesas';
      default: return category;
    }
  };

  return (
    <View style={styles.categoriesSection}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.categories}
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryBtn,
              selectedCategory === category && styles.categoryBtnActive,
            ]}
            onPress={() => onSelectCategory(category)}
          >
            <Text
              style={[
                styles.categoryBtnText,
                selectedCategory === category && styles.categoryBtnTextActive,
              ]}
            >
              {getCategoryName(category)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesSection: {
    backgroundColor: 'white',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  categories: {
    paddingHorizontal: 16,
  },
  categoryBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    marginRight: 10,
  },
  categoryBtnActive: {
    backgroundColor: '#961e00ff',
  },
  categoryBtnText: {
    color: '#333',
    fontWeight: '500',
    fontSize: 14,
    textTransform: 'capitalize',
  },
  categoryBtnTextActive: {
    color: 'white',
  },
});

export default CategoryFilter;