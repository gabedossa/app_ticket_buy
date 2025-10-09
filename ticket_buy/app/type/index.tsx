// Tipos
//Produto
export type Product = {
  id: string | number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
};
//UseProduct
export type UseProdutosReturn = {
  produtos: Product[];
  loading: boolean;
  error: Error | null;
  setProdutos: React.Dispatch<React.SetStateAction<Product[]>>;
};

//CartItem
export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
  category?: string;
}

// Tipos para as ações do reducer do carrinho
export type CartAction = 
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string | number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string | number; quantity: number } }
  | { type: 'CLEAR_CART' };

//Order
export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  status: "em preparo" | "pronto" | "entregue";
  timestamp: string;
};

//OrderStatus
export type OrderStatus = Order['status'];

// Props para providers
export interface ProviderProps {
  children: React.ReactNode;
}
