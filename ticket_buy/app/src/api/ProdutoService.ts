import { Product } from "@/app/type/types";
import { api } from ".";

export const ServiceProdutos = {
  // GET ALL PRODUCTS
  getProdutos: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>("/produtos");
    return response.data;
  },

  // CREATE PRODUCT
  createProduto: async (productData: Product): Promise<Product> => {
    const response = await api.post<Product>("/produtos", productData);
    return response.data;
  },

  // GET PRODUCT BY ID
  getProdutoById: async (id: number): Promise<Product> => {
    const response = await api.get<Product>(`/produtos/${id}`);
    return response.data;
  },

  // UPDATE PRODUCT
  updateProduto: async (id: number, productData: Product): Promise<Product> => {
    const response = await api.put<Product>(`/produtos/${id}`, productData);
    return response.data;
  },

  // DELETE PRODUCT
  deleteProduto: async (id: number): Promise<void> => {
    await api.delete(`/produtos/${id}`);
  },
};