import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { Promotion } from '../types';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

interface PromotionCardProps {
  promotion: Promotion;
  index: number;
  onPress: (promotion: Promotion) => void;
}

export default function PromotionCard({ promotion, index, onPress }: PromotionCardProps) {
  const handlePress = () => {
    onPress(promotion);
  };

  return (
    <Animated.View
      entering={FadeInRight.delay(index * 200).duration(500)}
      style={styles.container}
    >
      <TouchableOpacity
        style={styles.card}
        onPress={handlePress}
        activeOpacity={0.9}
      >
        <ImageBackground
          source={{ uri: promotion.image }}
          style={styles.background}
          imageStyle={styles.image}
        >
          <View style={styles.overlay}>
            <View style={styles.content}>
              {promotion.discountPercentage && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{promotion.discountPercentage}% OFF</Text>
                </View>
              )}
              <Text style={styles.title}>{promotion.title}</Text>
              <Text style={styles.description}>{promotion.description}</Text>
              <Text style={styles.validUntil}>Valid until {new Date(promotion.validUntil).toLocaleDateString()}</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: Layout.spacing.m,
    width: 280,
    height: 180,
  },
  card: {
    borderRadius: Layout.borderRadius.m,
    overflow: 'hidden',
    flex: 1,
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  image: {
    borderRadius: Layout.borderRadius.m,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: Layout.spacing.m,
    justifyContent: 'flex-end',
  },
  content: {
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: Layout.fontSize.l,
    fontWeight: '700',
    color: Colors.text.inverse,
    marginBottom: Layout.spacing.xs,
  },
  description: {
    fontSize: Layout.fontSize.s,
    color: Colors.neutral[100],
    marginBottom: Layout.spacing.s,
  },
  validUntil: {
    fontSize: Layout.fontSize.xs,
    color: Colors.neutral[300],
  },
  discountBadge: {
    backgroundColor: Colors.primary.default,
    alignSelf: 'flex-start',
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.s,
    marginBottom: Layout.spacing.s,
  },
  discountText: {
    color: Colors.text.inverse,
    fontSize: Layout.fontSize.xs,
    fontWeight: '700',
  },
});