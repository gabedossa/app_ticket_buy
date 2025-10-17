// src/services/api.ts
import * as SecureStore from 'expo-secure-store';
import { AuthResponse, LoginRequest, Order, Product, RegisterRequest } from '../types';

const API_BASE_URL = 'http://192.168.18.7:8080/api';

export const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    const token = await SecureStore.getItemAsync('my-jwt');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    if (options.headers) {
      Object.assign(headers, options.headers);
    }
    
    console.log(`🔄 Fazendo requisição para: ${url}`);
    
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: headers,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
        if (response.status === 403) {
            throw new Error('Acesso negado. Faça o login novamente.');
        }
        throw new Error(errorBody.message || `HTTP error! status: ${response.status}`);
    }

    // ==================================================================
    // >> CORREÇÃO ADICIONADA AQUI <<
    // Se a resposta for '204 No Content', não há corpo para processar,
    // então retornamos 'undefined' para sinalizar sucesso sem dados.
    // ==================================================================
    if (response.status === 204) {
      console.log(`✅ Resposta 204 No Content recebida de: ${url}`);
      return;
    }
    
    const data = await response.json();
    console.log(`✅ Resposta recebida de: ${url}`);
    return data;

  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      console.warn('⏰ Timeout na requisição');
      throw new Error('O servidor demorou mais de 20 segundos para responder (Timeout).');
    }
    console.warn(`❌ API Request failed for ${url}:`, error.message);
    throw error;
  }
};

// ... O restante do arquivo (authService, productService, etc.) permanece exatamente o mesmo ...
export const authService = {
    async login(credentials: LoginRequest): Promise<AuthResponse> {
        const response = await fetchAPI('/auth/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
        });
        return response;
      },
    
      async register(userData: RegisterRequest): Promise<{ message: string }> {
        const response = await fetchAPI('/auth/register', {
          method: 'POST',
          body: JSON.stringify(userData),
        });
        return response;
      },
};

export const productService = {
    async getProducts(): Promise<Product[]> {
      const products = await fetchAPI('/produtos');
      return products;
    },
  
    async createProduct(productData: Omit<Product, 'id'>): Promise<Product> {
      const newProduct = await fetchAPI('/produtos', {
        method: 'POST',
        body: JSON.stringify(productData),
      });
      return newProduct;
    },
  
    async getProductById(id: string | number): Promise<Product> {
      const product = await fetchAPI(`/produtos/${id}`);
      return product;
    },
  
    async updateProduct(id: string | number, productData: Partial<Product>): Promise<Product> {
      const updatedProduct = await fetchAPI(`/produtos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(productData),
      });
      return updatedProduct;
    },
  
    async deleteProduct(id: string | number): Promise<void> {
      await fetchAPI(`/produtos/${id}`, {
        method: 'DELETE',
      });
    },

    async toggleProductAvailability(id: string | number, disponivel: boolean): Promise<Product> {
        try {
          const updatedProduct = await fetchAPI(`/produtos/${id}/disponibilidade`, {
            method: 'PATCH',
            body: JSON.stringify({ disponivel }),
          });
          return updatedProduct;
        } catch (error) {
          console.error(`❌ Erro ao alterar disponibilidade com PATCH, tentando PUT como fallback...`);
          const updatedProduct = await fetchAPI(`/produtos/${id}`, {
              method: 'PUT',
              body: JSON.stringify({ disponivel }),
          });
          return updatedProduct;
        }
      },
};

export const orderService = {
    async getOrders(): Promise<Order[]> {
        const orders = await fetchAPI('/pedidos');
        return orders;
    },
    
    async createOrder(orderData: Omit<Order, 'id'>): Promise<Order> {
      const newOrder = await fetchAPI('/pedidos', {
        method: 'POST',
        body: JSON.stringify(orderData),
      });
      return newOrder;
    },
    
    async updateOrderStatus(orderId: string | number, status: string): Promise<void> {
      await fetchAPI(`/pedidos/${orderId}`, {
        method: 'PUT', 
        body: JSON.stringify({ status }),
      });
    },
    
    async getOrderById(id: string | number): Promise<Order> {
      const order = await fetchAPI(`/pedidos/${id}`);
      return order;
    },
    
    async deleteOrder(id: string | number): Promise<void> {
      await fetchAPI(`/pedidos/${id}`, {
        method: 'DELETE',
      });
    },
};