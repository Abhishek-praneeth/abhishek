import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { CircleMinus as MinusCircle, CirclePlus as PlusCircle, Trash2 } from 'lucide-react-native';
import { CartItem as CartItemType } from '../types';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { formatCurrency } from '../utils/format';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const { product, quantity } = item;
  const [isRemoving, setIsRemoving] = useState(false);

  const handleIncrement = () => {
    onUpdateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onUpdateQuantity(product.id, quantity - 1);
    }
  };

  const handleRemove = () => {
    setIsRemoving(true);
    onRemove(product.id);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      
      <View style={styles.details}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{formatCurrency(product.price)}</Text>
        <Text style={styles.weight}>{product.weight}</Text>
      </View>
      
      <View style={styles.actions}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={handleDecrement}
            disabled={quantity <= 1}
            style={quantity <= 1 ? styles.disabledButton : {}}
          >
            <MinusCircle
              size={20}
              color={quantity <= 1 ? Colors.neutral[400] : Colors.primary.default}
            />
          </TouchableOpacity>
          
          <Text style={styles.quantity}>{quantity}</Text>
          
          <TouchableOpacity onPress={handleIncrement}>
            <PlusCircle size={20} color={Colors.primary.default} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          onPress={handleRemove}
          style={styles.removeButton}
          disabled={isRemoving}
        >
          <Trash2 size={18} color={Colors.error.default} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.background.primary,
    borderRadius: Layout.borderRadius.m,
    padding: Layout.spacing.m,
    marginBottom: Layout.spacing.m,
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: Layout.borderRadius.s,
  },
  details: {
    flex: 1,
    marginLeft: Layout.spacing.m,
    justifyContent: 'center',
  },
  name: {
    fontSize: Layout.fontSize.m,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Layout.spacing.xs,
  },
  price: {
    fontSize: Layout.fontSize.s,
    fontWeight: '700',
    color: Colors.primary.default,
    marginBottom: Layout.spacing.xs,
  },
  weight: {
    fontSize: Layout.fontSize.xs,
    color: Colors.text.tertiary,
  },
  actions: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    marginHorizontal: Layout.spacing.s,
    fontSize: Layout.fontSize.m,
    fontWeight: '600',
    color: Colors.text.primary,
    minWidth: 25,
    textAlign: 'center',
  },
  removeButton: {
    marginTop: Layout.spacing.m,
  },
  disabledButton: {
    opacity: 0.5,
  },
});