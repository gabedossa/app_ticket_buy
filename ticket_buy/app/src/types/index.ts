// src/types/index.ts
import React from 'react';

export type ProductCategory = 'lanches' | 'bebidas' | 'sobremesas';

export interface Product {
  id: string | number;
  name: string;
  price: number;
  tipo: ProductCategory;
  description: string;
  images: string[];
  disponivel: boolean; 
}

export interface MenuHeaderProps {
  title?: string;
  cartItemCount?: number;
  showAdminButton?: boolean;
  showCartButton?: boolean;
  onAdminPress?: () => void;
  onCartPress?: () => void;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'em preparo' | 'pronto' | 'entregue';
  timestamp: string; 
}

export type OrderStatus = Order['status'];

export type CartAction = 
  | { type: 'ADD_TO_CART'; payload: Product } 
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string | number } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string | number; newQuantity: number } }
  | { type: 'CLEAR_CART' };

export interface ProviderProps {
  children: React.ReactNode;
}

export interface ProductAPI {
  id_produto?: string | number;
  idProduto?: string | number;
  id?: string | number;
  nome: string;
  preco: number;
  tipo: ProductCategory;
  descricao: string;
  imagem: string;
  disponivel: boolean;
}

export interface ProductCreateDTO {
  nome: string;
  preco: number;
  tipo: ProductCategory;
  descricao: string;
  imagem: string;
  disponivel: boolean;
}


export const normalizeProduct = (productData: any): Product => {
  return {
    id: productData.id_produto || productData.idProduto || productData.id,
    name: productData.nome || productData.name,
    price: parseFloat(productData.preco || productData.price || 0),
    tipo: (productData.tipo || productData.category || 'lanches') as ProductCategory,
    description: productData.descricao || productData.description || 'Sem descrição.',
    images: productData.imagem || productData.image ? [productData.imagem || productData.image] : [],
    disponivel: productData.disponivel !== undefined ? productData.disponivel : true,
  };
};

export const isValidProduct = (product: any): product is Product => {
  return (
    product &&
    (product.id !== undefined) &&
    typeof product.name === 'string' &&
    typeof product.price === 'number' &&
    typeof product.tipo === 'string' &&
    typeof product.description === 'string' &&
    Array.isArray(product.images) &&
    typeof product.disponivel === 'boolean'
  );
};