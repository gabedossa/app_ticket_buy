// Tipos
export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: "lanches" | "bebidas" | "sobremesas";
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
