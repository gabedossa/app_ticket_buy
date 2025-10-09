// src/context/OrdersContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { CartItem, Order, OrderStatus, ProviderProps } from '../types';

interface OrdersContextType {
  orders: Order[];
  loading: boolean;
  error: string | null;
  loadOrders: () => Promise<void>;
  createOrder: (items: CartItem[], total: number) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

// Mock service
const mockOrderService = {
  async createOrder(orderData: Omit<Order, 'id'>): Promise<Order> {
    return {
      ...orderData,
      id: Math.random().toString(36).substr(2, 9).toUpperCase()
    };
  }
};

export const OrdersProvider: React.FC<ProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = async (items: CartItem[], total: number): Promise<Order> => {
    try {
      const orderData: Omit<Order, 'id'> = {
        items,
        total,
        status: 'em preparo',
        timestamp: new Date().toISOString()
      };
      
      const newOrder = await mockOrderService.createOrder(orderData);
      setOrders(prev => [...prev, newOrder]);
      return newOrder;
    } catch (err: any) {
      setError('Erro ao criar pedido');
      console.error('Erro ao criar pedido:', err);
      throw err;
    }
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const contextValue: OrdersContextType = {
    orders,
    loading,
    error,
    loadOrders: async () => {},
    createOrder,
    updateOrderStatus
  };

  return (
    <OrdersContext.Provider value={contextValue}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = (): OrdersContextType => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within a OrdersProvider');
  }
  return context;
};