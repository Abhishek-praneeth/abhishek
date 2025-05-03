import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Search, ChevronRight } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import PromotionCard from '../../components/PromotionCard';
import { products, promotions } from '../../data/mockData';
import { Product, Promotion } from '../../types';
import { addToCart } from '../../utils/cart';

export default function HomeScreen() {
  const router = useRouter();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Filter featured products
    const featured = products.filter(product => product.featured);
    setFeaturedProducts(featured);
  }, []);

  const handleAddToCart = async (product: Product) => {
    await addToCart(product, 1);
    // In a real app, you would update cart state and show a confirmation
  };

  const handlePromotionPress = (promotion: Promotion) => {
    // Navigate to promotion details or apply promotion
    console.log('Promotion pressed:', promotion.title);
  };

  const navigateToAllProducts = () => {
    router.push('/(tabs)/products');
  };

  const navigateToFarm = () => {
    router.push('/farm-info');
  };

  return (
    <View style={styles.container}>
      <Header
        title="Fresh Poultry"
        showCartButton
        cartItemCount={3} // This would be dynamic in a real app
      />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/162712/egg-chicken-eggs-hen-162712.jpeg' }}
            style={styles.heroImage}
          />
          <View style={styles.heroContent}>
            <Animated.Text 
              entering={FadeInDown.duration(600).delay(300)}
              style={styles.heroTitle}
            >
              Farm Fresh Chicken
            </Animated.Text>
            <Animated.Text 
              entering={FadeInDown.duration(600).delay(400)}
              style={styles.heroSubtitle}
            >
              Direct from our farm to your table
            </Animated.Text>
            <Animated.View entering={FadeInDown.duration(600).delay(500)}>
              <TouchableOpacity
                style={styles.heroButton}
                onPress={navigateToAllProducts}
              >
                <Text style={styles.heroButtonText}>Shop Now</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
        
        {/* Promotions */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Special Offers</Text>
          </View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.promotionsContainer}
          >
            {promotions.map((promotion, index) => (
              <PromotionCard
                key={promotion.id}
                promotion={promotion}
                index={index}
                onPress={handlePromotionPress}
              />
            ))}
          </ScrollView>
        </View>
        
        {/* Featured Products */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <TouchableOpacity onPress={navigateToAllProducts}>
              <View style={styles.viewAllContainer}>
                <Text style={styles.viewAllText}>View All</Text>
                <ChevronRight size={16} color={Colors.primary.default} />
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={styles.productsGrid}>
            {featuredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => handleAddToCart(product)}
                index={index}
              />
            ))}
          </View>
        </View>
        
        {/* About Our Farm */}
        <View style={styles.farmContainer}>
          <Text style={styles.farmTitle}>About Our Farm</Text>
          <Text style={styles.farmDescription}>
            Our chickens are raised in spacious, clean environments with access to natural light and fresh air.
            We never use antibiotics or growth hormones, and our birds are fed a natural, balanced diet.
          </Text>
          <TouchableOpacity
            style={styles.learnMoreButton}
            onPress={navigateToFarm}
          >
            <Text style={styles.learnMoreText}>Learn More</Text>
            <ChevronRight size={16} color={Colors.primary.default} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  scrollContent: {
    paddingBottom: Layout.spacing.xl,
  },
  heroContainer: {
    position: 'relative',
    height: 300,
    width: '100%',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Layout.spacing.l,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  heroTitle: {
    fontSize: Layout.fontSize.xxl,
    fontWeight: '700',
    color: Colors.text.inverse,
    marginBottom: Layout.spacing.xs,
  },
  heroSubtitle: {
    fontSize: Layout.fontSize.m,
    color: Colors.neutral[200],
    marginBottom: Layout.spacing.m,
  },
  heroButton: {
    backgroundColor: Colors.primary.default,
    paddingVertical: Layout.spacing.s,
    paddingHorizontal: Layout.spacing.l,
    borderRadius: Layout.borderRadius.m,
    alignSelf: 'flex-start',
  },
  heroButtonText: {
    color: Colors.text.inverse,
    fontWeight: '600',
    fontSize: Layout.fontSize.m,
  },
  sectionContainer: {
    marginTop: Layout.spacing.l,
    paddingHorizontal: Layout.spacing.m,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  sectionTitle: {
    fontSize: Layout.fontSize.l,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  viewAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: Layout.fontSize.s,
    color: Colors.primary.default,
    fontWeight: '600',
  },
  promotionsContainer: {
    paddingLeft: Layout.spacing.m,
    paddingRight: Layout.spacing.s,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -Layout.spacing.s,
  },
  farmContainer: {
    marginTop: Layout.spacing.xl,
    marginHorizontal: Layout.spacing.m,
    padding: Layout.spacing.l,
    backgroundColor: Colors.background.primary,
    borderRadius: Layout.borderRadius.m,
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  farmTitle: {
    fontSize: Layout.fontSize.l,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: Layout.spacing.m,
  },
  farmDescription: {
    fontSize: Layout.fontSize.m,
    color: Colors.text.secondary,
    marginBottom: Layout.spacing.m,
    lineHeight: 22,
  },
  learnMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  learnMoreText: {
    fontSize: Layout.fontSize.m,
    color: Colors.primary.default,
    fontWeight: '600',
  },
});