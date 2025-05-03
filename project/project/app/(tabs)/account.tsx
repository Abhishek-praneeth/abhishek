import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { User, Settings, ShoppingBag, CreditCard, Bell, LogOut, ChevronRight } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { useRouter } from 'expo-router';

export default function AccountScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const router = useRouter();
  
  // Mock user data - in a real app, this would come from authentication state
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    isLoggedIn: true,
  };
  
  const toggleNotifications = () => {
    setNotificationsEnabled(previous => !previous);
  };
  
  const navigateToOrders = () => {
    // Navigate to orders page
  };
  
  const navigateToAddresses = () => {
    // Navigate to addresses page
  };
  
  const navigateToPaymentMethods = () => {
    // Navigate to payment methods page
  };
  
  const navigateToFarmInfo = () => {
    router.push('/farm-info');
  };
  
  const handleLogout = () => {
    // Handle logout
  };
  
  const handleLogin = () => {
    // Navigate to login page
  };

  return (
    <View style={styles.container}>
      <Header title="Account" />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {user.isLoggedIn ? (
          <>
            <View style={styles.profileContainer}>
              <View style={styles.avatarContainer}>
                <User size={40} color={Colors.neutral[600]} />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
              </View>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Orders</Text>
              
              <TouchableOpacity
                style={styles.menuItem}
                onPress={navigateToOrders}
              >
                <ShoppingBag size={20} color={Colors.primary.default} />
                <Text style={styles.menuItemText}>Order History</Text>
                <ChevronRight size={20} color={Colors.neutral[400]} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Account Settings</Text>
              
              <TouchableOpacity
                style={styles.menuItem}
                onPress={navigateToAddresses}
              >
                <User size={20} color={Colors.primary.default} />
                <Text style={styles.menuItemText}>My Addresses</Text>
                <ChevronRight size={20} color={Colors.neutral[400]} />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.menuItem}
                onPress={navigateToPaymentMethods}
              >
                <CreditCard size={20} color={Colors.primary.default} />
                <Text style={styles.menuItemText}>Payment Methods</Text>
                <ChevronRight size={20} color={Colors.neutral[400]} />
              </TouchableOpacity>
              
              <View style={styles.menuItem}>
                <Bell size={20} color={Colors.primary.default} />
                <Text style={styles.menuItemText}>Notifications</Text>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={toggleNotifications}
                  trackColor={{ false: Colors.neutral[300], true: Colors.primary.light }}
                  thumbColor={notificationsEnabled ? Colors.primary.default : Colors.neutral[100]}
                />
              </View>
            </View>
            
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>About</Text>
              
              <TouchableOpacity
                style={styles.menuItem}
                onPress={navigateToFarmInfo}
              >
                <Settings size={20} color={Colors.primary.default} />
                <Text style={styles.menuItemText}>About Our Farm</Text>
                <ChevronRight size={20} color={Colors.neutral[400]} />
              </TouchableOpacity>
            </View>
            
            <Button
              title="Log Out"
              onPress={handleLogout}
              variant="outline"
              style={styles.logoutButton}
              icon={<LogOut size={18} color={Colors.primary.default} />}
            />
          </>
        ) : (
          <View style={styles.authContainer}>
            <Text style={styles.authTitle}>Welcome to Poultry Farm</Text>
            <Text style={styles.authSubtitle}>Sign in to track orders and save your addresses</Text>
            
            <Button
              title="Sign In"
              onPress={handleLogin}
              variant="primary"
              style={styles.authButton}
            />
            
            <TouchableOpacity>
              <Text style={styles.createAccountText}>Create a new account</Text>
            </TouchableOpacity>
          </View>
        )}
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
    padding: Layout.spacing.m,
    paddingBottom: Layout.spacing.xxl,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.primary,
    borderRadius: Layout.borderRadius.m,
    padding: Layout.spacing.l,
    marginBottom: Layout.spacing.l,
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.neutral[200],
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: Layout.spacing.m,
  },
  userName: {
    fontSize: Layout.fontSize.l,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Layout.spacing.xs,
  },
  userEmail: {
    fontSize: Layout.fontSize.s,
    color: Colors.text.secondary,
  },
  editButton: {
    paddingVertical: Layout.spacing.xs,
    paddingHorizontal: Layout.spacing.m,
    borderRadius: Layout.borderRadius.m,
    borderWidth: 1,
    borderColor: Colors.primary.default,
  },
  editButtonText: {
    fontSize: Layout.fontSize.s,
    color: Colors.primary.default,
    fontWeight: '500',
  },
  sectionContainer: {
    backgroundColor: Colors.background.primary,
    borderRadius: Layout.borderRadius.m,
    padding: Layout.spacing.m,
    marginBottom: Layout.spacing.l,
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: Layout.fontSize.m,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Layout.spacing.m,
    paddingHorizontal: Layout.spacing.s,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.m,
    paddingHorizontal: Layout.spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  menuItemText: {
    flex: 1,
    fontSize: Layout.fontSize.m,
    color: Colors.text.primary,
    marginLeft: Layout.spacing.m,
  },
  logoutButton: {
    marginTop: Layout.spacing.m,
  },
  authContainer: {
    backgroundColor: Colors.background.primary,
    borderRadius: Layout.borderRadius.m,
    padding: Layout.spacing.xl,
    alignItems: 'center',
    marginTop: Layout.spacing.xl,
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  authTitle: {
    fontSize: Layout.fontSize.xl,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: Layout.spacing.m,
    textAlign: 'center',
  },
  authSubtitle: {
    fontSize: Layout.fontSize.m,
    color: Colors.text.secondary,
    marginBottom: Layout.spacing.xl,
    textAlign: 'center',
  },
  authButton: {
    minWidth: 200,
    marginBottom: Layout.spacing.l,
  },
  createAccountText: {
    fontSize: Layout.fontSize.m,
    color: Colors.primary.default,
    fontWeight: '500',
  },
});