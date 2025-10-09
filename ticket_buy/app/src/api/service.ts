import { Order, Product } from '../types';
import { api } from './index';

export const ProductService = {
  getProducts: async (): Promise<Product[]> =>{
    try {
      console.log("Buscando produtos do backend Spring Boot...");
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      throw new Error('Não foi possível carregar os produtos.');
    }
  },

  createProduct: async (productData: Omit<Product, 'id'>): Promise<Product> => {
    try {
      console.log('Criando produto via API:', productData);
      const response = await api.post('/products', productData);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      throw new Error('Não foi possível criar o produto.');
    }
  },
};

export const OrderService = {
  createOrder: async (orderData: Omit<Order, 'id'>): Promise<Order> => {
    try {
      console.log('Criando pedido via API:', orderData);
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      throw new Error('Não foi possível finalizar o pedido.');
    }
  },
  
  updateOrderStatus: async (orderId: string, status: Order['status']): Promise<Order> => {
    try {
      console.log(`Atualizando status do pedido ${orderId} para ${status}`);
      const response = await api.patch(`/orders/${orderId}`, { status }); 
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar status do pedido:", error);
      throw new Error('Não foi possível atualizar o status do pedido.');
    }
  }
};

export { Product };

