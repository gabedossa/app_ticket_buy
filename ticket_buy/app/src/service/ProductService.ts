// services/productService.ts
import axios from 'axios';
import { Product, ProductCreateDTO } from '../types';

const API_URL = 'http://localhost:8080/api/produtos';

export const ProductService = {
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await axios.get(API_URL);
      console.log('📦 Produtos carregados:', response.data.length);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao carregar produtos:', error);
      throw error; 
    }
  },

  getProductById: async (id: string | number): Promise<Product> => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      console.log('✅ Produto carregado:', response.data.nome);
      return response.data;
    } catch (error) {
      console.error(`❌ Erro ao buscar produto ${id}:`, error);
      throw error;
    }
  },

  createProduct: async (productData: ProductCreateDTO): Promise<Product> => {
    try {
      const response = await axios.post(API_URL, productData);
      console.log('✅ Produto criado:', response.data.nome);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao criar produto:', error);
      throw error;
    }
  },

  updateProduct: async (id: string | number, productData: Partial<Product>): Promise<Product> => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, productData);
      console.log('✅ Produto atualizado:', response.data.nome);
      return response.data;
    } catch (error) {
      console.error(`❌ Erro ao atualizar produto ${id}:`, error);
      throw error;
    }
  },

  // CORREÇÃO CRÍTICA: Garantir que sempre retorna uma Promise
  deleteProduct: async (id: string | number): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      console.log(`✅ Produto ${id} excluído com sucesso`);
      return { success: true, message: 'Produto excluído com sucesso' };
    } catch (error: any) {
      console.error(`❌ Erro ao excluir produto ${id}:`, error);
      
      // CORREÇÃO: Sempre lançar um erro que seja uma Promise
      if (error.response) {
        console.error('📊 Detalhes do erro:', {
          status: error.response.status,
          data: error.response.data
        });
        
        if (error.response.status === 404) {
          throw new Error('Produto não encontrado');
        } else if (error.response.status === 500) {
          throw new Error('Erro interno do servidor');
        } else {
          throw new Error(error.response.data?.message || `Erro ${error.response.status}`);
        }
      } else if (error.request) {
        throw new Error('Sem resposta do servidor. Verifique sua conexão.');
      } else {
        throw new Error(error.message || 'Erro inesperado ao excluir produto');
      }
    }
  },

  toggleProductAvailability: async (id: string | number, disponivel: boolean): Promise<Product> => {
    try {
      const response = await axios.patch(`${API_URL}/${id}/disponibilidade`, { disponivel });
      console.log(`✅ Disponibilidade do produto ${id} alterada para:`, disponivel);
      return response.data;
    } catch (error) {
      console.error(`❌ Erro ao alterar disponibilidade do produto ${id}:`, error);
      
      // Fallback para PUT
      try {
        console.log('🔄 Tentando atualização via PUT como fallback...');
        const response = await axios.put(`${API_URL}/${id}`, { disponivel });
        console.log('✅ Disponibilidade atualizada via PUT fallback');
        return response.data;
      } catch (fallbackError) {
        console.error(`❌ Fallback também falhou para produto ${id}:`, fallbackError);
        throw new Error('Não foi possível alterar a disponibilidade do produto');
      }
    }
  },

  getProductsByCategory: async (categoria: string): Promise<Product[]> => {
    try {
      const response = await axios.get(`${API_URL}/categoria/${categoria}`);
      console.log(`📦 ${response.data.length} produtos na categoria ${categoria}`);
      return response.data;
    } catch (error) {
      console.error(`❌ Erro ao buscar produtos da categoria ${categoria}:`, error);
      
      // Fallback: filtrar localmente
      try {
        console.log('🔄 Usando fallback: filtrando produtos localmente...');
        const allProducts = await ProductService.getProducts();
        return allProducts.filter(product => product.tipo === categoria);
      } catch (fallbackError) {
        console.error('❌ Fallback também falhou:', fallbackError);
        throw new Error('Não foi possível carregar os produtos');
      }
    }
  }
};

export default ProductService;