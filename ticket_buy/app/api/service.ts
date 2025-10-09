import { Order, Product } from '../types';

// Mock de produtos
const mockProducts: Product[] = [
  { id: 1, name: 'Hambúrguer', price: 15.90, description: 'Pão, carne, queijo, alface e tomate.', category: 'lanches', image: 'https://placehold.co/150x150/E8D5C4/313131?text=Hambúrguer' },
  { id: 2, name: 'Refrigerante', price: 5.00, description: 'Lata 350ml.', category: 'bebidas', image: 'https://placehold.co/150x150/A2C579/313131?text=Refri' },
  { id: 3, name: 'Milk Shake', price: 12.00, description: 'Chocolate ou morango.', category: 'bebidas', image: 'https://placehold.co/150x150/F5F5DC/313131?text=Milkshake' },
  { id: 4, name: 'Casadinho', price: 3.50, description: 'Dois brigadeiros.', category: 'sobremesas', image: 'https://placehold.co/150x150/D2B48C/313131?text=Doce' }
];

// Serviços
export const ProductService = {
  getProducts: async (): Promise<Product[]> => Promise.resolve(mockProducts),
  createProduct: async (productData: Omit<Product, 'id'>): Promise<Product> => {
    console.log('Criando produto:', productData);
    const newProduct = { ...productData, id: Date.now() };
    mockProducts.push(newProduct);
    return Promise.resolve(newProduct);
  },
};

export const OrderService = {
  createOrder: async (orderData: Omit<Order, 'id'>): Promise<Order> => {
    console.log('Criando pedido:', orderData);
    const newOrder = { ...orderData, id: Date.now().toString().slice(-6) };
    return Promise.resolve(newOrder);
  },
  updateOrderStatus: async (orderId: string, status: Order['status']): Promise<{ orderId: string; status: Order['status'] }> => {
    console.log('Atualizando status:', orderId, status);
    return Promise.resolve({ orderId, status });
  }
};