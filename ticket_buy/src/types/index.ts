import React from 'react';

// --- Tipos Gerais ---
export type ProductCategory = 'lanche' | 'bebida' | 'sobremesa';

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
}

export interface AuthResponse {
  token: string;

}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
}

export interface AuthContextType {
  authState: AuthState;
  signIn: (data: LoginRequest) => Promise<void>;
  signOut: () => void;
  signUp: (data: RegisterRequest) => Promise<void>;
}

export interface Product {
  id: string | number;
  name: string;
  price: number;
  tipo: ProductCategory;
  description: string;
  images?: string[];
  disponivel: boolean;
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

export type OrderStatus = Order['status'];

export interface ProviderProps {
  children: React.ReactNode;
}


// --- Tipos de Contexto ---
export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeItemFromCart: (productId: string | number) => void;
  updateQuantity: (productId: string | number, newQuantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

export interface OrderContextType {
  orders: Order[];
  createOrder: (items: CartItem[], total: number) => Promise<void>;
}


// --- Tipos de Props de Componentes ---
export interface MenuHeaderProps {
  title?: string;
  cartItemCount?: number;
  showAdminButton?: boolean;
  showCartButton?: boolean;
  onAdminPress?: () => void;
  onCartPress?: () => void;
}

export interface ModalProductProps {
  visible: boolean;
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export interface ProductCardProps {
  product: Product;
}

export interface CategoryFilterProps {
  categories: (ProductCategory | 'all')[];
  selectedCategory: ProductCategory | 'all';
  onSelectCategory: (category: ProductCategory | 'all') => void;
}

export interface ProductGridProps {
  products: Product[];
  onProductPress: (product: Product) => void;
}


// --- Tipos da API e DTOs ---
export interface ProductAPI {
  id_produto?: string | number;
  idProduto?: string | number;
  id?: string | number;
  nome?: string;
  preco?: string | number;
  tipo?: ProductCategory;
  descricao?: string;
  imagem?: string;
  disponivel?: boolean;
  name?: string;
  price?: string | number;
  category?: string;
  description?: string;
  image?: string;
}

export interface ProductCreateDTO {
  nome: string;
  preco: number;
  tipo: ProductCategory;
  descricao: string;
  imagem: string;
  disponivel: boolean;
}


// --- Tipos de Serviço ---
export interface ProductServiceInterface {
    getProducts: () => Promise<Product[]>;
    getProductById: (id: string | number) => Promise<Product>;
    getProductsByCategory: (categoria: string) => Promise<Product[]>;
    createProduct: (productData: ProductCreateDTO) => Promise<Product>;
    updateProduct: (id: string | number, productData: Partial<Product>) => Promise<Product>;
    deleteProduct: (id: string | number) => Promise<{ success: boolean; message: string }>;
    toggleProductAvailability: (id: string | number, disponivel: boolean) => Promise<Product>;
}