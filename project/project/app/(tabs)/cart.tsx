import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Header from '../../components/Header';
import Button from '../../components/Button';
import CartItem from '../../components/CartItem';
import { getCart, updateCartItemQuantity, removeFromCart, clearCart, calculateCartTotal } from '../../utils/cart';
import { CartItem as CartItemType } from '../../types';
import { formatCurrency } from '../../utils/format';

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    setLoading(true);
    const items = await getCart();
    setCartItems(items);
    setLoading(false);
  };

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    const updatedCart = await updateCartItemQuantity(productId, quantity);
    setCartItems(updatedCart);
  };

  const handleRemoveItem = async (productId: string) => {
    const updatedCart = await removeFromCart(productId);
    setCartItems(updatedCart);
  };

  const handleContinueShopping = () => {
    router.push('/(tabs)/products');
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    // Simulate checkout process
    setTimeout(() => {
      setIsProcessing(false);
      
      // In a real app, this would navigate to a checkout success screen
      // after processing payment and creating an order
      Alert.alert(
        "Order Placed Successfully",
        "Thank you for your order! You can track your order status in the account section.",
        [
          { 
            text: "OK", 
            onPress: async () => {
              await clearCart();
              setCartItems([]);
              router.push('/(tabs)/index');
            }
          }
        ]
      );
    }, 1500);
  };

  const subtotal = calculateCartTotal(cartItems);
  const deliveryFee = subtotal > 0 ? 3.99 : 0;
  const total = subtotal + deliveryFee;

  return (
    <View style={styles.container}>
      <Header title="Your Cart" showBackButton />
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading your cart...</Text>
        </View>
      ) : cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyMessage}>
            Browse our products and add items to your cart
          </Text>
          <Button
            title="Continue Shopping"
            onPress={handleContinueShopping}
            variant="primary"
            style={styles.continueButton}
          />
        </View>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <Text style={styles.sectionTitle}>Cart Items</Text>
            
            {cartItems.map((item, index) => (
              <Animated.View
                key={item.product.id}
                entering={FadeIn.delay(index * 100)}
              >
                <CartItem
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              </Animated.View>
            ))}
            
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}>Order Summary</Text>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>{formatCurrency(subtotal)}</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery Fee</Text>
                <Text style={styles.summaryValue}>{formatCurrency(deliveryFee)}</Text>
              </View>
              
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
              </View>
            </View>
          </ScrollView>
          
          <View style={styles.footer}>
            <Button
              title="Continue Shopping"
              onPress={handleContinueShopping}
              variant="outline"
              style={styles.footerButton}
            />
            <Button
              title="Checkout"
              onPress={handleCheckout}
              variant="primary"
              loading={isProcessing}
              style={styles.footerButton}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: Layout.fontSize.m,
    color: Colors.text.secondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.xl,
  },
  emptyTitle: {
    fontSize: Layout.fontSize.xl,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Layout.spacing.m,
  },
  emptyMessage: {
    fontSize: Layout.fontSize.m,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Layout.spacing.xl,
  },
  continueButton: {
    minWidth: 200,
  },
  scrollContent: {
    padding: Layout.spacing.m,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: Layout.fontSize.l,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Layout.spacing.m,
  },
  summaryContainer: {
    backgroundColor: Colors.background.primary,
    borderRadius: Layout.borderRadius.m,
    padding: Layout.spacing.l,
    marginTop: Layout.spacing.l,
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: Layout.fontSize.l,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Layout.spacing.m,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.m,
  },
  summaryLabel: {
    fontSize: Layout.fontSize.m,
    color: Colors.text.secondary,
  },
  summaryValue: {
    fontSize: Layout.fontSize.m,
    color: Colors.text.primary,
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[300],
    paddingTop: Layout.spacing.m,
    marginTop: Layout.spacing.m,
  },
  totalLabel: {
    fontSize: Layout.fontSize.l,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  totalValue: {
    fontSize: Layout.fontSize.l,
    fontWeight: '700',
    color: Colors.primary.default,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
    padding: Layout.spacing.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerButton: {
    flex: 1,
    marginHorizontal: Layout.spacing.xs,
  },
});