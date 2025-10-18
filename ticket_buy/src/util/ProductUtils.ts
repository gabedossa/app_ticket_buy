// src/utils/productUtils.ts

import { Product, ProductAPI, ProductCategory } from '../types';

export const normalizeProduct = (productData: ProductAPI): Product => {
  return {
    id: productData.id_produto || productData.idProduto || productData.id!,
    name: productData.nome || productData.name || 'Produto sem nome',
    price: parseFloat(String(productData.preco || productData.price || 0)),
    tipo: (productData.tipo || productData.category || 'lanches') as ProductCategory,
    description: productData.descricao || productData.description || 'Sem descrição.',
    images: productData.imagem || productData.image ? [productData.imagem || productData.image] : [],
    disponivel: productData.disponivel !== undefined ? productData.disponivel : true,
  };
};

export const isValidProduct = (product: any): product is Product => {
  return (
    product &&
    product.id !== undefined &&
    typeof product.name === 'string' &&
    typeof product.price === 'number' &&
    typeof product.tipo === 'string' &&
    typeof product.description === 'string' &&
    Array.isArray(product.images) &&
    typeof product.disponivel === 'boolean'
  );
};
