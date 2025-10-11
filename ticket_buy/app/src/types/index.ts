// src/types/index.ts
import React from 'react';

export interface Product {
  id: string | number;
  name: string;
  price: number;
  category: string;
  description?: string;
  images?: string[]; 
}

export interface CartItem extends Product {
  quantity: number;
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
  | { type: 'ADD_TO_CART'; payload: Product } // Payload simplificado para Product
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string | number } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string | number; newQuantity: number } }
  | { type: 'CLEAR_CART' };

export interface ProviderProps {
  children: React.ReactNode;
}