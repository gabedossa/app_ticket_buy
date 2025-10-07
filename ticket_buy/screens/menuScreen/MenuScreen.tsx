// app/screens/MenuScreen.tsx
import { categories } from "@/constants/categories";
import React from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // 👈 Importe

interface MenuScreenProps {
  products: any[];
  cart: any[];
  activeCategory: string;
  onCategoryChange: (categpry: any) => void;
  onAddToCart: (product: any) => void;
  onGoToCart: () => void;
  onGoToAdmin: () => void;
}

export default function MenuScreen({
  products,
  cart,
  activeCategory,
  onCategoryChange,
  onAddToCart,
  onGoToCart,
  onGoToAdmin,
}: MenuScreenProps) {
  const insets = useSafeAreaInsets();

  return (
 
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.logoCountainer}>
        <Image source={require("../../assets/images/LogoBayerEats.png")} style={styles.logoTitle}/>
        <Text style={styles.headerTitle}> BayerFoods </Text>
        </View>
        <View style={styles.navButtons}>
          <TouchableOpacity onPress={onGoToAdmin} style={styles.adminButton}>
            <Text style={styles.adminButtonText}>Admin</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onGoToCart} style={styles.cartButton}>
            <Text style={styles.cartIcon}>🛒</Text>
            {cart.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Chips de categoria */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => onCategoryChange(category.id)}
            style={[
              styles.categoryChip,
              activeCategory === category.id && styles.categoryChipActive,
            ]}
          >
            <Text
              style={[
                styles.categoryChipText,
                activeCategory === category.id && styles.categoryChipTextActive,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Lista de produtos */}
      <FlatList
        data={products.filter((p) => p.category === activeCategory)}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productDescription} numberOfLines={2}>
                {item.description}
              </Text>
              <View style={styles.productFooter}>
                <Text style={styles.productPrice}>
                  R$ {item.price.toFixed(2)}
                </Text>
                <TouchableOpacity
                  onPress={() => onAddToCart(item)}
                  style={styles.addButton}
                >
                  <Text style={styles.addButtonText}>Adicionar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={[
          styles.productsContainer,
          { paddingBottom: insets.bottom + 16 }
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  logoTitle:{
    width:45,
    height:30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffffff",
    marginLeft: -25,
  },
  logoCountainer:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: "#da8210ff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  
  navButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  adminButton: {
    backgroundColor: "#a54501ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  adminButtonText: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "500",
  },
  cartButton: {
    position: "relative",
    marginLeft: 12,
    padding: 6,
  },
  cartIcon: {
    fontSize: 26,
    color: "#1F2937", 
  },
  cartBadge: {
    position: "absolute",
    top: -4,
    right: -6,
    backgroundColor: "#EF4444",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  cartBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  categoriesContainer: {
    paddingHorizontal: 16
    ,
    paddingVertical: 12,
  },
  categoryChip: {
    borderRadius: 20,
    height:40,
    backgroundColor: "#ea8603ff",
    marginRight: 10,
    paddingRight:5,
    paddingLeft:5,
  },
  categoryChipActive: {
    backgroundColor: "#d16003ff",
  },
  categoryChipText: {
    color: "#FFF",
    fontWeight: "500",
    fontSize: 16,
    margin:8,
  },
  categoryChipTextActive: {
    color: "#FFFFFF",
  },
  productsContainer: {
    paddingHorizontal: 8,
  },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  productImage: {
    width: "100%",
    height: 140,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
  },
  productDescription: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
    height: 30,
  },
  productFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#16A34A",
  },
  addButton: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },
});