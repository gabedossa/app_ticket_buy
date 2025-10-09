// src/context/OrdersContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, OrderStatus, ProviderProps, CartItem } from '../types';

// TODO: Importar serviço real quando disponível
// import { orderService } from '../services/api';

interface OrdersContextType {
  orders: Order[];
  loading: boolean;
  error: string | null;
  loadOrders: () => Promise<void>;
  createOrder: (items: CartItem[], total: number) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

// Mock service - TODO: Substituir por serviço real
const mockOrderService = {
  async getOrders(): Promise<Order[]> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [];
  },
  async createOrder(orderData: Omit<Order, 'id'>): Promise<Order> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      ...orderData,
      id: Math.random().toString(36).substr(2, 9).toUpperCase()
    };
  },
  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log(`Order ${orderId} status updated to: ${status}`);
  }
};

export const OrdersProvider: React.FC<ProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Substituir por chamada real
      // const ordersData = await orderService.getOrders();
      const ordersData = await mockOrderService.getOrders();
      setOrders(ordersData);
    } catch (err) {
      setError('Erro ao carregar pedidos');
      console.error('Erro ao carregar pedidos:', err);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (items: CartItem[], total: number): Promise<Order> => {
    try {
      const orderData: Omit<Order, 'id'> = {
        items,
        total,
        status: 'em preparo',
        timestamp: new Date().toISOString()
      };
      
      // TODO: Substituir por chamada real
      // const newOrder = await orderService.createOrder(orderData);
      const newOrder = await mockOrderService.createOrder(orderData);
      
      setOrders(prev => [...prev, newOrder]);
      return newOrder;
    } catch (err) {
      setError('Erro ao criar pedido');
      console.error('Erro ao criar pedido:', err);
      throw err;
    }
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      // TODO: Substituir por chamada real
      // await orderService.updateOrderStatus(orderId, status);
      await mockOrderService.updateOrderStatus(orderId, status);
      
      setOrders(prev => 
        prev.map(order => 
          order.id === orderId ? { ...order, status } : order
        )
      );
    } catch (err) {
      setError('Erro ao atualizar status do pedido');
      console.error('Erro ao atualizar status:', err);
      throw err;
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const contextValue: OrdersContextType = {
    orders,
    loading,
    error,
    loadOrders,
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