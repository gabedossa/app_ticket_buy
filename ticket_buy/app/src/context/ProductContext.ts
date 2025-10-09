// src/context/ProductsContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProviderProps } from '../types';

// TODO: Importar serviço real quando disponível
// import { productService } from '../services/api';

interface ProductsContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  loadProducts: () => Promise<void>;
  addProduct: (productData: Omit<Product, 'id'>) => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

// Mock service - TODO: Substituir por serviço real
const mockProductService = {
  async getProducts(): Promise<Product[]> {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
      { 
        id: 1, 
        name: 'Hambúrguer', 
        price: 15.90, 
        description: 'Pão, carne, queijo, alface e tomate.', 
        category: 'lanches', 
        image: 'https://placehold.co/150x150/E8D5C4/313131?text=Hambúrguer' 
      },
      { 
        id: 2, 
        name: 'Refrigerante', 
        price: 5.00, 
        description: 'Lata 350ml.', 
        category: 'bebidas', 
        image: 'https://placehold.co/150x150/A2C579/313131?text=Refri' 
      },
    ];
  },
  async createProduct(productData: Omit<Product, 'id'>): Promise<Product> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...productData, id: Date.now() };
  }
};

export const ProductsProvider: React.FC<ProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Substituir por chamada real
      // const productsData = await productService.getProducts();
      const productsData = await mockProductService.getProducts();
      setProducts(productsData);
    } catch (err) {
      setError('Erro ao carregar produtos');
      console.error('Erro ao carregar produtos:', err);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData: Omit<Product, 'id'>) => {
    try {
      // TODO: Substituir por chamada real
      // const newProduct = await productService.createProduct(productData);
      const newProduct = await mockProductService.createProduct(productData);
      setProducts(prev => [...prev, newProduct]);
    } catch (err) {
      setError('Erro ao adicionar produto');
      console.error('Erro ao adicionar produto:', err);
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
    addProduct
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
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};