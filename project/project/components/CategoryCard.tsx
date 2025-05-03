import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Category } from '../types';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { Drumstick, Scissors, Leaf, Maximize, FlaskRound as Flask } from 'lucide-react-native';

interface CategoryCardProps {
  category: Category;
  isSelected: boolean;
  onPress: () => void;
  index: number;
}

export default function CategoryCard({ category, isSelected, onPress, index }: CategoryCardProps) {
  const getIcon = () => {
    const color = isSelected ? Colors.text.inverse : Colors.primary.default;
    const size = 20;
    
    switch (category.icon) {
      case 'drumstick':
        return <Drumstick size={size} color={color} />;
      case 'scissors':
        return <Scissors size={size} color={color} />;
      case 'leaf':
        return <Leaf size={size} color={color} />;
      case 'maximize':
        return <Maximize size={size} color={color} />;
      case 'flask':
        return <Flask size={size} color={color} />;
      default:
        return <Drumstick size={size} color={color} />;
    }
  };

  return (
    <Animated.View entering={FadeIn.delay(index * 100)}>
      <TouchableOpacity
        style={[
          styles.container,
          isSelected ? styles.selectedContainer : {},
        ]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {getIcon()}
        <Text
          style={[
            styles.text,
            isSelected ? styles.selectedText : {},
          ]}
        >
          {category.name}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.primary,
    paddingVertical: Layout.spacing.s,
    paddingHorizontal: Layout.spacing.m,
    borderRadius: Layout.borderRadius.l,
    marginRight: Layout.spacing.m,
    borderWidth: 1,
    borderColor: Colors.neutral[300],
  },
  selectedContainer: {
    backgroundColor: Colors.primary.default,
    borderColor: Colors.primary.default,
  },
  text: {
    marginLeft: Layout.spacing.s,
    fontSize: Layout.fontSize.s,
    fontWeight: '500',
    color: Colors.text.primary,
  },
  selectedText: {
    color: Colors.text.inverse,
  },
});