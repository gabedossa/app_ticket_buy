// Tipos
export type Product = {
  preco: number;
  nome: string;
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: "lanches" | "bebidas" | "sobremesas";
};

export type UseProdutosReturn = {
  produtos: Product[];
  loading: boolean;
  error: Error | null;
  setProdutos: React.Dispatch<React.SetStateAction<Product[]>>;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type OrderStatus = "em preparo" | "pronto" | "entregue";

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  timestamp: Date;
};
