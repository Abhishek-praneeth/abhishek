import { CartItem, Product } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_STORAGE_KEY = '@PoultryFarm:cart';

export const getCart = async (): Promise<CartItem[]> => {
  try {
    const cartData = await AsyncStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error('Error getting cart:', error);
    return [];
  }
};

export const saveCart = async (cart: CartItem[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart:', error);
  }
};

export const addToCart = async (product: Product, quantity: number = 1): Promise<CartItem[]> => {
  try {
    const currentCart = await getCart();
    const existingItemIndex = currentCart.findIndex(item => item.product.id === product.id);
    
    if (existingItemIndex !== -1) {
      // Update existing item quantity
      currentCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      currentCart.push({ product, quantity });
    }
    
    await saveCart(currentCart);
    return currentCart;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return [];
  }
};

export const updateCartItemQuantity = async (productId: string, quantity: number): Promise<CartItem[]> => {
  try {
    const currentCart = await getCart();
    const itemIndex = currentCart.findIndex(item => item.product.id === productId);
    
    if (itemIndex !== -1) {
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        currentCart.splice(itemIndex, 1);
      } else {
        // Update quantity
        currentCart[itemIndex].quantity = quantity;
      }
      
      await saveCart(currentCart);
    }
    
    return currentCart;
  } catch (error) {
    console.error('Error updating cart item:', error);
    return [];
  }
};

export const removeFromCart = async (productId: string): Promise<CartItem[]> => {
  try {
    const currentCart = await getCart();
    const updatedCart = currentCart.filter(item => item.product.id !== productId);
    await saveCart(updatedCart);
    return updatedCart;
  } catch (error) {
    console.error('Error removing from cart:', error);
    return [];
  }
};

export const clearCart = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing cart:', error);
  }
};

export const calculateCartTotal = (cart: CartItem[]): number => {
  return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
};