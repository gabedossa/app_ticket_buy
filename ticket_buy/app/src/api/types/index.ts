// Define a estrutura de um produto básico no cardápio.
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

// Define um item dentro do carrinho de compras.
// Ele tem todas as propriedades de um 'Product', mais a quantidade.
export interface CartItem extends Product {
  quantity: number;
}

// Define a estrutura de um pedido finalizado.
export interface Order {
  id: string;
  items: CartItem[]; // Uma lista de itens do carrinho
  total: number;
  status: 'em preparo' | 'pronto' | 'entregue'; // O status só pode ser um desses três valores
  timestamp: string; // Data e hora do pedido
}