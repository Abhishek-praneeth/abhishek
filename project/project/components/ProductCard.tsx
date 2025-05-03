import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ShoppingCart } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Product } from '../types';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { formatCurrency } from '../utils/format';

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
  index?: number;
}

export default function ProductCard({ product, onAddToCart, index = 0 }: ProductCardProps) {
  const router = useRouter();
  
  const handlePress = () => {
    router.push(`/(tabs)/products/${product.id}`);
  };
  
  const handleAddToCart = (e: any) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart();
    }
  };

  return (
    <Animated.View 
      entering={FadeIn.delay(index * 100)}
      style={styles.container}
    >
      <TouchableOpacity
        style={styles.card}
        onPress={handlePress}
        activeOpacity={0.9}
      >
        {product.featured && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
        
        <Image 
          source={{ uri: product.image }} 
          style={styles.image}
          resizeMode="cover"
        />
        
        <View style={styles.contentContainer}>
          <Text style={styles.title} numberOfLines={1}>{product.name}</Text>
          <Text style={styles.description} numberOfLines={2}>{product.description}</Text>
          
          <View style={styles.footer}>
            <Text style={styles.price}>{formatCurrency(product.price)}</Text>
            <Text style={styles.weight}>{product.weight}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddToCart}
          >
            <ShoppingCart size={16} color={Colors.text.inverse} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: Layout.spacing.s,
    width: Layout.window.width / 2 - Layout.spacing.l,
  },
  card: {
    backgroundColor: Colors.background.primary,
    borderRadius: Layout.borderRadius.m,
    overflow: 'hidden',
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150,
  },
  contentContainer: {
    padding: Layout.spacing.m,
  },
  title: {
    fontSize: Layout.fontSize.m,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Layout.spacing.xs,
  },
  description: {
    fontSize: Layout.fontSize.s,
    color: Colors.text.secondary,
    marginBottom: Layout.spacing.s,
    height: 40,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: Layout.fontSize.m,
    fontWeight: '700',
    color: Colors.primary.default,
  },
  weight: {
    fontSize: Layout.fontSize.xs,
    color: Colors.text.tertiary,
  },
  addButton: {
    position: 'absolute',
    bottom: Layout.spacing.m,
    right: Layout.spacing.m,
    backgroundColor: Colors.primary.default,
    borderRadius: Layout.borderRadius.circular,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredBadge: {
    position: 'absolute',
    top: Layout.spacing.s,
    left: Layout.spacing.s,
    backgroundColor: Colors.accent.default,
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.s,
    zIndex: 1,
  },
  featuredText: {
    color: Colors.text.inverse,
    fontSize: Layout.fontSize.xs,
    fontWeight: '600',
  },
});