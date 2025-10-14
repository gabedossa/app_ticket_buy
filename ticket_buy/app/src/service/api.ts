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
  },

  // FUNÇÕES QUE ESTAVAM FALTANDO:
  async getProductById(id: string | number): Promise<Product> {
    try {
      const product = await fetchAPI(`/produtos/${id}`);
      console.log('✅ Produto carregado:', product.name);
      return product;
    } catch (error: any) {
      console.error(`❌ Erro ao buscar produto ${id}:`, error);
      throw new Error('Não foi possível carregar o produto.');
    }
  },

  async updateProduct(id: string | number, productData: Partial<Product>): Promise<Product> {
    try {
      const updatedProduct = await fetchAPI(`/produtos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(productData),
      });
      console.log('✅ Produto atualizado via API:', updatedProduct.name);
      return updatedProduct;
    } catch (error: any) {
      console.error(`❌ Erro ao atualizar produto ${id}:`, error);
      throw new Error('Não foi possível atualizar o produto.');
    }
  },

  async deleteProduct(id: string | number): Promise<void> {
    try {
      await fetchAPI(`/produtos/${id}`, {
        method: 'DELETE',
      });
      console.log(`✅ Produto ${id} excluído com sucesso`);
    } catch (error: any) {
      console.error(`❌ Erro ao excluir produto ${id}:`, error);
      throw new Error('Não foi possível excluir o produto.');
    }
  },

  async toggleProductAvailability(id: string | number, disponivel: boolean): Promise<Product> {
    try {
      const updatedProduct = await fetchAPI(`/produtos/${id}/disponibilidade`, {
        method: 'PATCH',
        body: JSON.stringify({ disponivel }),
      });
      console.log(`✅ Disponibilidade do produto ${id} alterada para: ${disponivel}`);
      return updatedProduct;
    } catch (error: any) {
      console.error(`❌ Erro ao alterar disponibilidade do produto ${id}:`, error);
      
      // Fallback: tentar via PUT se PATCH não estiver disponível
      try {
        console.log('🔄 Tentando atualização via PUT como fallback...');
        const updatedProduct = await fetchAPI(`/produtos/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ disponivel }),
        });
        console.log(`✅ Disponibilidade atualizada via PUT fallback`);
        return updatedProduct;
      } catch (fallbackError: any) {
        console.error(`❌ Fallback também falhou para produto ${id}:`, fallbackError);
        throw new Error('Não foi possível alterar a disponibilidade do produto.');
      }
    }
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const products = await fetchAPI(`/produtos/categoria/${category}`);
      console.log(`📦 ${products.length} produtos na categoria ${category}`);
      return products;
    } catch (error: any) {
      console.error(`❌ Erro ao buscar produtos da categoria ${category}:`, error);
      // Fallback: filtrar localmente se a rota específica não existir
      console.log('🔄 Usando fallback: filtrando produtos localmente...');
      const allProducts = await this.getProducts();
      return allProducts.filter(product => product.tipo === category);
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
  },

  // FUNÇÕES QUE ESTAVAM FALTANDO:
  async getOrderById(id: string | number): Promise<Order> {
    try {
      const order = await fetchAPI(`/pedidos/${id}`);
      console.log('✅ Pedido carregado:', order.id);
      return order;
    } catch (error: any) {
      console.error(`❌ Erro ao buscar pedido ${id}:`, error);
      throw new Error('Não foi possível carregar o pedido.');
    }
  },

  async deleteOrder(id: string | number): Promise<void> {
    try {
      await fetchAPI(`/pedidos/${id}`, {
        method: 'DELETE',
      });
      console.log(`✅ Pedido ${id} excluído com sucesso`);
    } catch (error: any) {
      console.error(`❌ Erro ao excluir pedido ${id}:`, error);
      throw new Error('Não foi possível excluir o pedido.');
    }
  },

  async getOrdersByStatus(status: string): Promise<Order[]> {
    try {
      const orders = await fetchAPI(`/pedidos/status/${status}`);
      console.log(`📋 ${orders.length} pedidos com status ${status}`);
      return orders;
    } catch (error: any) {
      console.error(`❌ Erro ao buscar pedidos com status ${status}:`, error);
      // Fallback: filtrar localmente
      console.log('🔄 Usando fallback: filtrando pedidos localmente...');
      const allOrders = await this.getOrders();
      return allOrders.filter(order => order.status === status);
    }
  }
};

// Serviços adicionais que podem ser úteis
export const categoryService = {
  async getCategories(): Promise<string[]> {
    try {
      const categories = await fetchAPI('/categorias');
      console.log(`📂 ${categories.length} categorias carregadas`);
      return categories;
    } catch (error: any) {
      console.error('❌ Erro ao buscar categorias:', error);
      // Fallback: categorias padrão
      return ['lanches', 'bebidas', 'sobremesas'];
    }
  }
};

// Serviço para verificar saúde da API
export const healthService = {
  async checkHealth(): Promise<{ status: string; timestamp: string }> {
    try {
      const health = await fetchAPI('/health');
      console.log('🏥 Saúde da API:', health.status);
      return health;
    } catch (error: any) {
      console.error('❌ Erro ao verificar saúde da API:', error);
      throw new Error('API não está respondendo.');
    }
  },

  async checkDatabaseConnection(): Promise<{ database: string; status: string }> {
    try {
      const dbStatus = await fetchAPI('/health/db');
      console.log('🗄️ Status do banco de dados:', dbStatus.status);
      return dbStatus;
    } catch (error: any) {
      console.error('❌ Erro ao verificar conexão com o banco:', error);
      throw new Error('Banco de dados não está acessível.');
    }
  }
};

// Utilitário para lidar com upload de imagens
export const uploadService = {
  async uploadImage(imageUri: string, fileName: string = 'product-image'): Promise<{ url: string }> {
    try {
      // Criar FormData para upload
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: `${fileName}.jpg`,
      } as any);

      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Imagem enviada com sucesso:', result.url);
      return result;
    } catch (error: any) {
      console.error('❌ Erro ao fazer upload da imagem:', error);
      throw new Error('Não foi possível fazer upload da imagem.');
    }
  }
};

// Export padrão para compatibilidade
export default {
  productService,
  orderService,
  categoryService,
  healthService,
  uploadService,
};