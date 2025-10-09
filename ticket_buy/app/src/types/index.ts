// src/types/index.ts
export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
  category?: string;
}

export interface Product {
  id: string | number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'em preparo' | 'pronto' | 'entregue';
  timestamp: string;
}

export type OrderStatus = Order['status'];

export type CartAction = 
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string | number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string | number; quantity: number } }
  | { type: 'CLEAR_CART' };

export interface ProviderProps {
  children: React.ReactNode;
}