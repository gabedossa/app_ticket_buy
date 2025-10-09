// src/context/ProductsContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { productService } from "../service/api";
import { Product, ProviderProps } from "../types";

interface ProductsContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  loadProducts: () => Promise<void>;
  addProduct: (productData: Omit<Product, "id">) => Promise<void>;
  retryCount: number;
  isServerOnline: boolean;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export const ProductsProvider: React.FC<ProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);
  const [isServerOnline, setIsServerOnline] = useState<boolean>(false);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("📡 Tentando conectar com o backend...");
      const productsData = await productService.getProducts();

      // Se chegou aqui, o servidor está online
      setIsServerOnline(true);

      // Validar os dados recebidos
      const validProducts = Array.isArray(productsData)
        ? productsData.filter((p) => p && p.id && p.name && p.price)
        : [];

      setProducts(validProducts);
      setRetryCount(0);

      console.log(
        `✅ Servidor online! ${validProducts.length} produtos carregados`
      );
    } catch (err: any) {
      setIsServerOnline(false);
      const errorMessage = err.message || "Erro ao conectar com o servidor";
      setError(errorMessage);
      setProducts([]);
      setRetryCount((prev) => prev + 1);
      console.error("❌ Servidor offline:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData: Omit<Product, "id">) => {
    try {
      const newProduct = await productService.createProduct(productData);
      setProducts((prev) => [...prev, newProduct]);
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao adicionar produto";
      setError(errorMessage);
      throw err;
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const contextValue: ProductsContextType = {
    products,
    loading,
    error,
    loadProducts,
    addProduct,
    retryCount,
    isServerOnline,
  };

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};
