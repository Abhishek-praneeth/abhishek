import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Stack } from 'expo-router';
import { Award, Check, Leaf, Clock } from 'lucide-react-native';
import Header from '../components/Header';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

export default function FarmInfoScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header title="About Our Farm" showBackButton />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Image
          source={{ uri: 'https://images.pexels.com/photos/2043739/pexels-photo-2043739.jpeg' }}
          style={styles.heroImage}
        />
        
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Our Story</Text>
          <Text style={styles.paragraph}>
            Founded in 2010, our family-owned poultry farm is dedicated to providing the highest quality chicken 
            products while maintaining ethical and sustainable farming practices. Located in the beautiful 
            countryside, our chickens are raised in spacious environments with access to outdoor areas.
          </Text>
          
          <Text style={styles.title}>Our Commitment</Text>
          <View style={styles.commitmentItem}>
            <View style={styles.commitmentIcon}>
              <Award size={24} color={Colors.primary.default} />
            </View>
            <View style={styles.commitmentContent}>
              <Text style={styles.commitmentTitle}>Premium Quality</Text>
              <Text style={styles.commitmentDescription}>
                We raise our chickens with care, ensuring they grow healthy and produce meat of the highest quality.
              </Text>
            </View>
          </View>
          
          <View style={styles.commitmentItem}>
            <View style={styles.commitmentIcon}>
              <Leaf size={24} color={Colors.accent.default} />
            </View>
            <View style={styles.commitmentContent}>
              <Text style={styles.commitmentTitle}>Sustainable Practices</Text>
              <Text style={styles.commitmentDescription}>
                Our farm employs sustainable practices, including waste management systems and renewable energy sources.
              </Text>
            </View>
          </View>
          
          <View style={styles.commitmentItem}>
            <View style={styles.commitmentIcon}>
              <Clock size={24} color={Colors.secondary.default} />
            </View>
            <View style={styles.commitmentContent}>
              <Text style={styles.commitmentTitle}>Fresh Delivery</Text>
              <Text style={styles.commitmentDescription}>
                We guarantee freshness through our efficient processing and delivery system, ensuring you receive products at their peak quality.
              </Text>
            </View>
          </View>
          
          <Text style={styles.title}>Our Raising Methods</Text>
          <View style={styles.methodsContainer}>
            <View style={styles.methodItem}>
              <Check size={16} color={Colors.primary.default} />
              <Text style={styles.methodText}>No antibiotics or growth hormones</Text>
            </View>
            <View style={styles.methodItem}>
              <Check size={16} color={Colors.primary.default} />
              <Text style={styles.methodText}>Natural feed composed of grains and vegetables</Text>
            </View>
            <View style={styles.methodItem}>
              <Check size={16} color={Colors.primary.default} />
              <Text style={styles.methodText}>Spacious coops with proper ventilation</Text>
            </View>
            <View style={styles.methodItem}>
              <Check size={16} color={Colors.primary.default} />
              <Text style={styles.methodText}>Access to outdoor areas for free-range movement</Text>
            </View>
            <View style={styles.methodItem}>
              <Check size={16} color={Colors.primary.default} />
              <Text style={styles.methodText}>Regular veterinary check-ups to ensure health</Text>
            </View>
          </View>
          
          <Text style={styles.title}>Quality Control</Text>
          <Text style={styles.paragraph}>
            Every batch of our chicken products undergoes rigorous quality control measures. Our processing 
            facility adheres to strict hygiene standards, and all products are inspected to ensure they meet 
            our high-quality benchmarks before reaching your table.
          </Text>
          
          <Image
            source={{ uri: 'https://images.pexels.com/photos/1772973/pexels-photo-1772973.jpeg' }}
            style={styles.secondaryImage}
          />
          
          <Text style={styles.title}>Our Community</Text>
          <Text style={styles.paragraph}>
            We're proud to be part of the local community and contribute to the rural economy. Our farm 
            employs local workers and partners with nearby businesses. We also regularly participate in 
            farmers' markets and educational programs to share our knowledge and passion for sustainable 
            poultry farming.
          </Text>
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
    paddingBottom: Layout.spacing.xxl,
  },
  heroImage: {
    width: '100%',
    height: 250,
  },
  contentContainer: {
    padding: Layout.spacing.l,
  },
  title: {
    fontSize: Layout.fontSize.xl,
    fontWeight: '700',
    color: Colors.text.primary,
    marginTop: Layout.spacing.l,
    marginBottom: Layout.spacing.m,
  },
  paragraph: {
    fontSize: Layout.fontSize.m,
    lineHeight: 24,
    color: Colors.text.secondary,
    marginBottom: Layout.spacing.l,
  },
  commitmentItem: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.l,
  },
  commitmentIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.m,
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  commitmentContent: {
    flex: 1,
  },
  commitmentTitle: {
    fontSize: Layout.fontSize.l,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Layout.spacing.xs,
  },
  commitmentDescription: {
    fontSize: Layout.fontSize.m,
    color: Colors.text.secondary,
    lineHeight: 22,
  },
  methodsContainer: {
    backgroundColor: Colors.background.primary,
    borderRadius: Layout.borderRadius.m,
    padding: Layout.spacing.l,
    marginBottom: Layout.spacing.l,
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  methodText: {
    fontSize: Layout.fontSize.m,
    color: Colors.text.primary,
    marginLeft: Layout.spacing.m,
  },
  secondaryImage: {
    width: '100%',
    height: 200,
    borderRadius: Layout.borderRadius.m,
    marginBottom: Layout.spacing.l,
  },
});