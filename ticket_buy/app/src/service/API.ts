// src/services/api.js
// Serviços para comunicação com o backend
const API_BASE_URL = 'http://localhost:3000/api'; // TODO: Alterar para URL real do backend

// TODO: Implementar chamadas reais aos endpoints
export const productService = {
  async getProducts() {
    // ENDPOINT: GET /products
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Falha ao buscar produtos');
    return await response.json();
  },

  async createProduct(productData) {
    // ENDPOINT: POST /products
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    if (!response.ok) throw new Error('Falha ao criar produto');
    return await response.json();
  }
};

export const orderService = {
  async getOrders() {
    // ENDPOINT: GET /orders
    const response = await fetch(`${API_BASE_URL}/orders`);
    if (!response.ok) throw new Error('Falha ao buscar pedidos');
    return await response.json();
  },

  async createOrder(orderData) {
    // ENDPOINT: POST /orders
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    if (!response.ok) throw new Error('Falha ao criar pedido');
    return await response.json();
  },

  async updateOrderStatus(orderId, status) {
    // ENDPOINT: PUT /orders/{id}
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!response.ok) throw new Error('Falha ao atualizar pedido');
    return await response.json();
  }
};