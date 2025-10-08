// Tipos
type Product = {
  id: string;
  nome: string;
  preco: number;
  description: string;
  image: string;
  category: 'lanches' | 'bebidas' | 'sobremesas';
};

type CartItem = {
  product: Product;
  quantity: number;
};
type OrderStatus = 'em preparo' | 'pronto' | 'entregue';

type Order = {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  timestamp: Date;
};

export { CartItem, Order, OrderStatus, Product };

