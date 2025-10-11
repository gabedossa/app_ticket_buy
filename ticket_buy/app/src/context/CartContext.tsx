import React, { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';
// Importando diretamente da nossa fonte da verdade de tipos!
import { CartItem, Product } from '../types';

interface ICartContext {
  items: CartItem[];
  addToCart: (product: Product) => void;
  updateQuantity: (productId: number | string, newQuantity: number) => void;
  removeItemFromCart: (productId: number | string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<ICartContext | undefined>(undefined);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Criamos um CartItem a partir do Product, adicionando a quantidade.
      return [...currentItems, { ...product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((productId: number | string, newQuantity: number) => {
    setItems((currentItems) => {
      if (newQuantity <= 0) {
        return currentItems.filter((item) => item.id !== productId);
      }
      return currentItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  }, []);

  const removeItemFromCart = useCallback((productId: number | string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== productId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  
  // O cálculo do total agora usa a propriedade 'price', padronizada em nossos tipos.
  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addToCart, 
        updateQuantity, 
        removeItemFromCart, 
        clearCart, 
        total, 
        itemCount 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook customizado com a verificação de segurança
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};