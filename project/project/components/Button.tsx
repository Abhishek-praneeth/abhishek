import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  icon,
  style,
  textStyle,
  fullWidth = false,
}: ButtonProps) {
  const getButtonStyle = () => {
    let buttonStyle: ViewStyle = {};
    
    switch (variant) {
      case 'primary':
        buttonStyle = {
          backgroundColor: disabled ? Colors.neutral[400] : Colors.primary.default,
        };
        break;
      case 'secondary':
        buttonStyle = {
          backgroundColor: disabled ? Colors.neutral[400] : Colors.secondary.default,
        };
        break;
      case 'outline':
        buttonStyle = {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: disabled ? Colors.neutral[400] : Colors.primary.default,
        };
        break;
      case 'ghost':
        buttonStyle = {
          backgroundColor: 'transparent',
        };
        break;
    }
    
    // Button size
    const sizeStyles = {
      small: {
        paddingVertical: Layout.spacing.xs,
        paddingHorizontal: Layout.spacing.m,
      },
      medium: {
        paddingVertical: Layout.spacing.s,
        paddingHorizontal: Layout.spacing.l,
      },
      large: {
        paddingVertical: Layout.spacing.m,
        paddingHorizontal: Layout.spacing.xl,
      },
    };
    
    buttonStyle = {
      ...buttonStyle,
      ...sizeStyles[size],
      width: fullWidth ? '100%' : undefined,
    };
    
    return buttonStyle;
  };

  const getTextStyle = () => {
    let color = Colors.text.inverse;
    
    if (variant === 'outline' || variant === 'ghost') {
      color = disabled ? Colors.neutral[400] : Colors.primary.default;
    } else if (disabled) {
      color = Colors.neutral[600];
    }
    
    const fontSize = size === 'small' ? Layout.fontSize.s : size === 'large' ? Layout.fontSize.l : Layout.fontSize.m;
    
    return { color, fontSize };
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'outline' || variant === 'ghost' ? Colors.primary.default : Colors.text.inverse} 
        />
      ) : (
        <>
          {icon && <Text style={styles.iconContainer}>{icon}</Text>}
          <Text style={[styles.text, getTextStyle(), textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Layout.borderRadius.m,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  iconContainer: {
    marginRight: Layout.spacing.xs,
  },
});