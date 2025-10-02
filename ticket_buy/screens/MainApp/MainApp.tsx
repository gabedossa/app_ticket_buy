// app/screens/MainApp.tsx
import React, { useState } from "react";
import { Productos as productsMock } from "../../app/mocks/data/dataMock";
import { CartItem, Order, Product } from "../../app/mocks/types/types.js";
import AdminScreen from "../AdminScreen/adminScreen";
import CartScreen from "../CartScreen/CartScreen";
import MenuScreen from "../menuScreen/MenuScreen";
import ProductFormScreen from "../ProductScreen/ProductForm";

export default function MainApp() {
  const [products, setProducts] = useState<Product[]>(productsMock);
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
      const productToAdd: Product = { ...newProduct, id: `prod-${Date.now()}` };
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
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateOrderStatus = (orderId: string, status: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: status as Order["status"] } : order
      )
    );
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
            setNewProduct(product);
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
          onBack={() => setCurrentView("admin")}
          onSave={saveProduct}
          onChange={(field, value) =>
            setNewProduct((prev) => ({ ...prev, [field]: value }))
          }
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