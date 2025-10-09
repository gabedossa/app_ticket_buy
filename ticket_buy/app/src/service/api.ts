// src/services/api.ts
import { Platform } from 'react-native';
import { Order, Product } from '../types';

const getAPIBaseURL = () => {
  if (__DEV__) {
    // Para desenvolvimento web no browser
    if (typeof window !== 'undefined') {
      return 'http://localhost:8080/api';
    }
    // Para Android emulator
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:8080/api';
    }
    // Para iOS emulator
    return 'http://localhost:8080/api';
  }
  return 'https://localhost:8080/api';
};

const API_BASE_URL = getAPIBaseURL();

const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    console.log(`🔄 Fazendo requisição para: ${url}`);
    
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      mode: 'cors',
      credentials: 'omit', 
      ...options,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`✅ Resposta recebida de: ${url}`);
    return data;
    
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      console.warn('⏰ Timeout na requisição');
      throw new Error('Servidor não respondeu. Verifique se o backend está rodando.');
    }
    
    if (error.message?.includes('CORS') || error.message?.includes('NetworkError')) {
      console.warn(`❌ Erro de CORS/Rede: ${url}`);
      throw new Error('Erro de conexão com o servidor. Verifique CORS e se o servidor está rodando.');
    }
    
    console.warn(`❌ API Request failed for ${url}:`, error.message);
    throw error;
  }
};

export const productService = {
  async getProducts(): Promise<Product[]> {
    try {
      const products = await fetchAPI('/produtos');
      console.log(`📦 ${products.length} produtos carregados da API`);
      return products;
    } catch (error: any) {
      console.error('❌ Erro crítico ao buscar produtos da API:', error.message);
      // Não retorna fallback - deixa o contexto lidar com o erro
      throw new Error(`Falha ao conectar com o servidor: ${error.message}`);
    }
  },

  async createProduct(productData: Omit<Product, 'id'>): Promise<Product> {
    try {
      const newProduct = await fetchAPI('/produtos', {
        method: 'POST',
        body: JSON.stringify(productData),
      });
      console.log('✅ Produto criado via API:', newProduct.name);
      return newProduct;
    } catch (error: any) {
      console.error('❌ Erro ao criar produto:', error);
      throw new Error('Não foi possível criar o produto. Verifique a conexão com o servidor.');
    }
  }
};

export const orderService = {
  async getOrders(): Promise<Order[]> {
    try {
      const orders = await fetchAPI('/pedidos');
      console.log(`📋 ${orders.length} pedidos carregados da API`);
      return orders;
    } catch (error: any) {
      console.error('❌ Erro ao buscar pedidos:', error);
      throw new Error('Não foi possível carregar os pedidos.');
    }
  },

  async createOrder(orderData: Omit<Order, 'id'>): Promise<Order> {
    try {
      const newOrder = await fetchAPI('/pedidos', {
        method: 'POST',
        body: JSON.stringify(orderData),
      });
      console.log('✅ Pedido criado via API:', newOrder.id);
      return newOrder;
    } catch (error: any) {
      console.error('❌ Erro ao criar pedido:', error);
      throw new Error('Não foi possível criar o pedido. Verifique a conexão com o servidor.');
    }
  },

  async updateOrderStatus(orderId: string | number, status: string): Promise<void> {
    try {
      await fetchAPI(`/pedidos/${orderId}`, {
        method: 'PUT', 
        body: JSON.stringify({ status }),
      });
      console.log(`🔄 Status do pedido ${orderId} atualizado para: ${status}`);
    } catch (error: any) {
      console.error('❌ Erro ao atualizar status do pedido:', error);
      throw error;
    }
  }
};