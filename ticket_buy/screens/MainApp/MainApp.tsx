import React, { useEffect, useState } from "react";
import { CartItem, Order, Product } from "../../app/mocks/types/types.js";
import AdminScreen from "../AdminScreen/adminScreen";
import CartScreen from "../CartScreen/CartScreen";
import { useProdutos } from "../hooks/ProductHook";
import MenuScreen from "../menuScreen/MenuScreen";
import ProductFormScreen from "../ProductScreen/ProductForm";

export default function MainApp() {
  const produtos = useProdutos();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (Array.isArray(produtos)) {
      setProducts(produtos);
    }
  }, [produtos]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentView, setCurrentView] = useState<
    "menu" | "cart" | "admin" | "productForm"
  >("menu");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    description: "",
    image: "",
    category: "lanches",
  });
  const [activeCategory, setActiveCategory] = useState<"lanches" | "bebidas" | "sobremesas">("lanches");

  // Funções do carrinho
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      items: [...cart],
      total: getTotal(),
      status: "em preparo",
      timestamp: new Date(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setCurrentView("menu");
    alert("Pedido Realizado! Seu pedido foi enviado para a cozinha.");
  };

  const saveProduct = () => {
    // Validação básica
    if (!newProduct.name.trim() || newProduct.price <= 0) {
      alert("Nome e preço são obrigatórios e o preço deve ser maior que zero!");
      return;
    }

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? { ...newProduct, id: editingProduct.id }
            : p
        )
      );
      alert("Produto atualizado!");
    } else {
      const productToAdd: Product = { 
        ...newProduct, 
        id: `prod-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      };
      setProducts((prev) => [productToAdd, ...prev]);
      alert("Novo produto adicionado!");
    }
    setEditingProduct(null);
    setNewProduct({
      name: "",
      price: 0,
      description: "",
      image: "",
      category: "lanches",
    });
    setCurrentView("admin");
  };

  const deleteProduct = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      // Remove também do carrinho se estiver presente
      setCart((prev) => prev.filter((item) => item.product.id !== id));
    }
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  // Função para lidar com mudanças no formulário de produto
  const handleProductChange = (field: keyof Omit<Product, "id">, value: string | number) => {
    setNewProduct((prev) => ({ 
      ...prev, 
      [field]: field === "price" ? Number(value) : value 
    }));
  };

  // Reset do formulário ao voltar para admin
  const handleBackToAdmin = () => {
    setEditingProduct(null);
    setNewProduct({
      name: "",
      price: 0,
      description: "",
      image: "",
      category: "lanches",
    });
    setCurrentView("admin");
  };

  switch (currentView) {
    case "cart":
      return (
        <CartScreen
          cart={cart}
          onBack={() => setCurrentView("menu")}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
          onCheckout={handleCheckout}
          getTotal={getTotal}
        />
      );
    case "admin":
      return (
        <AdminScreen
          orders={orders}
          products={products}
          onBack={() => setCurrentView("menu")}
          onCreateProduct={() => {
            setEditingProduct(null);
            setNewProduct({
              name: "",
              price: 0,
              description: "",
              image: "",
              category: "lanches",
            });
            setCurrentView("productForm");
          }}
          onEditProduct={(product) => {
            setEditingProduct(product);
            setNewProduct({
              name: product.name,
              price: product.price,
              description: product.description,
              image: product.image,
              category: product.category,
            });
            setCurrentView("productForm");
          }}
          onDeleteProduct={deleteProduct}
          onUpdateOrderStatus={updateOrderStatus}
        />
      );
    case "productForm":
      return (
        <ProductFormScreen
          product={newProduct}
          isEditing={!!editingProduct}
          onBack={handleBackToAdmin}
          onSave={saveProduct}
          onChange={handleProductChange}
        />
      );
    default:
      return (
        <MenuScreen
          products={products}
          cart={cart}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onAddToCart={addToCart}
          onGoToCart={() => setCurrentView("cart")}
          onGoToAdmin={() => setCurrentView("admin")}
        />
      );
  }
}