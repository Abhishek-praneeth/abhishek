export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  weight: string;
  inStock: boolean;
  featured?: boolean;
  nutritionalInfo?: {
    calories: string;
    protein: string;
    fat: string;
  };
  preparationTips?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  date: string;
  deliveryAddress: string;
  paymentMethod: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: {
    id: string;
    label: string;
    fullAddress: string;
    isDefault: boolean;
  }[];
  orders: Order[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  image: string;
  discountPercentage?: number;
  validUntil: string;
}