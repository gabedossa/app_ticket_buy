// src/service/api.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from 'axios';
import { AuthTokens, LoginRequest, Order, Product, RegisterRequest } from '../types/Tipos';

const API_BASE_URL = 'http://192.168.18.7:8080/api';
const ACCESS_TOKEN_KEY = 'user_access_token';
const REFRESH_TOKEN_KEY = 'user_refresh_token';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: any) => void; }[] = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError) => {
    const originalRequest = error.config as typeof error.config & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          if(originalRequest.headers) {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
          }
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
      if (!refreshToken) {
        processQueue(error, null);
        return Promise.reject(error);
      }

      try {
        const { data: tokens }: { data: AuthTokens } = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
        
        await AsyncStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
        await AsyncStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${tokens.accessToken}`;
        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${tokens.accessToken}`;
        }
        
        processQueue(null, tokens.accessToken);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);


export const authService = {
  login: (credentials: LoginRequest): Promise<AuthTokens> => {
    return api.post('/auth/login', credentials);
  },
  register: (userData: RegisterRequest): Promise<{ message: string }> => {
    return api.post('/auth/register', userData);
  },
};

export const productService = {
  getProducts: (): Promise<Product[]> => api.get('/produtos'),
  getProductById: (id: string | number): Promise<Product> => api.get(`/produtos/${id}`),
  createProduct: (productData: any): Promise<Product> => api.post('/produtos', productData),
  updateProduct: (id: string | number, productData: Partial<Product>): Promise<Product> => api.put(`/produtos/${id}`, productData),
  deleteProduct: (id: string | number): Promise<void> => api.delete(`/produtos/${id}`),
  toggleProductAvailability: (id: string | number, disponivel: boolean): Promise<Product> => api.patch(`/produtos/${id}/disponibilidade`, { disponivel }),
  getProductsByCategory: (categoria: string): Promise<Product[]> => api.get(`/produtos/categoria/${categoria}`),
};

export const orderService = {
  getOrders: (): Promise<Order[]> => api.get('/pedidos'),
  getOrderById: (id: string | number): Promise<Order> => api.get(`/pedidos/${id}`),
  createOrder: (orderData: any): Promise<Order> => api.post('/pedidos', orderData),
  updateOrderStatus: (orderId: string | number, status: string): Promise<Order> => api.patch(`/pedidos/${orderId}`, { status }),
  deleteOrder: (id: string | number): Promise<void> => api.delete(`/pedidos/${id}`),
  getOrdersByStatus: (status: string): Promise<Order[]> => api.get(`/pedidos/status/${status}`),
};

export default api;