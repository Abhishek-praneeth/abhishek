import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';
import { Minus, Plus, Heart } from 'lucide-react-native';
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import { products } from '../../../data/mockData';
import { addToCart } from '../../../utils/cart';
import { formatCurrency } from '../../../utils/format';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(false);
  const router = useRouter();
  
  if (!product) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Product not found</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const toggleFavorite = () => {
    setFavorite(prev => !prev);
  };

  const handleAddToCart = async () => {
    await addToCart(product, quantity);
    // In a real app, you would update cart state and show a confirmation
    router.push('/(tabs)/cart');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header title="" showBackButton showCartButton />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="cover"
          />
          
          <TouchableOpacity
            style={[styles.favoriteButton, favorite && styles.favoriteActive]}
            onPress={toggleFavorite}
          >
            <Heart
              size={20}
              color={favorite ? Colors.error.default : Colors.neutral[600]}
              fill={favorite ? Colors.error.default : 'none'}
            />
          </TouchableOpacity>
        </View>
        
        <Animated.View
          entering={FadeIn.duration(500)}
          style={styles.contentContainer}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.weight}>{product.weight}</Text>
          </View>
          
          <Text style={styles.price}>{formatCurrency(product.price)}</Text>
          
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>
          
          {product.nutritionalInfo && (
            <Animated.View
              entering={SlideInRight.delay(200).duration(500)}
              style={styles.nutritionContainer}
            >
              <Text style={styles.sectionTitle}>Nutritional Information</Text>
              <View style={styles.nutritionContent}>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionLabel}>Calories</Text>
                  <Text style={styles.nutritionValue}>{product.nutritionalInfo.calories}</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionLabel}>Protein</Text>
                  <Text style={styles.nutritionValue}>{product.nutritionalInfo.protein}</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionLabel}>Fat</Text>
                  <Text style={styles.nutritionValue}>{product.nutritionalInfo.fat}</Text>
                </View>
              </View>
            </Animated.View>
          )}
          
          {product.preparationTips && (
            <Animated.View
              entering={SlideInRight.delay(400).duration(500)}
              style={styles.tipsContainer}
            >
              <Text style={styles.sectionTitle}>Preparation Tips</Text>
              {product.preparationTips.map((tip, index) => (
                <View key={index} style={styles.tipItem}>
                  <Text style={styles.tipNumber}>{index + 1}</Text>
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </Animated.View>
          )}
        </Animated.View>
      </ScrollView>
      
      <View style={styles.footer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={decrementQuantity}
            disabled={quantity <= 1}
          >
            <Minus
              size={20}
              color={quantity <= 1 ? Colors.neutral[400] : Colors.text.primary}
            />
          </TouchableOpacity>
          
          <Text style={styles.quantity}>{quantity}</Text>
          
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={incrementQuantity}
          >
            <Plus size={20} color={Colors.text.primary} />
          </TouchableOpacity>
        </View>
        
        <Button
          title="Add to Cart"
          onPress={handleAddToCart}
          variant="primary"
          style={styles.addButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.xl,
  },
  notFoundText: {
    fontSize: Layout.fontSize.l,
    color: Colors.text.secondary,
    marginBottom: Layout.spacing.l,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: Layout.spacing.m,
    right: Layout.spacing.m,
    backgroundColor: Colors.background.primary,
    width: 40,
    height: 40,
    borderRadius: Layout.borderRadius.circular,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  favoriteActive: {
    backgroundColor: Colors.background.primary,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingHorizontal: Layout.spacing.l,
    paddingTop: Layout.spacing.l,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.s,
  },
  title: {
    fontSize: Layout.fontSize.xl,
    fontWeight: '700',
    color: Colors.text.primary,
    flex: 1,
  },
  weight: {
    fontSize: Layout.fontSize.s,
    color: Colors.text.tertiary,
    marginLeft: Layout.spacing.s,
  },
  price: {
    fontSize: Layout.fontSize.xl,
    fontWeight: '700',
    color: Colors.primary.default,
    marginBottom: Layout.spacing.l,
  },
  descriptionContainer: {
    marginBottom: Layout.spacing.l,
  },
  sectionTitle: {
    fontSize: Layout.fontSize.l,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Layout.spacing.s,
  },
  description: {
    fontSize: Layout.fontSize.m,
    lineHeight: 24,
    color: Colors.text.secondary,
  },
  nutritionContainer: {
    marginBottom: Layout.spacing.l,
  },
  nutritionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
    padding: Layout.spacing.m,
    borderRadius: Layout.borderRadius.m,
    marginRight: Layout.spacing.s,
  },
  nutritionLabel: {
    fontSize: Layout.fontSize.s,
    color: Colors.text.tertiary,
    marginBottom: Layout.spacing.xs,
  },
  nutritionValue: {
    fontSize: Layout.fontSize.m,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  tipsContainer: {
    marginBottom: Layout.spacing.l,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.m,
  },
  tipNumber: {
    width: 24,
    height: 24,
    borderRadius: Layout.borderRadius.circular,
    backgroundColor: Colors.primary.default,
    color: Colors.text.inverse,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '700',
    marginRight: Layout.spacing.s,
  },
  tipText: {
    flex: 1,
    fontSize: Layout.fontSize.m,
    color: Colors.text.secondary,
    lineHeight: 24,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
    paddingHorizontal: Layout.spacing.l,
    paddingVertical: Layout.spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: Layout.borderRadius.m,
    marginRight: Layout.spacing.m,
  },
  quantityButton: {
    padding: Layout.spacing.m,
  },
  quantity: {
    fontSize: Layout.fontSize.m,
    fontWeight: '600',
    color: Colors.text.primary,
    minWidth: 30,
    textAlign: 'center',
  },
  addButton: {
    flex: 1,
  },
});