import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { ProductService } from '../api/service';
import ProductCard from '../component/ProductCard';
import { Colors } from '../constants/Colors';
import { Product } from '../types';

export default function MenuScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    ProductService.getProducts().then(setProducts);
  }, []);
  
  const categories = useMemo(() => ['all', ...new Set(products.map(p => p.category))], [products]);
  
  const filteredProducts = useMemo(() => categoryFilter === 'all'
    ? products
    : products.filter(p => p.category === categoryFilter), [products, categoryFilter]);

  return (
    <View style={styles.container}>
        <View>
            <FlatList
              data={categories}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContainer}
              renderItem={({item}) => (
                <Pressable 
                  style={[styles.categoryBtn, categoryFilter === item && styles.categoryBtnActive]}
                  onPress={() => setCategoryFilter(item)}
                >
                  <Text style={[styles.categoryText, categoryFilter === item && styles.categoryTextActive]}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Text>
                </Pressable>
              )}
            />
        </View>
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.grid}
          renderItem={({ item }) => <ProductCard product={item} />}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.lightGray },
  grid: { padding: 10 },
  categoriesContainer: { paddingVertical: 10, paddingHorizontal: 5 },
  categoryBtn: {
    backgroundColor: Colors.mediumGray,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  categoryBtnActive: { backgroundColor: Colors.primary },
  categoryText: { color: Colors.textDark, fontWeight: '600' },
  categoryTextActive: { color: Colors.white },
});