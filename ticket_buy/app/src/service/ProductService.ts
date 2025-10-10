// services/productService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/produtos';

export const ProductService = {
  getProducts: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      throw error; // Remove o catch se não for tratar o erro aqui
    }
  }
};