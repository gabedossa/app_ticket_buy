// hooks/useProductForm.ts
import { Product } from '@/app/type/types';
import { useState } from 'react';
import { ServiceProdutos } from '../../app/service/api/ProdutoService';

export const useProductForm = (initialProduct?: Product) => {
  const [product, setProduct] = useState<Partial<Product>>(
    initialProduct || {
      name: '',
      price: 0.0,
      description: '',
      image: '',
      category: undefined
    }
  );
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof Product, value: any) => {
    setProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async (): Promise<Product | null> => {
    setLoading(true);
    setError(null);
    
    try {
      // VALIDAÇÃO SE O PRODUTO TEM NOME E PREÇO.
      if (!product.name) {
        throw new Error('Nome é obrigatórios');
      }
      if(!product.price){
        throw new Error('Preço é obrigatório.');
      }

      let savedProduct: Product;
      
      if (product.id) {
        // EDIÇÃO PRODUTO
        savedProduct = await ServiceProdutos.updateProduto(Number(product.id), product as Product);
      } else {
        // CRIAÇÃO PRODUTO
        savedProduct = await ServiceProdutos.createProduto(product as Product);
      }
      
      setLoading(false);
      return savedProduct;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar produto');
      setLoading(false);
      return null;
    }
  };

  const resetForm = () => {
    setProduct(initialProduct || {
      name: '',
      price: 0,
      description: '',
      image: '',
      category: undefined
    });
    setError(null);
  };

  return {
    product,
    loading,
    error,
    handleChange,
    handleSave,
    resetForm,
    setProduct
  };
};