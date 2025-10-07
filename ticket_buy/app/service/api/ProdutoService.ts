import { Product } from "@/app/type/types";
import axios from "axios";

// Criando conexão com axios
const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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