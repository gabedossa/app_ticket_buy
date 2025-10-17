import React, { createContext, useCallback, useContext, useState } from 'react';
import { orderService } from '../service/api';
import { CartItem, Order, OrderStatus, ProviderProps } from '../types';

interface OrdersContextType {
  orders: Order[];
  loading: boolean;
  error: string | null;
  loadOrders: () => Promise<void>;
  createOrder: (items: CartItem[]) => Promise<Order | void>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const OrdersProvider: React.FC<ProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedOrders = await orderService.getOrders();
      setOrders(fetchedOrders);
    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao carregar pedidos.';
      setError(errorMessage);
      console.error('Erro ao carregar pedidos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createOrder = async (items: CartItem[]) => {
    try {
      setLoading(true);
      setError(null);

      const itensRequest = items.map(item => ({
        produtoId: item.id,
        quantidade: item.quantity,
      }));

      const orderData = { itens: itensRequest };
      
      const newOrder = await orderService.createOrder(orderData as any);

      setOrders(prevOrders => [...prevOrders, newOrder]);
      return newOrder;

    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao criar pedido.';
      setError(errorMessage);
      console.error('Erro ao criar pedido:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
        setError(null);
        await orderService.updateOrderStatus(orderId, status);

        setOrders(prev => 
            prev.map(order => 
                order.id === orderId ? { ...order, status } : order
            )
        );
    } catch (err: any) {
        const errorMessage = err.message || 'Não foi possível atualizar o status do pedido.';
        setError(errorMessage);
        console.error("Erro ao atualizar status do pedido:", err);
        await loadOrders();
    }
  };

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
    throw new Error('useOrders deve ser usado dentro de um OrdersProvider');
  }
  return context;
};