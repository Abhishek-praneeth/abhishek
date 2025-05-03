import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { ArrowLeft, ShoppingCart, Menu } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showCartButton?: boolean;
  showMenuButton?: boolean;
  cartItemCount?: number;
  onMenuPress?: () => void;
  transparent?: boolean;
}

export default function Header({
  title,
  showBackButton = false,
  showCartButton = false,
  showMenuButton = false,
  cartItemCount = 0,
  onMenuPress,
  transparent = false,
}: HeaderProps) {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const goToCart = () => {
    router.push('/(tabs)/cart');
  };

  return (
    <View style={[
      styles.container,
      transparent ? styles.transparentContainer : {},
      Platform.OS === 'ios' ? styles.iosContainer : {}
    ]}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity onPress={goBack} style={styles.buttonContainer}>
            <ArrowLeft size={24} color={transparent ? Colors.text.inverse : Colors.text.primary} />
          </TouchableOpacity>
        )}
        {showMenuButton && (
          <TouchableOpacity onPress={onMenuPress} style={styles.buttonContainer}>
            <Menu size={24} color={transparent ? Colors.text.inverse : Colors.text.primary} />
          </TouchableOpacity>
        )}
      </View>

      <Text style={[
        styles.title,
        transparent ? styles.transparentTitle : {}
      ]}>
        {title}
      </Text>

      <View style={styles.rightContainer}>
        {showCartButton && (
          <TouchableOpacity onPress={goToCart} style={styles.buttonContainer}>
            <ShoppingCart size={24} color={transparent ? Colors.text.inverse : Colors.text.primary} />
            {cartItemCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.m,
    backgroundColor: Colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  transparentContainer: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  iosContainer: {
    paddingTop: 50,
  },
  leftContainer: {
    flexDirection: 'row',
    width: 60,
  },
  rightContainer: {
    flexDirection: 'row',
    width: 60,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: Layout.fontSize.l,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  transparentTitle: {
    color: Colors.text.inverse,
  },
  buttonContainer: {
    padding: Layout.spacing.xs,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: Colors.primary.default,
    borderRadius: Layout.borderRadius.circular,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: Colors.text.inverse,
    fontSize: 10,
    fontWeight: '700',
  },
});