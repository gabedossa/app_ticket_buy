import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Product } from '../types'; // Certifique-se que o caminho para seus types está correto

// PASSO 1: Importe APENAS o productService, usando chaves {}
import { productService } from '../service/api';

// Interface para definir o que o nosso contexto vai fornecer
interface ProductContextType {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  loadProducts: () => Promise<void>; // Função para recarregar os produtos se necessário
}

// Criação do Contexto
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Componente Provedor (Provider)
export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // PASSO 2: Chame o método diretamente do productService importado
      const fetchedProducts = await productService.getProducts();
      
      setProducts(fetchedProducts);

    } catch (err: any) {
      console.error("Erro ao carregar produtos:", err);
      setError(err.message || 'Ocorreu um erro ao buscar os produtos.');
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect para carregar os produtos assim que o app iniciar
  useEffect(() => {
    loadProducts();
  }, []);

  const value = {
    products,
    isLoading,
    error,
    loadProducts,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

// Hook customizado para facilitar o uso do contexto nas telas
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts deve ser usado dentro de um ProductsProvider');
  }
  return context;
};