import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import CategoryCard from '../../components/CategoryCard';
import { products, categories } from '../../data/mockData';
import { Product } from '../../types';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { addToCart } from '../../utils/cart';

export default function ProductsScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  
  useEffect(() => {
    if (selectedCategory) {
      const filtered = products.filter(product => product.category === selectedCategory);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory]);

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(prevCategory => 
      prevCategory === categoryId ? null : categoryId
    );
  };

  const handleAddToCart = async (product: Product) => {
    await addToCart(product, 1);
    // In a real app, you would update cart state and show a confirmation
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Our Products"
        showCartButton
        cartItemCount={3} // This would be dynamic in a real app
      />
      
      <View style={styles.categoriesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScrollContent}
        >
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.id}
              onPress={() => handleCategoryPress(category.id)}
              index={index}
            />
          ))}
        </ScrollView>
      </View>
      
      <View style={styles.productsContainer}>
        {filteredProducts.length > 0 ? (
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.productsListContent}
            renderItem={({ item, index }) => (
              <ProductCard
                product={item}
                onAddToCart={() => handleAddToCart(item)}
                index={index}
              />
            )}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products found in this category</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  categoriesContainer: {
    backgroundColor: Colors.background.primary,
    paddingVertical: Layout.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  categoriesScrollContent: {
    paddingHorizontal: Layout.spacing.m,
  },
  productsContainer: {
    flex: 1,
    paddingTop: Layout.spacing.m,
  },
  productsListContent: {
    paddingHorizontal: Layout.spacing.s,
    paddingBottom: Layout.spacing.xl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.xl,
  },
  emptyText: {
    fontSize: Layout.fontSize.m,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
});