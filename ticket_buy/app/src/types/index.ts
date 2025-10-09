import axios from 'axios';

export const api = axios.create({

  baseURL: 'https://sua-api.com.br/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
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